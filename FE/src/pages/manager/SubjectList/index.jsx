import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Tag, Breadcrumb, Tooltip, Modal, Pagination } from 'antd'
import { ExclamationCircleOutlined, CloseOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons'

import subjectListApi from '~/api/subjectListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

let ITEM_PER_PAGE = 10
const SubjectList = () => {
  const navigateTo = useNavigate()

  const [listSubject, setListSubject] = useState([])
  const [listManager, setListManager] = useState([])
  const [listExpert, setListExpert] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [manager, setManager] = useState('All Manager')
  const [expert, setExpert] = useState('All Expert')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    managerUsername: '',
    expertUsername: '',
    subjectStatus: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    subjectListApi.getFilter().then((response) => {
      console.log(response)
      setListManager(response.managerFilter)
      setListExpert(response.expertFilter)
      setListStatus(response.statusFilter)
    })
  }, [])

  useEffect(() => {
    loadData(1, filter, search)
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
    if (filter.managerUsername !== '') {
      params.filterManager = filter.managerUsername
    }
    if (filter.expertUsername !== '') {
      params.filterExpert = filter.expertUsername
    }
    if (filter.subjectStatus !== '') {
      params.filterStatus = filter.subjectStatus
    }
    setLoading(true)
    await subjectListApi
      .getPage(params)
      .then((response) => {
        setCurrentPage(page)
        setTotalItem(response.totalItem)
        setListSubject(response.listResult)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleActive = async (subject) => {
    setLoading(true)
    await subjectListApi
      .changeActive(subject.subjectId)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }
  const handleFilterManager = (manager) => {
    setFilter({ ...filter, managerUsername: manager })
    setManager(manager)
  }
  const handleFilterExpert = (expert) => {
    setFilter({ ...filter, expertUsername: expert })
    setExpert(expert)
  }
  const handleFilterStatus = (status) => {
    setFilter({ ...filter, subjectStatus: status.value })
    setStatus(status.name)
  }
  const handleReload = () => {
    setFilter({ managerUsername: '', expertUsername: '', subjectStatus: '' })
    setManager('All Manager')
    setExpert('All Expert')
    setStatus('All Status')
    setSearch('')
    ITEM_PER_PAGE = 10
  }
  const handleAdd = () => {
    navigateTo('/subject-add')
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.subjectStatus === 'Active' ? 'deactivate' : 'reactivate'} "${
        subject.subjectName
      }"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'Code',
      dataIndex: 'subjectCode',
      sorter: (a, b) => a.subjectCode?.length - b.subjectCode?.length,
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'subjectName',
      sorter: (a, b) => a.subjectName?.length - b.subjectName?.length,
      width: '35%',
    },
    {
      title: 'Manager',
      dataIndex: 'managerUsername',
      sorter: (a, b) => a.managerUsername?.length - b.managerUsername?.length,
      width: '15%',
    },
    {
      title: 'Expert',
      dataIndex: 'expertUsername',
      sorter: (a, b) => a.expertUsername?.length - b.expertUsername?.length,
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'subjectStatus',
      width: '10%',

      render: (_, { subjectStatus }) => (
        <Tag color={subjectStatus === 'Active' ? 'blue' : 'red'} key={subjectStatus}>
          {subjectStatus}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',

      render: (_, subject) => (
        <Space size="middle">
          <Tooltip title={subject.subjectStatus === 'Active' ? 'Deactivate' : 'Reactivate'} placement="top">
            <Button
              type={subject.subjectStatus === 'Active' ? 'danger' : 'primary'}
              shape="circle"
              icon={subject.subjectStatus === 'Active' ? <CloseOutlined /> : <CheckOutlined />}
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
                navigateTo(`/subject-detail/${subject?.subjectId}`)
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
        <div className="body flex-grow-1 px-3 m-b30">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Subject List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-5 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by Code or Name...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{manager}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listManager.map((manager) => (
                      <CDropdownItem onClick={() => handleFilterManager(manager)}>{manager}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{expert}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listExpert.map((expert) => (
                      <CDropdownItem onClick={() => handleFilterExpert(expert)}>{expert}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Reload" placement="top">
                  <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                    <CIcon icon={cilSync} />
                  </CButton>
                </Tooltip>
                <Tooltip title="Add New Subject" placement="top">
                  <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listSubject} columns={columns} pagination={false} loading={loading} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end mt-3">
            <Pagination
              current={currentPage}
              total={totalItem}
              onChange={handleChangePage}
              showSizeChanger
              onShowSizeChange={(current, pageSize) => {
                ITEM_PER_PAGE = pageSize
              }}
            />
            ;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectList
