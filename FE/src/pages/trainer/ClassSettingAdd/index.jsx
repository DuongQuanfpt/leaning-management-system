import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassSettingAdd = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="col-lg-12 m-b30">
          <div className="row">
            <div className="col-12 d-flex align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/dashboard">Dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/class-setting-list">Class Setting List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Class Setting Add</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  )
}

export default ClassSettingAdd
