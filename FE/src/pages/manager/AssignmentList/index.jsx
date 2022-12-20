import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Input, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

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
    subject: 'All Subjects',
    status: {
      name: 'All Statuses',
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
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])
  useEffect(() => {
    document.title = 'LMS - Assignment List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
    }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.subject !== 'All Subjects') {
      params.filterSubject = filter.subject
    }
    if (filter.status.name !== 'All Statuses') {
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
    loadData(1, filter, search)
  }

  const handleFilterSubject = (subject) => {
    setFilter((prev) => ({ ...prev, subject: subject }))
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: { ...prev.status, name: status.name, value: status.value } }))
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
      sorter: (a, b) => a.subjectName.localeCompare(b.subjectName, 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Assignment Title',
      dataIndex: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }),
      width: '40%',
    },
    {
      title: 'Evaluation Weight',
      dataIndex: 'eval_weight',
      sorter: (a, b) => a.eval_weight.localeCompare(b.eval_weight, 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Teamwork Assignment?',
      dataIndex: 'isTeamWork',
      sorter: (a, b) => a.isTeamWork.toString().localeCompare(b.isTeamWork.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isTeamWork }) => (isTeamWork === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Final Assignment?',
      dataIndex: 'isFinal',
      sorter: (a, b) => a.isFinal.toString().localeCompare(b.isFinal.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isFinal }) => (isFinal === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => a.status.localeCompare(b.status, 'en', { sensitivity: 'base' }),
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
                  <div className="col-5 d-flex">
                    <Input.Search
                      placeholder="Searching by Subject or Title..."
                      className="w-100"
                      size="large"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={handleSearch}
                    />
                  </div>
                  <div className="col-5 d-flex justify-content-end" style={{ gap: '10px' }}>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.subject}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterSubject('All Subjects')}>
                          {'All Subjects'}
                        </CDropdownItem>

                        {listFilter?.subjectFilter?.map((subject) => (
                          <CDropdownItem onClick={() => handleFilterSubject(subject)}>{subject}</CDropdownItem>
                        ))}
                        {filter?.subjectFilter?.length === 0 && (
                          <CDropdownItem disabled>No Subject Available</CDropdownItem>
                        )}
                      </CDropdownMenu>
                    </CDropdown>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: '' })}>
                          {'All Statuses'}
                        </CDropdownItem>

                        {listFilter?.statusFilter?.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <Tooltip title="Add New Assignment" placement="right">
                      <CButton color="danger" type="submit" className="text-light " onClick={handleAdd}>
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
