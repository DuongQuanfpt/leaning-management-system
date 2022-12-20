import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Button, Input, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, CopyOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import classEvalCriteriaApi from '~/api/classEvalCriteriaApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassEvalCriteriaList = () => {
  const ITEM_PER_PAGE = 10
  const { currentClass } = useSelector((state) => state.profile)

  const navigateTo = useNavigate()

  const [listClassSetting, setListClassSetting] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    milestoneFilter: [],
    statusFilter: [],
  })
  const [filter, setFilter] = useState({
    milestone: {
      milestoneTitle: 'All Milestones',
      value: '',
    },
    status: {
      name: 'All Statuses',
      value: '',
    },
  })

  useEffect(() => {
    classEvalCriteriaApi
      .getFilter({ classCode: currentClass })
      .then((response) => {
        setListFilter((prev) => ({
          ...prev,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })

    classEvalCriteriaApi
      .getPage({ classCode: currentClass, page: 1, limit: 1 })
      .then((response) => {
        setListFilter((prev) => ({ ...prev, milestoneFilter: response.milestoneFilter }))
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  useEffect(() => {
    document.title = 'LMS - Class Eval Criteria List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    const params = { limit: ITEM_PER_PAGE, page: page, filterClass: currentClass }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.milestone.title !== 'All Milestones' && filter.milestone.milestoneTitle !== 'All Milestones') {
      params.filterMilestone = filter.milestone.milestoneId
    }
    if (filter.status.name !== 'All Statuses') {
      params.filterStatus = filter.status.value
    }
    setLoading(true)
    await classEvalCriteriaApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListClassSetting(response.listResult)
        setCurrentPage(page)
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

  const handleFilterMilestone = (milestone) => {
    console.log(milestone)
    setFilter((prev) => ({ ...prev, milestone: milestone }))
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: status }))
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleAdd = () => {
    navigateTo(`/class-criteria-add`)
  }

  const handleActive = async (id) => {
    await classEvalCriteriaApi
      .changeStatus(id)
      .then(() => {
        loadData(currentPage, filter)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const columns = [
    {
      title: 'Milestone',
      dataIndex: 'assignment',
      sorter: (a, b) => a.assignment.title.localeCompare(b.assignment.title, 'en', { sensitivity: 'base' }),
      width: '20%',
      render: (_, { assignment }) => assignment.title,
    },
    {
      title: 'Name',
      dataIndex: 'criteriaName',
      sorter: (a, b) => a.criteriaName.localeCompare(b.criteriaName, 'en', { sensitivity: 'base' }),
      width: '20%',
    },
    {
      title: 'Eval Weight',
      dataIndex: 'evalWeight',
      sorter: (a, b) => a.evalWeight.toString().localeCompare(b.evalWeight.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Expected Work',
      dataIndex: 'expectedWork',
      sorter: (a, b) =>
        a.expectedWork.toString().localeCompare(b.expectedWork.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Team Eval?',
      dataIndex: 'isTeamEval',
      sorter: (a, b) => a.isTeamEval.toString().localeCompare(b.isTeamEval.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isTeamEval }) => (isTeamEval === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Work Eval?',
      dataIndex: 'isWorkEval',
      sorter: (a, b) => a.isWorkEval.toString().localeCompare(b.isWorkEval.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isWorkEval }) => (isWorkEval === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString(), 'en', { sensitivity: 'base' }),
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          <Tooltip title={subject.status === 'Active' ? 'Deactivate' : 'Reactivate'} placement="top">
            <Button
              type={subject.status === 'Active' ? 'danger' : 'primary'}
              shape="circle"
              icon={subject.status === 'Active' ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => {
                modalConfirm(subject)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Clone" placement="top">
            <Button
              type="primary"
              shape="circle"
              icon={<CopyOutlined />}
              onClick={() => {
                navigateTo(`/class-criteria-add/${subject?.criteriaId}`)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/class-criteria-detail/${subject?.criteriaId}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const modalConfirm = (subject) => {
    console.log(subject)
    Modal.confirm({
      title: `Are you want to ${subject.classSettingId === 'Active' ? 'deactivate' : 'reactivate'} "${
        subject.milestone.milestoneTitle
      }" - "${subject.criteriaName}" ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject.criteriaId)
      },
      onCancel() {},
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
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-3 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Class Eval Criteria List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex w-80">
                    <Input.Search
                      placeholder="Search by Title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      size="large"
                      onSearch={handleSearch}
                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end" style={{ gap: '10px' }}>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.milestone.milestoneTitle}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem
                          onClick={() => handleFilterMilestone({ milestoneTitle: 'All Milestones', milestoneId: '' })}
                        >
                          All Milestone
                        </CDropdownItem>
                        {listFilter.milestoneFilter.map((milestone) => (
                          <CDropdownItem onClick={() => handleFilterMilestone(milestone)}>
                            {milestone.milestoneTitle}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: '' })}>
                          All Statuses
                        </CDropdownItem>

                        {listFilter.statusFilter.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <Tooltip title="Add New Class Eval Criteria" placement="right">
                      <CButton color="danger" type="submit" className="text-light " onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listClassSetting} columns={columns} pagination={false} loading={loading} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end mt-3">
                <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassEvalCriteriaList
