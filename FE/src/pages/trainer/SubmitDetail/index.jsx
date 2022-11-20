import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Skeleton,
  Space,
  Table,
  Tag,
  Typography,
} from 'antd'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const SubmitDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()
  const { roles } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [listSubmitDetail, setListSubmitDetail] = useState([])
  const [listFilter, setListFilter] = useState({
    assigneeFilter: [],
    statusFilter: [],
    teamFilter: [],
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({})
  const [openModal, setOpenModal] = useState({
    evaluate: false,
    revaluate: false,
    reject: false,
    unreject: false,
  })
  const [form] = Form.useForm()
  const [listWorkEval, setListWorkEval] = useState({})
  const [submitSelected, setSubmitSelected] = useState({})
  const [formEvaluation, setFormEvaluation] = useState({})

  useEffect(() => {
    loadData(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (filter) => {
    const params = {
      id: id,
      filterTeam: filter.group,
      filterAssignee: filter.assginee,
      filterStatus: filter.status,
      q: filter.search,
    }
    setLoading(true)
    await submitApi
      .getSubmitDetail(id, params)
      .then((response) => {
        console.log(response)
        setListSubmitDetail(response.listResult)
        setListFilter(response)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
      },
    })
  }

  const confirmUnreject = (submit) => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure want to unreject ${submit.milestone} (${submit.requirement})`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: async () => {
        await submitApi
          .rejectWorkEval(submit.submitWorkId.submitId, submit.submitWorkId.issueId, {
            comment: null,
          })
          .then(() => {
            loadData(filter)
          })
          .catch((error) => {
            console.log(error)
            loadData(filter)
          })
      },
      onCancel: () => {},
    })
  }

  const columns = [
    { title: '#', dataIndex: 'id', width: '6%' },
    { title: 'Milestone', dataIndex: 'milestone', width: '18%' },
    { title: 'Group', dataIndex: 'team', width: '6%' },
    { title: 'Requirement', dataIndex: 'requirement', width: '18%' },
    { title: 'Assignee', dataIndex: 'assignee', width: '11%' },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '11%',
      render: (_, { status }) => (
        <Tag color={status === 'Submitted' ? 'blue' : status === 'Evaluated' ? 'purple' : 'red'}> {status}</Tag>
      ),
    },
    { title: 'WP', dataIndex: 'grade', width: '6%' },
    {
      title: 'Actions',
      width: '12%',
      hidden: !roles.includes('trainer'),
      render: (_, submit) => (
        <>
          {submit.id % 2 === 0 ? (
            <>
              <Button
                type="link"
                className="px-2 mr-2"
                onClick={async () => {
                  setLoading(true)
                  setOpenModal((prev) => ({ ...prev, evaluate: true }))
                  setSubmitSelected(submit)
                  await submitApi
                    .getWorkEval(submit.submitWorkId.submitId, submit.submitWorkId.issueId)
                    .then((response) => {
                      console.log(response)
                      setListWorkEval(response)
                      setFormEvaluation((prev) => ({
                        ...prev,
                        function: response.functionName,
                        functionDescription: response.functionDescription,
                        complexity: response.complexityFilter[0],
                        quality: response.qualityFilter[0],
                        workPoint: (response.complexityFilter[0].point * response.qualityFilter[0].point) / 100,
                      }))
                    })
                    .then(() => setLoading(false))
                    .catch((error) => {
                      console.log(error)
                      setLoading(false)
                    })
                }}
              >
                Evaluate
              </Button>

              {submit.status !== 'Rejected' ? (
                <Button
                  type="link"
                  danger
                  className="px-2 mr-2"
                  onClick={() => {
                    setOpenModal((prev) => ({ ...prev, reject: true }))
                    setSubmitSelected(submit)
                  }}
                >
                  Reject
                </Button>
              ) : (
                <Button
                  type="link"
                  danger
                  className="px-2 mr-2"
                  onClick={() => {
                    confirmUnreject(submit)
                  }}
                >
                  Unreject
                </Button>
              )}
            </>
          ) : (
            <Button type="link" className="px-2">
              View Result
            </Button>
          )}
        </>
      ),
    },
  ].filter((item) => !item.hidden)

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/dashboard">Dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/submit-list">Submit List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Submit Detail</Breadcrumb.Item>
              </Breadcrumb>
              <div className="widget-box mt-3">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-3 my-3">
                        <Select
                          className="w-100"
                          options={listFilter?.teamFilter?.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          placeholder={'Select Group'}
                          value={filter.group}
                          onChange={(value) => {
                            setFilter((prev) => ({ ...prev, group: value }))
                          }}
                          allowClear
                          onClear={() => setFilter((prev) => ({ ...prev, group: undefined }))}
                        />
                      </div>
                      <div className="col-3 my-3">
                        <Select
                          className="w-100"
                          options={listFilter?.assigneeFilter?.map((item) => ({
                            label: item,
                            value: item,
                          }))}
                          placeholder={'Select Assignee'}
                          value={filter.assginee}
                          onChange={(value) => {
                            setFilter((prev) => ({ ...prev, assginee: value }))
                          }}
                          allowClear
                          onClear={() => setFilter((prev) => ({ ...prev, assginee: undefined }))}
                        />
                      </div>
                      <div className="col-3 my-3">
                        <Select
                          className="w-100"
                          options={listFilter?.statusFilter?.map((item) => ({
                            label: item.name,
                            value: item.value,
                          }))}
                          placeholder={'Select Status'}
                          value={filter.status}
                          onChange={(value) => {
                            setFilter((prev) => ({ ...prev, status: value }))
                          }}
                          allowClear
                          onClear={() => setFilter((prev) => ({ ...prev, status: undefined }))}
                        />
                      </div>
                      <div className="col-3 my-3">
                        <Input.Search
                          className="w-100"
                          placeholder={'Select Milestone'}
                          allowClear
                          onChange={(e) => setSearch(() => e.target.value)}
                          onSearch={(value) => setFilter((prev) => ({ ...prev, search: search }))}
                          onClear={() => {
                            setFilter((prev) => ({ ...prev, search: '' }))
                            setSearch('')
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <Table
                      columns={columns}
                      dataSource={listSubmitDetail}
                      loading={loading}
                      pagination={false}
                      bordered
                    />

                    {/* Evaluate */}
                    <Modal
                      open={openModal.evaluate}
                      maskClosable={false}
                      width={'85%'}
                      style={{
                        left: 30,
                      }}
                      title={
                        <Space className="d-flex flex-column">
                          <Typography.Title
                            level={4}
                          >{`Work Evaluation (${submitSelected.milestone})`}</Typography.Title>
                          <Typography.Text>{`Trainee: ${submitSelected.fullName} (${submitSelected?.assignee}) ${`${
                            submitSelected?.team ? `, <${submitSelected?.team}>` : ``
                          }`}`}</Typography.Text>
                        </Space>
                      }
                      okText="Create"
                      cancelText="Cancel"
                      onCancel={(e) => {
                        if (e.currentTarget.id === 'discardButton') {
                          setOpenModal((prev) => ({ ...prev, evaluate: false }))
                          setFormEvaluation({})
                        } else {
                          setOpenModal((prev) => ({ ...prev, evaluate: false }))
                          setFormEvaluation({})
                        }
                      }}
                      footer={[
                        <Button
                          key="back"
                          loading={loading}
                          onClick={() => {
                            setOpenModal((prev) => ({ ...prev, evaluate: false }))
                            setFormEvaluation({})
                          }}
                        >
                          Cancel
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          danger
                          loading={loading}
                          onClick={async () => {
                            console.log(formEvaluation)
                            if (!formEvaluation.reason) {
                              toastMessage('error', 'Evaluation Comments / Reject Reason must not empty')
                              return
                            }
                            setLoading(true)
                            await submitApi
                              .rejectWorkEval(
                                submitSelected.submitWorkId.submitId,
                                submitSelected.submitWorkId.issueId,
                                {
                                  comment: formEvaluation.reason,
                                },
                              )
                              .then(() => {
                                toastMessage(
                                  'success',
                                  `Reject ${submitSelected.milestone} (${submitSelected.function}) successfully!`,
                                )
                                loadData(filter)
                                setOpenModal((prev) => ({ ...prev, evaluate: false }))
                                setLoading(true)
                              })
                              .then(() => setLoading(false))
                              .catch((error) => {
                                console.log(error)
                                toastMessage(
                                  'error',
                                  `Reject ${submitSelected.milestone} (${submitSelected.function}) failed, try again later!`,
                                )
                                loadData(filter)
                                setOpenModal((prev) => ({ ...prev, evaluate: false }))
                                setLoading(false)
                              })
                          }}
                        >
                          Reject
                        </Button>,
                        <Button
                          type="primary"
                          loading={loading}
                          onClick={async () => {
                            console.log(formEvaluation)
                            if (!formEvaluation.reason) {
                              toastMessage('error', 'Evaluation Comments / Reject Reason must not empty')
                              return
                            }
                            const params = {
                              complexityId: formEvaluation.complexity.id,
                              qualityId: formEvaluation.quality.id,
                              workPoint: formEvaluation.workPoint,
                              comment: formEvaluation.reason.trim(),
                            }
                            console.log(params)
                            await submitApi
                              .submitWorkEval(
                                submitSelected.submitWorkId.submitId,
                                submitSelected.submitWorkId.issueId,
                                params,
                              )
                              .then((response) => {
                                console.log(response)
                                toastMessage('success', 'Evaluate Successfully!')
                                setOpenModal((prev) => ({ ...prev, evaluate: false }))
                                loadData(filter)
                              })
                              .catch((error) => {
                                console.log(error)
                                toastMessage('error', 'Evaluate Failed, try again later!')
                                loadData(filter)
                              })
                          }}
                        >
                          Evaluate
                        </Button>,
                      ]}
                    >
                      <Skeleton loading={loading}>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Function</Typography.Text>
                            <Input value={formEvaluation.function} readOnly />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Function Description</Typography.Text>
                            <Input.TextArea value={formEvaluation.functionDescription} readOnly />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>Complexity</Typography.Text>
                            <Select
                              className="w-100"
                              options={listWorkEval?.complexityFilter?.map((item) => ({
                                label: item.title,
                                value: item.id,
                                point: item.point,
                              }))}
                              value={formEvaluation.complexity?.id}
                              onChange={(value, option) => {
                                console.log(option)
                                setFormEvaluation((prev) => ({
                                  ...prev,
                                  complexity: { ...option, id: option.value },
                                  workPoint: (prev.quality.point * option.point) / 100,
                                }))
                              }}
                            />
                          </Col>

                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>Quality</Typography.Text>
                            <Select
                              className="w-100"
                              options={listWorkEval?.qualityFilter?.map((item) => ({
                                label: item.title,
                                value: item.id,
                                point: item.point,
                              }))}
                              value={formEvaluation.quality?.id}
                              onChange={(value, option) => {
                                console.log(option)
                                setFormEvaluation((prev) => ({
                                  ...prev,
                                  quality: { ...option, id: option.value },
                                  workPoint: (option.point * prev.complexity.point) / 100,
                                }))
                              }}
                            />
                          </Col>

                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>Work Point</Typography.Text>
                            <Input readOnly value={formEvaluation.workPoint} />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={24}>
                            <Typography.Text strong type="danger" style={{ fontSize: '18px' }}>
                              *
                            </Typography.Text>
                            <Typography.Text strong>Evaluation Comments / Reject Reason</Typography.Text>
                            <Input.TextArea
                              value={formEvaluation.reason}
                              onChange={(e) => setFormEvaluation((prev) => ({ ...prev, reason: e.target.value }))}
                            />
                          </Col>
                        </Row>
                      </Skeleton>
                    </Modal>
                    {/* Reject */}
                    <Modal
                      open={openModal.reject}
                      maskClosable={false}
                      title={
                        <Space className="d-flex flex-column">
                          <Typography.Title level={4}>{`Reject ${submitSelected.milestone}`}</Typography.Title>
                          <Typography.Text>{`Trainee: usernamehere (${submitSelected?.assignee}), <${submitSelected?.team}>`}</Typography.Text>
                        </Space>
                      }
                      okText="Confirm"
                      cancelText="Cancel"
                      onCancel={() => setOpenModal((prev) => ({ ...prev, reject: false }))}
                      onOk={async () => {
                        form
                          .validateFields()
                          .then(async (values) => {
                            form.resetFields()
                            await submitApi
                              .rejectWorkEval(
                                submitSelected.submitWorkId.submitId,
                                submitSelected.submitWorkId.issueId,
                                {
                                  comment: values.reason,
                                },
                              )
                              .then((response) => {
                                console.log(response)
                                setOpenModal((prev) => ({ ...prev, reject: false }))
                                loadData(filter)
                              })
                              .catch((error) => {
                                console.log(error)
                                setOpenModal((prev) => ({ ...prev, reject: false }))
                                loadData(filter)
                              })
                          })
                          .catch((info) => {
                            console.log('Validate Failed:', info)
                          })
                      }}
                    >
                      <Form
                        form={form}
                        layout="vertical"
                        name="form_in_modal"
                        initialValues={{
                          reason: '',
                        }}
                      >
                        <Form.Item
                          name="reason"
                          label="Reject Reason"
                          rules={[
                            {
                              required: true,
                              message: 'Please input the reason reject!',
                            },
                          ]}
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </Form>
                    </Modal>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <Button type="primary" onClick={() => navigateTo('/submit-list')}>
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </div>
  )
}

export default SubmitDetail
