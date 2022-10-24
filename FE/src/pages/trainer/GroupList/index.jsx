import React from 'react'

import { Link } from 'react-router-dom'

import { Breadcrumb, Button, Table } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { BarsOutlined } from '@ant-design/icons'

const GroupList = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: '7%',
    },
    {
      title: 'Student',
      dataIndex: 'student',
      key: 'student',
      width: '43%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '5%',
    },
  ]
  const data = [
    {
      key: 0,
      student: 'Waiting List',
      color: '#ddd',
      children: [
        {
          student: 'No traiee available',
        },
      ],
      action: (
        <Button
          shape="circle"
          icon={<BarsOutlined />}
          onClick={() => {
            console.log('OK')
          }}
        ></Button>
      ),
    },
    {
      key: 1,
      student: 'G1 (Group1)',
      children: [
        {
          index: 11,
          student: 'John Brown',
          status: 'Active',
          email: 'New York No. 2 Lake Park',
          action: (
            <Button
              shape="circle"
              icon={<BarsOutlined />}
              onClick={() => {
                console.log('OK')
              }}
            ></Button>
          ),
        },
        {
          index: 12,
          student: 'John Brown jr.',
          status: 'Active',
          email: 'New York No. 3 Lake Park',
          action: (
            <Button
              shape="circle"
              icon={<BarsOutlined />}
              onClick={() => {
                console.log('OK')
              }}
            ></Button>
          ),
        },
        {
          index: 13,
          student: 'Jim Green sr.',
          status: 'Active',
          email: 'London No. 1 Lake Park',
          action: (
            <Button
              shape="circle"
              icon={<BarsOutlined />}
              onClick={() => {
                console.log('OK')
              }}
            ></Button>
          ),
        },
      ],
    },
    {
      key: 2,
      student: 'G2 (Group2)',
      children: [
        {
          index: 11,
          student: 'John Brown',
          status: 'Active',
          email: 'New York No. 2 Lake Park',
        },
        {
          index: 12,
          student: 'John Brown jr.',
          status: 'Active',
          email: 'New York No. 3 Lake Park',
        },
        {
          index: 13,
          student: 'Jim Green sr.',
          status: 'Active',
          email: 'London No. 1 Lake Park',
        },
      ],
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
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Group List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table columns={columns} dataSource={data} rowClassName={(record) => record?.color?.replace('#', '')} />
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default GroupList
