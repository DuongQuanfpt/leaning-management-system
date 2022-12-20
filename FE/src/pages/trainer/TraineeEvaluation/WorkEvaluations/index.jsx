import React, { useState, useEffect } from 'react'
import { Button, Col, DatePicker, Form, Input, message, Modal, Row, Select, Space, Table, Typography } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import evaluationApi from '~/api/evaluationApi'
import moment from 'moment'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const WorkEvaluations = () => {
  const { id } = useParams()
  const { roles } = useSelector((state) => state.profile)
  const navigateTo = useNavigate()
  const [listWorkEval, setListWorkEval] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState({
    workUpdate: false,
    workNewUpdate: false,
    workEditUpdate: false,
  })
  const [workUpdateForm, setWorkUpdateForm] = useState({})
  const [workSelected, setWorkSelected] = useState({})
  const [form] = Form.useForm()
  const [isTrainer, setIsTrainer] = useState(false)

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
      },
    })
  }

  useEffect(() => {
    setIsTrainer(roles.includes('trainer'))
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    setLoading(true)
    await evaluationApi
      .getTraineeEvaluation(id)
      .then((response) => {
        console.log(response)
        setListWorkEval(response.evaluatedWork)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const columns = [
    { title: '#', dataIndex: 'submitId', width: '5%' },
    { title: 'Requirement', dataIndex: 'requirementName', width: '15%' },
    { title: 'Complexity', dataIndex: 'complexityName', width: '15%' },
    { title: 'Quality', dataIndex: 'qualityname', width: '15%' },
    { title: 'Comments', dataIndex: 'comment', width: '25%' },
    { title: 'WP', dataIndex: 'currentPoint', width: '5%' },
    {
      title: 'Actions',
      dataIndex: '',
      width: '10%',
      render: (_, workEvaluation) => (
        <Button
          type="link"
          className="p-0 m-0"
          onClick={async () => {
            await evaluationApi
              .getWorkUpdateForm(workEvaluation.submitId, workEvaluation.requirementId)
              .then((response) => {
                setWorkUpdateForm(response)
                setOpenModal((prev) => ({ ...prev, workUpdate: true }))
                setWorkSelected(workEvaluation)
              })
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          View Update
        </Button>
      ),
    },
  ]

  const columnsWorkUpdate = [
    { title: '#', dataIndex: 'id', width: '5%' },
    { title: 'Update', dataIndex: 'title', width: '45%' },
    { title: 'Milestone', dataIndex: 'milestoneName', width: '20%' },
    { title: 'Update At', dataIndex: 'updateDate', width: '15%' },
    {
      title: 'Actions',
      width: '15%',
      hidden: isTrainer,
      render: (_, workUpdate) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setOpenModal((prev) => ({ ...prev, workEditUpdate: true }))
              form.setFieldValue('updateId', workUpdate.id)
              form.setFieldValue('title', workUpdate.title)
              form.setFieldValue('milestone', workUpdate.milestoneId)
              form.setFieldValue('date', moment())
              form.setFieldValue('content', workUpdate.description)
            }}
          >
            Edit
          </Button>
          <Button type="link" danger onClick={() => confirmDeleteWork(workUpdate)}>
            Delete
          </Button>
        </>
      ),
    },
  ].filter((item) => !item.hidden)

  const confirmDeleteWork = (work) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to delete (${work.title})`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await evaluationApi
          .deleteWorkUpdate(work.id)
          .then((response) => {
            console.log(response)
            toastMessage('success', 'Delete Update Information Successfully!')
          })
          .catch((error) => {
            toastMessage('success', 'Delete Update Information Failed, try again later!')
            console.log(error)
          })
          .finally(async () => {
            form.resetFields()
            await evaluationApi
              .getWorkUpdateForm(workSelected.submitId, workSelected.requirementId)
              .then((response) => {
                console.log(response)
                setWorkUpdateForm(response)
              })
              .catch((error) => {
                console.log(error)
              })
          })
      },
      onCancel: () => {},
    })
  }

  return (
    <div className="widget-inner">
      <div className="row">
        <div className="col-lg-12 m-b30">
          <div className="row">
            <Table dataSource={listWorkEval} columns={columns} loading={loading} pagination={false} />

            {/* Modal Work Updates */}
            <Modal
              title="Work Updates"
              open={openModal.workUpdate}
              width={'85%'}
              style={{ left: '30px' }}
              onCancel={() => {
                setOpenModal((prev) => ({ ...prev, workUpdate: false }))
              }}
              footer={[
                <Button
                  key="back"
                  onClick={() => {
                    setOpenModal((prev) => ({ ...prev, workUpdate: false }))
                  }}
                >
                  Cancel
                </Button>,
              ]}
            >
              <Space className="d-flex flex-column">
                <Typography.Text strong>{`Requirement: <${workUpdateForm?.workTitle}>`}</Typography.Text>
                <Typography.Text>{`Evaluated in: <${workUpdateForm?.milestoneName}>, with below comments`}</Typography.Text>
                <Input.TextArea value={workUpdateForm?.comments} readOnly />
                <div className="col-lg-12 d-flex m-0 p-0 mt-3">
                  <div className="col-lg-6 d-flex justify-content-start m-0 p-0">
                    <Typography.Text strong>Updating History</Typography.Text>
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end m-0 p-0">
                    {!isTrainer && (
                      <Button type="link" onClick={() => setOpenModal((prev) => ({ ...prev, workNewUpdate: true }))}>
                        New Update
                      </Button>
                    )}
                  </div>
                </div>
                <Table
                  columns={columnsWorkUpdate}
                  dataSource={workUpdateForm.updateOfWork}
                  pagination={{ pageSize: 2 }}
                  bordered
                />
              </Space>
            </Modal>

            {/* Modal Add */}
            <Modal
              title="Updating Information"
              open={openModal.workNewUpdate}
              width={'60%'}
              style={{ left: '30px' }}
              onCancel={() => {
                setOpenModal((prev) => ({ ...prev, workNewUpdate: false }))
                form.resetFields()
              }}
              footer={[
                <Button
                  key="back"
                  onClick={() => {
                    setOpenModal((prev) => ({ ...prev, workNewUpdate: false }))
                    form.resetFields()
                  }}
                >
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={async () => {
                    form
                      .validateFields()
                      .then(async (values) => {
                        const params = {
                          title: values.title.trim(),
                          description: values.content.trim(),
                          updateDate: moment(values.date).format('YYYY-MM-DD'),
                          milestoneId: values.milestone,
                        }
                        if (values.title.trim() === '') {
                          toastMessage('error', 'Work Update Title must not empty!')
                          return
                        }
                        if (values.content.trim() === '') {
                          toastMessage('error', 'Work Update Content must not empty!')
                          return
                        }
                        evaluationApi
                          .addWorkUpdate(workSelected.submitId, workSelected.requirementId, params)
                          .then((response) => {
                            console.log(response)
                            toastMessage('success', 'Add Update Information Successfully!')
                          })
                          .catch((error) => {
                            console.log(error)
                            toastMessage('error', 'Add Update Information Failed, try again!')
                          })
                          .finally(async () => {
                            setOpenModal((prev) => ({ ...prev, workNewUpdate: false }))
                            form.resetFields()
                            await evaluationApi
                              .getWorkUpdateForm(workSelected.submitId, workSelected.requirementId)
                              .then((response) => {
                                console.log(response)
                                setWorkUpdateForm(response)
                              })
                              .catch((error) => {
                                console.log(error)
                              })
                          })
                      })
                      .catch((info) => {
                        console.log('Validate Failed:', info)
                      })
                  }}
                >
                  Submit
                </Button>,
              ]}
            >
              <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                  date: moment(),
                }}
              >
                <Form.Item
                  name="title"
                  label="Update Title"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the update title!',
                    },
                  ]}
                >
                  <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                      <Input placeholder="Update Title" />
                    </Col>
                  </Row>
                </Form.Item>
                <Row gutter={16}>
                  <Col className="gutter-row" span={16}>
                    <Form.Item
                      name="milestone"
                      label="Milestone"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the milestone!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Milestone"
                        className="w-100"
                        options={workUpdateForm?.milestoneOfSubmit?.map((item) => ({
                          label: item.milestoneName,
                          value: item.milestoneId,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item name="date" label="Date">
                      <DatePicker
                        placeholder="Select Date"
                        className="w-100"
                        format="MM/DD/YYYY"
                        allowClear={false}
                        value={moment()}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="content"
                  label="Update Content"
                  rules={[
                    {
                      required: true,
                      message: 'Please input the update content!',
                    },
                  ]}
                >
                  <Row gutter={16}>
                    <Col className="gutter-row" span={24}>
                      <Input.TextArea placeholder="Update Content" />
                    </Col>
                  </Row>
                </Form.Item>
              </Form>
            </Modal>

            {/* Modal Edit */}
            <Modal
              title="Updating Information"
              open={openModal.workEditUpdate}
              width={'60%'}
              style={{ left: '30px' }}
              onCancel={() => {
                form.resetFields()
                setOpenModal((prev) => ({ ...prev, workEditUpdate: false }))
              }}
              footer={[
                <Button
                  key="back"
                  onClick={() => {
                    form.resetFields()
                    setOpenModal((prev) => ({ ...prev, workEditUpdate: false }))
                  }}
                >
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={async () => {
                    form
                      .validateFields()
                      .then(async (values) => {
                        console.log(values)
                        const params = {
                          title: values.title.trim(),
                          description: values.content.trim(),
                          updateDate: moment(values.date).format('YYYY-MM-DD'),
                          milestoneId: values.milestone,
                        }
                        if (values.title.trim() === '') {
                          toastMessage('error', 'Work Update Title must not empty!')
                          return
                        }
                        if (values.content.trim() === '') {
                          toastMessage('error', 'Work Update Content must not empty!')
                          return
                        }
                        evaluationApi
                          .editWorkUpdate(values.updateId, params)
                          .then((response) => {
                            console.log(response)
                            toastMessage('success', 'Update Information Successfully!')
                          })
                          .catch((error) => {
                            console.log(error)
                            toastMessage('error', 'Update Information Failed, try again!')
                          })
                          .finally(async () => {
                            setOpenModal((prev) => ({ ...prev, workEditUpdate: false }))
                            form.resetFields()
                            await evaluationApi
                              .getWorkUpdateForm(workSelected.submitId, workSelected.requirementId)
                              .then((response) => {
                                console.log(response)
                                setWorkUpdateForm(response)
                              })
                              .catch((error) => {
                                console.log(error)
                              })
                          })
                      })
                      .catch((info) => {
                        console.log('Validate Failed:', info)
                      })
                  }}
                >
                  Submit
                </Button>,
              ]}
            >
              <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item name="updateId" hidden>
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      name="title"
                      label="Update Title"
                      rules={[
                        {
                          required: true,
                          message: 'Please input the update title!',
                        },
                      ]}
                    >
                      <Input placeholder="Update Title" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col className="gutter-row" span={16}>
                    <Form.Item
                      name="milestone"
                      label="Milestone"
                      rules={[
                        {
                          required: true,
                          message: 'Please select the milestone!',
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Milestone"
                        className="w-100"
                        options={workUpdateForm?.milestoneOfSubmit?.map((item) => ({
                          label: item.milestoneName,
                          value: item.milestoneId,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" span={8}>
                    <Form.Item name="date" label="Date">
                      <DatePicker
                        placeholder="Select Date"
                        className="w-100"
                        format="MM/DD/YYYY"
                        allowClear={false}
                        value={moment()}
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col className="gutter-row" span={24}>
                    <Form.Item
                      name="content"
                      label="Update Content"
                      rules={[
                        {
                          required: true,
                          message: 'Please input the update content!',
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Update Content" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </div>
          <Button type="primary" className="mt-3" onClick={() => navigateTo(-1)}>
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default WorkEvaluations
