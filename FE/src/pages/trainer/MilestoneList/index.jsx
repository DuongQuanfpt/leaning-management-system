import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  CrownTwoTone,
  ExclamationCircleOutlined,
  EyeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import milestoneApi from '~/api/milestoneApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import moment from 'moment/moment'

const MilestoneList = () => {
  const ITEM_PER_PAGE = 10
  const { currentClass } = useSelector((state) => state.profile)
  const navigateTo = useNavigate()

  const [listFilter, setListFilter] = useState({
    assFilter: [],
    statusFilter: [],
  })

  const [filter, setFilter] = useState({
    assignment: {
      title: 'All Assignments',
      value: '',
    },
    status: {
      name: 'All Statuses',
      value: '',
    },
  })

  const [search, setSearch] = useState('')
  const [listMilestone, setListMilestone] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    milestoneApi.getPage().then((response) => {
      setListFilter((prev) => ({
        ...prev,
        statusFilter: response.statusFilter,
      }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  useEffect(() => {
    document.title = 'LMS - Milestone List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    setLoading(true)
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      filterClass: currentClass,
    }

    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.assignment.title !== 'Select Assignment') {
      params.filterAssignment = filter.assignment.assId
    }
    if (filter.status.name !== 'All Statuses') {
      params.filterStatus = filter.status.value
    }

    await milestoneApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListMilestone(response.listResult)
        setTotalItem(response.totalItem)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }
  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: status }))
  }
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const handleAdd = () => {
    navigateTo('/new-milestone')
  }

  const modalOpen = (allGroup) => {
    console.log(allGroup)
    const listGroup = [
      {
        groupCode: 'Individually',
        topicName: '',
        memberList: allGroup.noGroup,
      },
      ...allGroup.groups,
    ]

    Modal.confirm({
      title: 'Are you want to confirm configure groups of this milestone?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        await milestoneApi
          .changeToInProgress(allGroup.milestoneId)
          .then(() => {
            message.success({
              content: 'Change Milestone Status Successfully',
              style: {
                marginTop: '8vh',
              },
            })
            loadData(currentPage, filter)
          })
          .catch(() => {
            message.error({
              content: 'Something went wrong, please try again',
              style: {
                marginTop: '8vh',
              },
            })
          })
      },
      onCancel() {},
      width: 900,
      content: (
        <div className="pt-3 m-0 site-card-wrapper">
          <Row gutter={24}>
            {listGroup.map((group) => (
              <Col span={12} className="pb-3">
                <Card
                  title={group.groupCode}
                  bordered
                  style={{ backgroundColor: '#ededed', minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}
                  bodyStyle={{ paddingTop: 0 }}
                  extra={
                    <Space>
                      <UsergroupAddOutlined style={{ fontSize: '20px' }} />
                      <Typography>{group.memberList.length}</Typography>
                    </Space>
                  }
                >
                  {group.memberList.map((student) => (
                    <Typography className="p-0 m-0 d-flex align-items-center">
                      {student.fullName} - {student.userName} {student.leader && <CrownTwoTone className="ml-2 " />}
                    </Typography>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
          {allGroup.teamWork ? (
            <>
              <Space className="pt-3 d-flex flex-row aligns-item-start">
                <Typography.Title
                  level={5}
                  className="d-flex"
                  style={{
                    fontFamily:
                      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
                  }}
                >
                  Once you have opened it, group configuration of this milestone cannot be changed anymore!
                </Typography.Title>
              </Space>
              <Space>
                <Button
                  className="p-0 m-0 d-flex flex-row aligns-item-start"
                  type="link"
                  onClick={() => {
                    Modal.destroyAll()
                    navigateTo('/group-list')
                  }}
                >
                  Click here to configure group
                </Button>
              </Space>
            </>
          ) : (
            <>
              <Space className="pt-3 d-flex flex-row aligns-item-start">
                <Typography.Title
                  level={5}
                  className="d-flex"
                  style={{
                    fontFamily:
                      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
                  }}
                >
                  This milestone is working individually, you can't create group for this milestone
                </Typography.Title>
              </Space>
            </>
          )}
        </div>
      ),
    })
  }

  const modalClose = (allGroup) => {
    console.log(allGroup)

    Modal.confirm({
      title: 'Are you want to close this milestone?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      async onOk() {
        await milestoneApi
          .changeToClosed(allGroup.milestoneId)
          .then(() => {
            message.success({
              content: 'Change Milestone Status Successfully',
              style: {
                marginTop: '8vh',
              },
            })
            loadData(currentPage, filter)
          })
          .catch((error) => {
            message.error({
              content: 'Something went wrong, please try again',
              style: {
                marginTop: '8vh',
              },
            })
          })
      },
      onCancel() {},
      width: 900,
      content: (
        <div className="pt-3 m-0 site-card-wrapper">
          <Space className=" d-flex flex-column aligns-item-start">
            <Table dataSource={allGroup.evaluation} columns={columnsGrade} pagination={{ pageSize: 5 }} />
            <Typography.Title
              level={5}
              className="d-flex"
              style={{
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
              }}
            >
              Once you have closed it, milestone evaluation cannot be changed anymore!
            </Typography.Title>
          </Space>
          <Space>
            <Button
              className="p-0 m-0 d-flex flex-row aligns-item-start"
              type="link"
              onClick={() => {
                console.log('move to milestone evaluation page')
                navigateTo('/assignment-evaluation')
              }}
            >
              Click here to assign Assignment Evaluation page
            </Button>
          </Space>
        </div>
      ),
    })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.toString().localeCompare(b.title.toString(), 'en', { sensitivity: 'base' }),
      width: '17.5%',
    },
    {
      title: 'Assignment',
      dataIndex: 'assignment',
      sorter: (a, b) =>
        a.assignment.title.toString().localeCompare(b.assignment.title.toString(), 'en', { sensitivity: 'base' }),
      width: '17.5%',
      render: (_, { assignment }) => assignment.title,
    },
    {
      title: 'Date From',
      dataIndex: 'fromDate',
      sorter: (a, b) => a.fromDate.toString().localeCompare(b.fromDate.toString(), 'en', { sensitivity: 'base' }),
      width: '9%',
      render: (_, { fromDate }) => moment(fromDate).format('DD-MM-YYYY'),
    },
    {
      title: 'Date To',
      dataIndex: 'toDate',
      sorter: (a, b) => a.toDate.toString().localeCompare(b.toDate.toString(), 'en', { sensitivity: 'base' }),
      width: '9%',
      render: (_, { toDate }) => moment(toDate).format('DD-MM-YYYY'),
    },
    {
      title: 'Teamwork?',
      sorter: (a, b) =>
        a.assignment.isTeamWork
          .toString()
          .localeCompare(b.assignment.isTeamWork.toString(), 'en', { sensitivity: 'base' }),
      render: (_, { assignment }) => (assignment.isTeamWork === 1 ? 'Yes' : 'No'),
      width: '9%',
    },
    {
      title: 'Expected Workpoint',
      render: (_, { expectedWork }) => expectedWork ?? `0`,
      width: '5%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString(), 'en', { sensitivity: 'base' }),
      render: (_, { status }) => (
        <Tag color={status === 'Open' ? 'blue' : status === 'In_Progress' ? 'green' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          {subject.status === 'Open' ? (
            <Tooltip title={'Progress Milestone'} placement="top">
              <Button
                type={'primary'}
                shape="circle"
                icon={<CheckOutlined />}
                onClick={() => {
                  modalOpen(subject)
                }}
              ></Button>
            </Tooltip>
          ) : subject.status === 'In_Progress' ? (
            <Tooltip title={'Close Milestone'} placement="top">
              <Button
                type={'danger'}
                shape="circle"
                icon={<CloseOutlined />}
                onClick={() => {
                  modalClose(subject)
                }}
              ></Button>
            </Tooltip>
          ) : (
            <Button></Button>
          )}
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/milestone-detail/${subject.milestoneId}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
      width: '5%',
    },
  ]

  const columnsGrade = [
    {
      title: 'Username',
      dataIndex: 'userName',
      width: '20%',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      width: '20%',
    },
    {
      title: 'Bonus Grade',
      dataIndex: 'bonusGrade',
      width: '12.5%',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: '12.5%',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: '35%',
    },
  ]

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Milestone List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-5 d-flex w-80">
                    <Input.Search
                      size="large"
                      placeholder="Searching by Title or Description..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={handleSearch}
                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end">
                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: '' })}>
                          All Statuses
                        </CDropdownItem>

                        {listFilter?.statusFilter?.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <Tooltip title="Add New Milestones" placement="right">
                      <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listMilestone} columns={columns} pagination={false} loading={loading} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end mt-3">
                <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default MilestoneList
