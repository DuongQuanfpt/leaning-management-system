import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space, Tag, Breadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SystemPermission = () => {
  const navigateTo = useNavigate()

  const [listPermission, setListPermission] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {}

  const handleActive = async (id) => {}

  const columns = []

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
              <Breadcrumb.Item>System Permission</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30">
            <Table bordered dataSource={listPermission} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SystemPermission
