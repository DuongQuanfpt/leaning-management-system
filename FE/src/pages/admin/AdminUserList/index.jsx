import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Tag, Breadcrumb, Pagination, Tooltip, Modal } from 'antd'
import { EyeOutlined, CloseOutlined, CheckOutlined, ExclamationCircleOutlined, LikeOutlined } from '@ant-design/icons'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

import userListApi from '~/api/userListApi'

const AdminUserList = () => {
  const ITEM_PER_PAGE = 10

  const navigateTo = useNavigate()

  const [listUser, setListUser] = useState([])
  const [search, setSearch] = useState('')
  const [listRoles, setListRoles] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [role, setRole] = useState('All Roles')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterRole: '',
    filterStatus: '',
  })

  useEffect(() => {
    userListApi.getFilter().then((response) => {
      setListRoles(response.roleFilter)
      setListStatus(response.statusFilter)
    })
  }, [])

  useEffect(() => {
    loadData(1, filter)
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
    }
    if (q !== '') {
      params.q = q
    }
    if (filter.filterRole !== '') {
      params.filterRole = filter.filterRole
    }
    if (filter.filterStatus !== '') {
      params.filterStatus = filter.filterStatus
    }
    await userListApi.getPage(params).then((response) => {
      console.log(response)
      setTotalItem(response.totalItem)
      setListUser(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await userListApi.changeActive(id).then((response) => {
      loadData(1, filter)
    })
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterRole = (role) => {
    setFilter({ ...filter, filterRole: role.title })
    setRole(role.title)
  }

  const handleFilterStatus = (status) => {
    setFilter({ ...filter, filterStatus: status.value })
    setStatus(status.name)
  }

  console.log(filter)

  const handleReload = () => {
    setCurrentPage(1)
    setRole('All Roles')
    setStatus('All Status')
    setFilter({ q: '', filterRole: '', filterStatus: '' })
  }

  const handleAdd = () => {
    navigateTo('/user-add')
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
  }

  const modalConfirm = (user) => {
    const type = user.status === 'Active' ? 'deactivate' : user.status === 'Inactive' ? 'reactivate' : 'verify'
    Modal.confirm({
      title: `Are you want to ${type} "${user.email}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(user.userId)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      sorter: (a, b) => a.userId - b.userId,
      width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username?.length - b.username?.length,
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
    },

    {
      title: 'Mobile',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile?.length - b.mobile?.length,
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      sorter: (a, b) => a.roles.length - b.roles.length,
      width: 200,
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color
            switch (role.title) {
              case 'admin': {
                color = 'red'
                break
              }
              case 'manager': {
                color = 'volcano'
                break
              }
              case 'supporter': {
                color = 'gold'
                break
              }
              case 'trainer': {
                color = 'lime'
                break
              }
              case 'trainee': {
                color = 'green'
                break
              }
              case 'expert': {
                color = 'purple'
                break
              }
              default: {
                color = 'red'
              }
            }
            return (
              <Tag color={color} key={role}>
                {role.title}
              </Tag>
            )
          })}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'gold'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
      render: (_, user) => (
        <Space size="middle">
          <Tooltip
            title={user.status === 'Active' ? 'Deactivate' : user.status === 'Inactive' ? 'Reactivate' : 'Verify'}
            placement="top"
          >
            <Button
              type={user.status === 'Active' ? 'danger' : user.status === 'Inactive' ? 'primary' : 'warning'}
              shape="circle"
              icon={
                user.status === 'Active' ? (
                  <CloseOutlined />
                ) : user.status === 'Inactive' ? (
                  <CheckOutlined />
                ) : (
                  <LikeOutlined />
                )
              }
              onClick={() => {
                modalConfirm(user)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/user-detail/${user?.userId}`)
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
              <div className="col-2 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>User List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-6 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by Fullname, Email or Mobile...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{role}</CDropdownToggle>
                  <CDropdownMenu>
                    {listRoles.map((role) => (
                      <CDropdownItem onClick={() => handleFilterRole(role)}>{role.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                  <CIcon icon={cilSync} />
                </CButton>
                <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                  <CIcon icon={cilPlus} />
                </CButton>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listUser} columns={columns} pagination={false} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end">
            <Pagination defaultCurrent={currentPage} total={totalItem} onChange={handleChangePage} />;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminUserList
