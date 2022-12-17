import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Modal, Tag, Pagination, Input } from 'antd'
import { CloseOutlined, CheckOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import settingListApi from '~/api/settingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import ToastMessage from '~/components/Common/ToastMessage'

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
  const [status, setStatus] = useState('All Statuses')
  const [filter, setFilter] = useState({
    filterType: '',
    filterStatus: '',
  })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    document.title = 'LMS - Setting List'
    window.scrollTo(0, 0)
  }, [])

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
    await settingListApi
      .changeActive(id)
      .then((response) => {
        loadData(currentPage, filter)
        ToastMessage('success', 'Change status successfully')
      })
      .catch(() => {
        ToastMessage('error', 'Change status failed, try again later')
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
      sorter: (a, b) => a.typeName.localeCompare(b.typeName, 'en', { sensitivity: 'base' }),
      width: '30%',
    },
    {
      title: 'Title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle.localeCompare(b.settingTitle, 'en', { sensitivity: 'base' }),
      width: '30%',
    },

    {
      title: 'Value',
      dataIndex: 'settingValue',
      sorter: (a, b) => a.settingValue.localeCompare(b.settingValue, 'en', { sensitivity: 'base' }),
      width: '25%',
    },
    {
      title: 'Display Order',
      dataIndex: 'displayOrder',
      sorter: (a, b) => a.displayOrder.localeCompare(b.displayOrder, 'en', { sensitivity: 'base' }),
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',
      sorter: (a, b) => a.status.localeCompare(b.status, 'en', { sensitivity: 'base' }),
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
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
                <Input.Search
                  placeholder="Search by title...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onSearch={handleSearch}
                  size="large"
                />
              </div>
              <div className="col-4 d-flex justify-content-end" style={{ gap: '10px' }}>
                <CDropdown>
                  <CDropdownToggle color="secondary">{type}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterType({ title: 'All Type', value: undefined })}>
                      All Type
                    </CDropdownItem>
                    {listType.map((type) => (
                      <CDropdownItem onClick={() => handleFilterType(type)}>{type.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown>
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: undefined })}>
                      All Statuses
                    </CDropdownItem>

                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Add New Setting" placement="top">
                  <CButton color="danger" type="submit" className="text-light" onClick={handleAdd}>
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
