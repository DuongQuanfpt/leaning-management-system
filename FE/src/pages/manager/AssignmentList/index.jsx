import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import assignmentApi from '~/api/assignmentApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AssignmentList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()
  const [loading, setLoading] = useState(false)

  const [listAssignment, setListAssignment] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    subjectFilter: [],
    statusFilter: [],
  })

  const [filter, setFilter] = useState({
    subject: 'Select Subject',
    status: {
      name: 'Select Status',
      value: '',
    },
  })

  useEffect(() => {
    assignmentApi
      .getPage({
        limit: ITEM_PER_PAGE,
        page: 1,
      })
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({
          ...prev,
          subjectFilter: response.subjectFilter,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
    }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.subject !== 'Select Subject') {
      params.filterSubject = filter.subject
    }
    if (filter.status.name !== 'Select Status') {
      params.filterStatus = filter.status.value
    }
    setLoading(true)
    await assignmentApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListAssignment(response.listResult)
        setCurrentPage(page)
        setTotalItem(response.totalItem)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    console.log('1')
    loadData(1, filter, search)
  }

  const handleFilterSubject = (subject) => {
    setFilter((prev) => ({ ...prev, subject: subject }))
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: { ...prev.status, name: status.name, value: status.value } }))
  }

  const handleReload = () => {
    setSearch('')
    setFilter({
      subject: 'Select Subject',
      status: {
        name: 'Select Status',
        value: '',
      },
    })
  }

  const handleAdd = () => {
    navigateTo('/assignment-add')
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleActive = async (id) => {
    await assignmentApi
      .changeActive(id)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.status === 'Active' ? 'deactivate' : 'reactivate'} "${subject.title}" - "${
        subject.assBody
      }" ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject.assId)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subjectName',
      sorter: (a, b) => a.subjectName.length - b.subjectName.length,
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      width: '15%',
    },
    {
      title: 'Body',
      dataIndex: 'assBody',
      sorter: (a, b) => a.assBody.length - b.assBody.length,
      width: '25%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => a.status?.length - b.status?.length,
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Weight',
      dataIndex: 'eval_weight',
      sorter: (a, b) => a.eval_weight.length - b.eval_weight.length,
      width: '10%',
    },
    {
      title: 'Is Teamwork',
      dataIndex: 'isTeamWork',
      sorter: (a, b) => a.isTeamWork - b.isTeamWork,
      width: '10%',
      render: (_, { isTeamWork }) => (isTeamWork === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Is Ongoing',
      dataIndex: 'isOnGoing',
      sorter: (a, b) => a.isOnGoing - b.isOnGoing,
      width: '10%',
      render: (_, { isOnGoing }) => (isOnGoing === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Is Final',
      dataIndex: 'isFinal',
      sorter: (a, b) => a.isFinal - b.isFinal,
      width: '10%',
      render: (_, { isFinal }) => (isFinal === 1 ? 'Yes' : 'No'),
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
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/assignment-detail/${subject?.assId}`)
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
                      <Breadcrumb.Item>Assignment List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex w-80">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by Subject or Title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{filter.subject}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter?.subjectFilter?.map((subject) => (
                          <CDropdownItem onClick={() => handleFilterSubject(subject)}>{subject}</CDropdownItem>
                        ))}
                        {filter?.subjectFilter?.length === 0 && (
                          <CDropdownItem disabled>No Subject Available</CDropdownItem>
                        )}
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
                    <Tooltip title="Add New Assignment" placement="right">
                      <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listAssignment} columns={columns} pagination={false} loading={loading} />
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

export default AssignmentList
