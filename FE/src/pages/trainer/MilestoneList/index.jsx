import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import milestoneApi from '~/api/milestoneApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const MilestoneList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()
  const [listFilter, setListFilter] = useState({
    assFilter: [],
    classFilter: [],
    statusFilter: [],
  })

  const [filter, setFilter] = useState({
    assignment: {
      title: 'Select Assignment',
      value: '',
    },
    class: 'Select Class',
    status: {
      name: 'Select Status',
      value: '',
    },
  })

  const [search, setSearch] = useState('')
  const [listMilestone, setListMilestone] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    milestoneApi.getPage().then((response) => {
      setListFilter((prev) => ({
        ...prev,
        assFilter: response.assFilter,
        classFilter: response.classFilter,
        statusFilter: response.statusFilter,
      }))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: currentPage,
    }

    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.assignment.title !== 'Select Assignment') {
      params.filterAssignment = filter.assignment.assId
    }
    if (filter.class !== 'Select Class') {
      params.filterClass = filter.filterClass
    }
    if (filter.status.name !== 'Select Status') {
      params.filterStatus = filter.status.value
    }

    await milestoneApi
      .getPage(params)
      .then((response) => {
        console.log(response.listResult)
        setListMilestone(response.listResult)
        setCurrentPage(page)
        setTotalItem(response.totalItem)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  console.log(filter)

  const handleSearch = () => {
    loadData(1, filter, search)
  }
  const handleFilterAssignment = (assignment) => {
    setFilter((prev) => ({ ...prev, assignment: assignment }))
  }
  const handleFilterClass = (classes) => {
    setFilter((prev) => ({ ...prev, class: classes }))
  }
  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: status }))
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleReload = () => {
    setSearch('')
    setFilter({
      assignment: {
        title: 'Select Assignment',
        value: '',
      },
      class: 'Select Class',
      status: {
        name: 'Select Status',
        value: '',
      },
    })
  }
  const handleAdd = () => {
    navigateTo('/new-milestone')
  }

  const handleActive = () => {}

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.status === 'Active' ? 'deactivate' : 'reactivate'} "${subject.assignment}" - "${
        subject.criteriaName
      }" ?`,
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

  const columns = [
    {
      title: 'Class',
      dataIndex: 'classesCode',
      sorter: (a, b) => a.classesCode.length - b.classesCode.length,
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      width: '22.5%',
    },
    {
      title: 'Assignment',
      dataIndex: 'assignment',
      sorter: (a, b) => a.assignment.length - b.assignment.length,
      width: '22.5%',
      render: (_, { assignment }) => assignment.title,
    },
    {
      title: 'From Date',
      dataIndex: 'fromDate',
      sorter: (a, b) => a.fromDate.length - b.fromDate.length,
      width: '13%',
    },
    {
      title: 'To Date',
      dataIndex: 'toDate',
      sorter: (a, b) => a.toDate.length - b.toDate.length,
      width: '13%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => a.status?.length - b.status?.length,
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
          {subject.status === 'Closed' ? (
            <Button></Button>
          ) : (
            <Tooltip
              title={
                subject.status === 'Open' ? 'Open Milestone' : subject.status === 'In_Progress' ? 'Close Milestone' : ''
              }
              placement="top"
            >
              <Button
                type={subject.status === 'Open' ? 'primary' : 'danger'}
                shape="circle"
                icon={subject.status === 'Open' ? <CheckOutlined /> : <CloseOutlined />}
                onClick={() => {
                  modalConfirm(subject)
                }}
              ></Button>
            </Tooltip>
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
                  <div className="col-4 d-flex w-80">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by Title or Description..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{filter.assignment.title}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter?.assFilter?.map((assignment) => (
                          <CDropdownItem onClick={() => handleFilterAssignment(assignment)}>
                            {assignment.title}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>

                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{filter.class}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter.classFilter.map((classes) => (
                          <CDropdownItem onClick={() => handleFilterClass(classes)}>{classes}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>

                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter?.statusFilter?.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>

                    <Tooltip title="Reload" placement="top">
                      <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                        <CIcon icon={cilSync} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Add New Eval Criteria" placement="right">
                      <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listMilestone} columns={columns} pagination={false} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end">
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

export default MilestoneList
