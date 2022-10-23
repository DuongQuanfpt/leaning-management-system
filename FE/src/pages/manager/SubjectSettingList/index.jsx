import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { ExclamationCircleOutlined, CloseOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import subjectSettingListApi from '~/api/subjectSettingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectSettingList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

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
    subject: 'Select Subject',
    type: {
      title: 'Select Type',
      value: '',
    },
    status: {
      name: 'Select Status',
      value: '',
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
    if (filter?.subject !== 'Select Subject') {
      params.filterSubject = filter?.subject
    }
    if (filter?.type?.value !== '') {
      params.filterType = filter?.type?.value
    }
    if (filter?.status?.value !== '') {
      params.filterStatus = filter?.status?.value
    }
    await subjectSettingListApi
      .getPage(params)
      .then((response) => {
        setCurrentPage(page)
        setTotalItem(response.totalItem)
        setListSubjectSetting(response.listResult)
      })
      .catch((error) => console.log(error))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterSubject = (subject) => {
    setFilter((prev) => ({ ...prev, subject: subject }))
  }
  const handleFilterType = (type) => {
    setFilter((prev) => ({ ...prev, type: type }))
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
      subject: 'Select Subject',
      type: {
        title: 'Select Type',
        value: '',
      },
      status: {
        name: 'Select Status',
        value: '',
      },
    })
  }

  const handleAdd = () => {
    navigateTo('/subject-setting-add')
  }

  const handleActive = async (subject) => {
    await subjectSettingListApi
      .changeStatus(subject.subjectSettingId)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => console.log(error))
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
      title: 'Code',
      dataIndex: 'subjectCode',
      sorter: (a, b) => a.subjectCode?.length - b.subjectCode?.length,
      width: '10%',
    },
    {
      title: 'Setting title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle?.length - b.settingTitle?.length,
      width: '15%',
    },
    {
      title: 'Setting value',
      dataIndex: 'settingValue',
      sorter: (a, b) => a.settingValue?.length - b.settingValue?.length,
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      sorter: (a, b) => a.typeName?.length - b.typeName?.length,
      width: '15%',
      render: (_, { typeName }) => typeName.title,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '25%',
      sorter: (a, b) => a.description?.length - b.description?.length,
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
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by Setting title..."
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
                    {listFilter.subjectFilter.map((subject) => (
                      <CDropdownItem onClick={() => handleFilterSubject(subject)}>{subject}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{filter.type.title}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listFilter.typeFilter.map((type) => (
                      <CDropdownItem onClick={() => handleFilterType(type)}>{type.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listFilter.statusFilter.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Reload" placement="top">
                  <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                    <CIcon icon={cilSync} />
                  </CButton>
                </Tooltip>
                <Tooltip title="Add New Subject Setting" placement="right">
                  <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listSubjectSetting} columns={columns} pagination={false} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end">
            <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectSettingList
