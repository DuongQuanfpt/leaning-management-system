import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Table, Input, Button, Space, Tag, Breadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

import userListApi from '~/api/userListApi'

const AdminUserList = () => {
  const navigateTo = useNavigate()

  const [listSetting, setListSetting] = useState([])

  useEffect(() => {
    userListApi.getAll().then((response) => {
      loadData()
    })
  }, [])

  const loadData = async () => {
    await userListApi.getAll().then((response) => {
      setListSetting(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await userListApi.changeActive(id).then((response) => {
      loadData()
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
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
      width: 180,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      width: 220,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Manager"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
            <Button
              type="primary"
              onClick={() => {
                confirm()
              }}
            >
              Search
            </Button>
            <Button
              type="danger"
              onClick={() => {
                clearFilters()
                confirm()
              }}
            >
              Clear
            </Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record?.email.toLowerCase().includes(value.toLowerCase())
      },
    },

    {
      title: 'Mobile',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile?.length - b.mobile?.length,
      width: 140,
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      sorter: (a, b) => a.roles.length - b.roles.length,
      width: 150,
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color
            switch (role) {
              case 'admin': {
                color = 'volcano'
                break
              }
              case 'manager': {
                color = 'orange'
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
                {role.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
      filters: [
        { text: 'admin', value: 'admin' },
        { text: 'manager', value: 'manager' },
        { text: 'supporter', value: 'supporter' },
        { text: 'trainer', value: 'trainer' },
        { text: 'trainee', value: 'trainee' },
        { text: 'expert', value: 'expert' },
      ],
      onFilter: (value, record) => record?.roles?.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      width: 120,
      filters: [
        { text: 'ACTIVE', value: 'ACTIVE' },
        { text: 'INACTIVE', value: 'INACTIVE' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <Tag color={status === 'ACTIVE' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      ellipsis: true,
      width: 170,
      render: (_, user) => (
        <Space size="middle">
          <Button
            type={user.status === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              handleActive(user.userId)
            }}
          >
            {user.status === 'ACTIVE' ? 'Deactive' : 'Reactive'}
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigateTo(`/user-detail/${user?.userId}`)
            }}
          >
            View
          </Button>
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
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>User List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30">
            <Table bordered dataSource={listSetting} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminUserList
