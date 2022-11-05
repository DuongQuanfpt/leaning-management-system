import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Button, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import classSettingListApi from '~/api/classSettingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassSettingList = () => {
  const ITEM_PER_PAGE = 10
  const { roles, currentClass } = useSelector((state) => state.profile)

  const navigateTo = useNavigate()

  const [listClassSetting, setListClassSetting] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [role, setRole] = useState({
    isSupporter: false,
    isTrainer: false,
  })

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    typeFilter: [],
    statusFilter: [],
  })
  const [filter, setFilter] = useState({
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
    classSettingListApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({
          ...prev,
          typeFilter: response.typeFilter,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
    if (roles.includes('trainer')) {
      setRole((prev) => ({ ...prev, isTrainer: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  const loadData = async (page, filter, q = '') => {
    const params = { limit: ITEM_PER_PAGE, page: page, filterClass: currentClass }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.type.title !== 'Select Type') {
      params.filterType = filter.type.value
    }
    if (filter.status.name !== 'Select Status') {
      params.filterStatus = filter.status.value
    }
    await classSettingListApi
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
  }

  const handleSearch = () => {
    loadData(1, filter, search)
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
    navigateTo('/class-setting-add')
  }

  const handleActive = async (id) => {
    await classSettingListApi
      .changeStatus(id)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const columns = [
    {
      title: 'Setting Title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle?.length - b.settingTitle?.length,
      width: '15%',
    },
    {
      title: 'Setting Value',
      dataIndex: 'settingValue',
      sorter: (a, b) => a.settingValue?.length - b.settingValue?.length,
      width: '15%',
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      sorter: (a, b) => a.typeName.title?.length - b.typeName.title?.length,
      render: (_, { typeName }) => typeName.title,
      width: '15%',
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
      title: 'Description',
      dataIndex: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      width: '35%',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          {role.isTrainer && (
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
          )}
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/class-setting-detail/${subject?.classSettingId}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.classSettingId === 'Active' ? 'deactivate' : 'reactivate'} "${
        subject.settingTitle
      }" - "${subject.settingValue}" ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject.classSettingId)
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
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Class Setting List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex w-80">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by Class title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
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
                    {role.isTrainer && (
                      <Tooltip title="Add New Class Setting" placement="right">
                        <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                          <CIcon icon={cilPlus} />
                        </CButton>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listClassSetting} columns={columns} pagination={false} />
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

export default ClassSettingList
