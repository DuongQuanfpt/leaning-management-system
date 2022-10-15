import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SystemPermission = () => {
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {}

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>System Permission</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30"></div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SystemPermission
