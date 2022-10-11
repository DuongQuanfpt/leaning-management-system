import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space, Tag, Breadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassList = () => {
  const navigateTo = useNavigate()

  const [listClass, setListClass] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await classListApi.getAll().then((response) => {
      setListClass(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await classListApi.changeActive(id).then((response) => {
      loadData()
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'classId',
      sorter: (a, b) => a.classId - b.classId,
      width: 80,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name?.length - b.name?.length,
      ellipsis: true,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      sorter: (a, b) => a.subject?.length - b.subject?.length,
      ellipsis: true,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      sorter: (a, b) => a.term - b.term,
      width: 150,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: (a, b) => a.branch?.length - b.branch?.length,
      width: 150,
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      sorter: (a, b) => a.trainer?.length - b.trainer?.length,
      width: 180,
    },
    {
      title: 'Supporter',
      dataIndex: 'supporter',
      sorter: (a, b) => a.supporter?.length - b.supporter?.length,
      width: 180,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      render: (_, { status }) => (
        <Tag color={status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'red' : 'primary'} key={status}>
          {status}
        </Tag>
      ),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 180,
      render: (_, setting) => (
        <Space size="middle">
          <Button
            type={setting.status === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              handleActive(setting.classId)
            }}
          >
            {setting.status === 'ACTIVE' ? 'Deactive' : 'Reactive'}
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigateTo(`/class-detail/${setting?.classId}`)
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
              <Breadcrumb.Item>Class List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30">
            <Table bordered dataSource={listClass} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassList
