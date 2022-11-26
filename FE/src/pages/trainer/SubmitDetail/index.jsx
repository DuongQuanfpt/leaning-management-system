import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  List,
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
import { ExclamationCircleOutlined } from '@ant-design/icons'

import submitApi from '~/api/submitApi'
import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

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
    milestoneFilter: [],
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({})
  const [openModal, setOpenModal] = useState({
    evaluate: false,
    revaluate: false,
    reject: false,
    unreject: false,
    workUpdate: false,
    workNewUpdate: false,
    workEditUpdate: false,
    result: false,
  })
  const [form] = Form.useForm()
  const [listWorkEval, setListWorkEval] = useState({})
  const [submitSelected, setSubmitSelected] = useState({})
  const [formEvaluation, setFormEvaluation] = useState({})
  const [workUpdateForm, setWorkUpdateForm] = useState({})

  useEffect(() => {
    loadData(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (filter) => {
    const params = {
      id: id,
      // filterTeam: filter.group,
      filterMilestone: filter.milestone,
      filterAssignee: filter.assginee,
      filterStatus: filter.status,
    }
    if (filter.search) {
      params.q = filter.search
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

  const loadWorkUpdateForm = async () => {
    await evaluationApi
      .getWorkUpdateForm(submitSelected.submitWorkId.submitId, submitSelected.submitWorkId.issueId)
      .then((response) => {
        console.log(response)
        setWorkUpdateForm(response)
        setOpenModal((prev) => ({ ...prev, workUpdate: true }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const loadFinalEvaluateForm = async (submit, result = false) => {
    setLoading(true)
    if (result) {
      setOpenModal((prev) => ({ ...prev, result: true }))
    } else {
      setOpenModal((prev) => ({ ...prev, revaluate: true }))
    }
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
          newComplexity: response.complexityFilter[0],
          newQuality: response.qualityFilter[0],
          newWorkPoint: (response.complexityFilter[0].point * response.qualityFilter[0].point) / 100,
          // complexity: response.complexityFilter[0],
          // quality: response.qualityFilter[0],
          // workPoint: (response.complexityFilter[0].point * response.qualityFilter[0].point) / 100,
          oldResult: response.result,
          updatesContent: response.updates,
        }))
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
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
            toastMessage('success', 'Unreject Successfully!')
            loadData(filter)
          })
          .catch((error) => {
            console.log(error)
            toastMessage('error', 'Unreject failed, try again later!')
            loadData(filter)
          })
      },
      onCancel: () => {},
    })
  }

  const showCommentRejected = (submit) => {
    Modal.warning({
      title: 'Reject Reason',
      content: submit.rejectReason,
    })
  }

  const columns = [
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
      render: (_, submit) => (
        <>
          {roles.includes('trainer') && submit.status === 'Submitted' && submit.finalEvaluated === false && (
            //  Evaluate
            <Button
              type="link"
              className="px-2 mr-2"
              onClick={async () => {
                console.log(submit)
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
          )}
          {roles.includes('trainer') && submit.status === 'Evaluated' && submit.finalEvaluated === true && (
            // Final Evaluate
            <Button
              type="link"
              className="px-2 mr-2"
              onClick={async () => {
                loadFinalEvaluateForm(submit)
              }}
            >
              Final Evaluate
            </Button>
          )}
          {roles.includes('trainer') && submit.status === 'Submitted' && (
            // Reject
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
          )}
          {submit.status === 'Rejected' && (
            <>
              {/* // Unreject */}
              {roles.includes('trainer') && (
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
              {/* // View Reject Reasons*/}
              <Button
                type="link"
                className="px-2 mr-2"
                onClick={() => {
                  showCommentRejected(submit)
                }}
              >
                View Reject Reasons
              </Button>
            </>
          )}

          {/* View Results  */}
          {submit.status === 'Evaluated' && (
            <Button
              type="link"
              className="px-2"
              onClick={async () => {
                loadFinalEvaluateForm(submit, true)
              }}
            >
              View Results
            </Button>
          )}
        </>
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
      hidden: !roles.includes('trainee'),
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
            loadWorkUpdateForm()
          })
      },
      onCancel: () => {},
    })
  }

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
                          options={listFilter?.milestoneFilter?.map((item) => ({
                            label: item.milestoneTitle,
                            value: item.milestoneId,
                          }))}
                          placeholder={'Select Milestone'}
                          value={filter.milestone}
                          onChange={(value, option) => {
                            setFilter((prev) => ({ ...prev, milestone: value }))
                          }}
                          allowClear
                          onClear={() => setFilter((prev) => ({ ...prev, milestone: undefined }))}
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
                          placeholder={'Input Requirement'}
                          allowClear
                          onChange={(e) => {
                            if (e.target.value) {
                              setSearch(() => e.target.value)
                            } else {
                              setFilter((prev) => ({ ...prev, search: undefined }))
                            }
                          }}
                          onSearch={(value) => setFilter((prev) => ({ ...prev, search: search }))}
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
                      zIndex={10}
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
                        // Cancel
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

                        // Reject
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

                        // Evaluate
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
                                listFilter.milestoneId,
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
                      <Skeleton loading={loading} paragraph={{ rows: 9 }}>
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

                    {/* Final Evaluate */}
                    <Modal
                      zIndex={10}
                      open={openModal.revaluate}
                      maskClosable={false}
                      width={'85%'}
                      style={{
                        left: 30,
                      }}
                      title={
                        <Space className="d-flex flex-column">
                          <Typography.Title
                            level={4}
                          >{`Final Work Evaluation (${submitSelected.milestone})`}</Typography.Title>
                          <Typography.Text>{`Trainee: ${submitSelected.fullName} (${submitSelected?.assignee}) ${`${
                            submitSelected?.team ? `, <${submitSelected?.team}>` : ``
                          }`}`}</Typography.Text>
                        </Space>
                      }
                      okText="Create"
                      cancelText="Cancel"
                      onCancel={(e) => {
                        if (e.currentTarget.id === 'discardButton') {
                          setOpenModal((prev) => ({ ...prev, revaluate: false }))
                          setFormEvaluation({})
                        } else {
                          setOpenModal((prev) => ({ ...prev, revaluate: false }))
                          setFormEvaluation({})
                        }
                      }}
                      footer={[
                        <Button
                          key="back"
                          loading={loading}
                          onClick={() => {
                            setOpenModal((prev) => ({ ...prev, revaluate: false }))
                            setFormEvaluation({})
                          }}
                        >
                          Cancel
                        </Button>,
                        <Button
                          type="primary"
                          loading={loading}
                          onClick={async () => {
                            if (!formEvaluation.reason) {
                              toastMessage('error', '*New Evaluation Comments must not empty')
                              return
                            }
                            const params = {
                              complexityId: formEvaluation.newComplexity.id,
                              qualityId: formEvaluation.newQuality.id,
                              workPoint: formEvaluation.newWorkPoint,
                              comment: formEvaluation.reason.trim(),
                            }
                            await submitApi
                              .submitWorkEval(
                                submitSelected.submitWorkId.submitId,
                                submitSelected.submitWorkId.issueId,
                                listFilter.milestoneId,
                                params,
                              )
                              .then((response) => {
                                console.log(response)
                                toastMessage('success', 'Evaluate Successfully!')
                                setOpenModal((prev) => ({ ...prev, revaluate: false }))
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
                      <Skeleton loading={loading} paragraph={{ rows: 9 }}>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Scope</Typography.Text>
                            <Input value={formEvaluation.function} readOnly />
                          </Col>
                        </Row>
                        {/* <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Function Description</Typography.Text>
                            <Input.TextArea value={formEvaluation.functionDescription} readOnly />
                          </Col>
                        </Row> */}
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Last Complexity - Quality - Work Point</Typography.Text>
                            <List
                              size="small"
                              bordered
                              dataSource={formEvaluation.oldResult}
                              renderItem={(item) => (
                                <List.Item>
                                  {`${item.milestoneName} - ${item.complexity.title} (${item.complexity.point}%) - ${item.quality.title} (${item.quality.point}) - WP: ${item.workPoint} - ${item.comment}`}{' '}
                                </List.Item>
                              )}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Updates</Typography.Text>
                            <Typography.Link
                              strong
                              className="ml-3"
                              onClick={async () => {
                                loadWorkUpdateForm()
                              }}
                            >
                              View Detailed Updates
                            </Typography.Link>
                            <List
                              size="small"
                              bordered
                              dataSource={formEvaluation.updatesContent}
                              renderItem={(item) =>
                                formEvaluation.updatesContent.length === 0 ? (
                                  <List.Item>No Updates</List.Item>
                                ) : (
                                  <List.Item>{`(${item.updateDate}) - ${item.milestoneName} - ${item.title} - ${item.description}`}</List.Item>
                                )
                              }
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>New Complexity</Typography.Text>
                            <Select
                              className="w-100"
                              options={listWorkEval?.complexityFilter?.map((item) => ({
                                label: item.title,
                                value: item.id,
                                point: item.point,
                              }))}
                              value={formEvaluation.newComplexity?.id}
                              onChange={(value, option) => {
                                console.log(option)
                                setFormEvaluation((prev) => ({
                                  ...prev,
                                  newComplexity: { ...option, id: option.value },
                                  newWorkPoint: (prev.newQuality.point * option.point) / 100,
                                }))
                              }}
                            />
                          </Col>

                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>New Quality</Typography.Text>
                            <Select
                              className="w-100"
                              options={listWorkEval?.qualityFilter?.map((item) => ({
                                label: item.title,
                                value: item.id,
                                point: item.point,
                              }))}
                              value={formEvaluation.newQuality?.id}
                              onChange={(value, option) => {
                                console.log(option)
                                setFormEvaluation((prev) => ({
                                  ...prev,
                                  newQuality: { ...option, id: option.value },
                                  newWorkPoint: (option.point * prev.newComplexity.point) / 100,
                                }))
                              }}
                            />
                          </Col>

                          <Col className="gutter-row mb-3" span={8}>
                            <Typography.Text strong>New Work Point</Typography.Text>
                            <Input readOnly value={formEvaluation.newWorkPoint} />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row" span={24}>
                            <Typography.Text strong type="danger" style={{ fontSize: '18px' }}>
                              *
                            </Typography.Text>
                            <Typography.Text strong>New Evaluation Comments</Typography.Text>
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
                      zIndex={10}
                      open={openModal.reject}
                      maskClosable={false}
                      title={
                        <Space className="d-flex flex-column">
                          <Typography.Title level={4}>{`Reject ${submitSelected.milestone}`}</Typography.Title>
                          <Typography.Text>{`Trainee: ${submitSelected?.assignee} (${submitSelected?.fullName}), <${submitSelected?.team}>`}</Typography.Text>
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
                                toastMessage('success', 'Reject Successfully!')
                              })
                              .catch((error) => {
                                console.log(error)
                                toastMessage('error', 'Reject failed, try again later!')
                              })
                              .finally(() => {
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

                    {/* Modal Work Updates */}
                    <Modal
                      zIndex={20}
                      title="Work Updates"
                      open={openModal.workUpdate}
                      onCancel={() => {
                        setOpenModal((prev) => ({ ...prev, workUpdate: false }))
                        if (openModal.revaluate) {
                          loadFinalEvaluateForm(submitSelected)
                        }
                        if (openModal.result) {
                          loadFinalEvaluateForm(submitSelected, true)
                        }
                      }}
                      width={'80%'}
                      style={{ left: '30px' }}
                      footer={[
                        <Button
                          key="back"
                          onClick={() => {
                            setOpenModal((prev) => ({ ...prev, workUpdate: false }))
                            if (openModal.revaluate) {
                              loadFinalEvaluateForm(submitSelected)
                            }
                            if (openModal.result) {
                              loadFinalEvaluateForm(submitSelected, true)
                            }
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
                            {roles.includes('trainee') && (
                              <Button
                                type="link"
                                onClick={() => setOpenModal((prev) => ({ ...prev, workNewUpdate: true }))}
                              >
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
                      zIndex={30}
                      title="Updating Information"
                      open={openModal.workNewUpdate}
                      onCancel={() => {
                        setOpenModal((prev) => ({ ...prev, workNewUpdate: false }))
                        form.resetFields()
                      }}
                      width={'60%'}
                      style={{ left: '30px' }}
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
                                  updateDate: moment().format('YYYY-MM-DD'),
                                  milestoneId: values.milestone,
                                }
                                evaluationApi
                                  .addWorkUpdate(
                                    submitSelected.submitWorkId.submitId,
                                    submitSelected.submitWorkId.issueId,
                                    params,
                                  )
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
                                    loadWorkUpdateForm()
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
                      zIndex={30}
                      title="Updating Information"
                      open={openModal.workEditUpdate}
                      width={'60%'}
                      onCancel={() => {
                        form.resetFields()
                        setOpenModal((prev) => ({ ...prev, workEditUpdate: false }))
                      }}
                      style={{ left: '30px' }}
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
                                  updateDate: moment().format('YYYY-MM-DD'),
                                  milestoneId: values.milestone,
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
                                    loadWorkUpdateForm()
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

                    {/* View Results */}
                    <Modal
                      zIndex={10}
                      open={openModal.result}
                      maskClosable={false}
                      width={'85%'}
                      style={{
                        left: 30,
                      }}
                      title={
                        <Space className="d-flex flex-column">
                          <Typography.Title level={4}>{`Result (${submitSelected.milestone})`}</Typography.Title>
                          <Typography.Text>{`Trainee: ${submitSelected.fullName} (${submitSelected?.assignee}) ${`${
                            submitSelected?.team ? `, <${submitSelected?.team}>` : ``
                          }`}`}</Typography.Text>
                        </Space>
                      }
                      okText="Create"
                      cancelText="Cancel"
                      onCancel={(e) => {
                        if (e.currentTarget.id === 'discardButton') {
                          setOpenModal((prev) => ({ ...prev, result: false }))
                          setFormEvaluation({})
                        } else {
                          setOpenModal((prev) => ({ ...prev, result: false }))
                          setFormEvaluation({})
                        }
                      }}
                      footer={[
                        <Button
                          key="back"
                          loading={loading}
                          onClick={() => {
                            setOpenModal((prev) => ({ ...prev, result: false }))
                            setFormEvaluation({})
                          }}
                        >
                          Cancel
                        </Button>,
                      ]}
                    >
                      <Skeleton loading={loading} paragraph={{ rows: 9 }}>
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
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Last Complexity - Quality - Work Point</Typography.Text>
                            <List
                              size="small"
                              bordered
                              dataSource={formEvaluation.oldResult}
                              renderItem={(item) => (
                                <List.Item>
                                  {`${item.milestoneName} - ${item.complexity.title} (${item.complexity.point}%) - ${item.quality.title} (${item.quality.point}) - WP: ${item.workPoint} - ${item.comment}`}{' '}
                                </List.Item>
                              )}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col className="gutter-row mb-3" span={24}>
                            <Typography.Text strong>Updates</Typography.Text>
                            <Typography.Link
                              strong
                              className="ml-3"
                              onClick={async () => {
                                loadWorkUpdateForm()
                              }}
                            >
                              View Detailed Updates
                            </Typography.Link>
                            <List
                              size="small"
                              bordered
                              dataSource={formEvaluation.updatesContent}
                              renderItem={(item) =>
                                formEvaluation.updatesContent.length === 0 ? (
                                  <List.Item>No Updates</List.Item>
                                ) : (
                                  <List.Item>{`(${item.updateDate}) - ${item.milestoneName} - ${item.title} - ${item.description}`}</List.Item>
                                )
                              }
                            />
                          </Col>
                        </Row>
                      </Skeleton>
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
