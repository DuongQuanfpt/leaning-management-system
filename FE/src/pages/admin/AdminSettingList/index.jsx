import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space, Tag } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import settingListApi from '~/api/settingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AdminSettingList = () => {
  const navigateTo = useNavigate()

  const [listSetting, setListSetting] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await settingListApi.getAll().then((response) => {
      setListSetting(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await settingListApi.changeActive(id).then((response) => {
      loadData()
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'settingId',
      sorter: (a, b) => a.settingId - b.settingId,
      width: 80,
    },
    {
      title: 'Type',
      dataIndex: 'typeName',
      sorter: (a, b) => a.typeName?.length - b.typeName?.length,
      ellipsis: true,
    },
    {
      title: 'Title',
      dataIndex: 'settingTitle',
      sorter: (a, b) => a.settingTitle?.length - b.settingTitle?.length,
      ellipsis: true,
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
        return record?.settingTitle.toLowerCase().includes(value.toLowerCase())
      },
    },

    {
      title: 'Value',
      dataIndex: 'settingValue',
      sorter: (a, b) => a.settingValue?.length - b.settingValue?.length,
      ellipsis: true,
    },
    {
      title: 'Display Order',
      dataIndex: 'displayOrder',
      sorter: (a, b) => a.displayOrder - b.displayOrder,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      width: 150,
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
      render: (_, setting) => (
        <Space size="middle">
          <Button
            type={setting.status === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              handleActive(setting.settingId)
            }}
          >
            {setting.status === 'ACTIVE' ? 'Deactive' : 'Reactive'}
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigateTo(`/subject-detail/${setting?.subjectId}`)
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
            <Table bordered dataSource={listSetting} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminSettingList
