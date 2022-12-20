import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Input, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { ExclamationCircleOutlined, CloseOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import subjectSettingListApi from '~/api/subjectSettingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

let ITEM_PER_PAGE = 10
const SubjectSettingList = () => {
  const navigateTo = useNavigate()
  const [loading, setLoading] = useState(false)

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [listSubjectSetting, setListSubjectSetting] = useState([])
  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    subjectFilter: [],
    typeFilter: [],
    statusFilter: [],
  })
  const [filter, setFilter] = useState({
    subject: 'All Subjects',
    type: {
      title: 'All Types',
      value: undefined,
    },
    status: {
      name: 'All Statuses',
      value: undefined,
    },
  })

  useEffect(() => {
    subjectSettingListApi
      .getPage({
        limit: ITEM_PER_PAGE,
        page: 1,
      })
      .then((response) => {
        setListFilter((prev) => ({
          ...prev,
          subjectFilter: response.subjectFilter,
          typeFilter: response.typeFilter,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  useEffect(() => {
    document.title = 'LMS - Subject Setting List'
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
    if (filter?.subject !== 'All Subjects') {
      params.filterSubject = filter?.subject
    }
    if (filter?.type?.value !== undefined) {
      params.filterType = filter?.type?.value
    }
    if (filter?.status?.value !== undefined) {
      params.filterStatus = filter?.status?.value
    }
    setLoading(true)
    await subjectSettingListApi
      .getPage(params)
      .then((response) => {
        setTotalItem(response.totalItem)
        setListSubjectSetting(response.listResult)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterSubject = (subject) => {
    setFilter((prev) => ({ ...prev, subject: subject }))
    setCurrentPage(1)
  }
  const handleFilterType = (type) => {
    setFilter((prev) => ({ ...prev, type: type }))
    setCurrentPage(1)
  }
  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: status }))
    setCurrentPage(1)
  }
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const handleAdd = () => {
    navigateTo('/subject-setting-add')
  }

  const handleActive = async (subject) => {
    setLoading(true)
    await subjectSettingListApi
      .changeStatus(subject.subjectSettingId)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.status === 'Active' ? 'deactivate' : 'reactivate'} "${subject.settingTitle}"?`,
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
      title: 'Subject',
      dataIndex: 'subjectCode',
      sorter: (a, b) => a.subjectCode.localeCompare(b.subjectCode, 'en', { sensitivity: 'base' }),
      width: '15%',
    },
    {
      title: 'Subject Setting Title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle.localeCompare(b.settingTitle, 'en', { sensitivity: 'base' }),
      width: '20%',
    },
    {
      title: 'Subject Setting Value',
      dataIndex: 'settingValue',
      sorter: (a, b) => a.settingValue.localeCompare(b.settingValue, 'en', { sensitivity: 'base' }),
      width: '30%',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      sorter: (a, b) => a.typeName.localeCompare(b.typeName, 'en', { sensitivity: 'base' }),
      width: '15%',
      render: (_, { typeName }) => typeName.title,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status, 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (_, subject) => (
        <Space size="middle">
          <Tooltip title={subject.status === 'Active' ? 'Deactive' : 'Reactive'} placement="top">
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
                navigateTo(`/subject-setting-detail/${subject?.subjectSettingId}`)
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
                  <Breadcrumb.Item>Subject Setting List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-4 d-flex w-80">
                <Input.Search
                  placeholder="Search by Setting title..."
                  size="large"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={handleSearch}
                />
              </div>
              <div className="col-6 d-flex justify-content-end" style={{ gap: '10px' }}>
                <CDropdown className="">
                  <CDropdownToggle color="secondary">{filter.subject}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterSubject('All Subjects')}>{'All Subjects'}</CDropdownItem>
                    {listFilter.subjectFilter.map((subject) => (
                      <CDropdownItem onClick={() => handleFilterSubject(subject)}>{subject}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="">
                  <CDropdownToggle color="secondary">{filter.type.title}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterType({ title: 'All Types', value: undefined })}>
                      {'All Types'}
                    </CDropdownItem>
                    {listFilter.typeFilter.map((type) => (
                      <CDropdownItem onClick={() => handleFilterType(type)}>{type.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="">
                  <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: undefined })}>
                      {'All Statuses'}
                    </CDropdownItem>
                    {listFilter.statusFilter.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Add New Subject Setting" placement="right">
                  <CButton color="danger" type="submit" className="text-light " onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listSubjectSetting} columns={columns} pagination={false} loading={loading} />
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
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectSettingList
