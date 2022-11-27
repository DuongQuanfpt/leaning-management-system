import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Modal, Tag, Pagination } from 'antd'
import { CloseOutlined, CheckOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import settingListApi from '~/api/settingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

let ITEM_PER_PAGE = 10
const AdminSettingList = () => {
  const navigateTo = useNavigate()

  const [listSetting, setListSetting] = useState([])
  const [listType, setListType] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [type, setType] = useState('All Type')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterType: '',
    filterStatus: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    settingListApi.getFilter().then((response) => {
      setListType(response.typeFilter)
      setListStatus(response.statusFilter)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
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
    if (filter.filterType !== '') {
      params.filterType = filter.filterType
    }
    if (filter.filterStatus !== '') {
      params.filterStatus = filter.filterStatus
    }
    setLoading(true)
    await settingListApi
      .getPage(params)
      .then((response) => {
        setCurrentPage(page)
        setTotalItem(response.totalItem)
        setListSetting(response.listResult)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleActive = async (id) => {
    await settingListApi.changeActive(id).then((response) => {
      loadData(currentPage, filter)
    })
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterType = (type) => {
    setFilter({ ...filter, filterType: type.value })
    setType(type.title)
  }

  const handleFilterStatus = (status) => {
    setFilter({ ...filter, filterStatus: status.value })
    setStatus(status.name)
  }

  const handleReload = () => {
    setFilter({ q: '', filterType: '', filterStatus: '' })
    setType('All Type')
    setStatus('All Status')
    setSearch('')
    ITEM_PER_PAGE = 10
  }

  const handleAdd = () => {
    navigateTo('/setting-add')
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'typeName',
      sorter: (a, b) => a.typeName?.length - b.typeName?.length,
      width: '20%',
    },
    {
      title: 'Title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle?.length - b.settingTitle?.length,
      width: '20%',
    },

    {
      title: 'Value',
      dataIndex: 'settingValue',
      width: '25%',
    },
    {
      title: 'Display Order',
      dataIndex: 'displayOrder',
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '15%',
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, setting) => (
        <Space size="middle">
          <Tooltip title={setting.status === 'Active' ? 'Deactivate' : 'Reactivate'} placement="top">
            <Button
              type={setting.status === 'Active' ? 'danger' : 'primary'}
              shape="circle"
              icon={setting.status === 'Active' ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => {
                modalConfirm(setting)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/setting-detail/${setting?.settingId}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const modalConfirm = (setting) => {
    Modal.confirm({
      title: `Are you want to ${setting.status === 'Active' ? 'deactivate' : 'reactivate'} "${setting.settingTitle}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(setting.settingId)
      },
      onCancel() {},
    })
  }

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
                  <Breadcrumb.Item>Setting List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-6 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by title...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton
                  color="primary"
                  type="submit"
                  className="text-light ml-10"
                  onClick={handleSearch}
                  value={search}
                >
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{type}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listType.map((type) => (
                      <CDropdownItem onClick={() => handleFilterType(type)}>{type.title}</CDropdownItem>
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
                <Tooltip title="Add New Setting" placement="top">
                  <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listSetting} columns={columns} pagination={false} loading={loading} />
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

export default AdminSettingList
