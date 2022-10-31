import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Segmented } from 'antd'
import {} from '@ant-design/icons'

import UploadFile from './UploadFile'
import Random from './Random'
import ReuseGroup from './ReuseGroup'
import CloneGroup from './CloneGroup'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const NewGroup = () => {
  const [mode, setMode] = useState('Upload file')

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
                  <div className="col-4 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/group-list">Group List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>New Group</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12 m-b30">
                  <Segmented
                    options={[
                      {
                        label: 'Upload file',
                        value: 'Upload file',
                      },
                      {
                        label: 'Random',
                        value: 'Random',
                      },
                      {
                        label: 'Reuse Group',
                        value: 'Reuse Group',
                      },
                      {
                        label: 'Clone Group',
                        value: 'Clone Group',
                      },
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                  <div className="widget-box">
                    {mode === 'Upload file' && <UploadFile />}
                    {mode === 'Random' && <Random />}
                    {mode === 'Reuse Group' && <ReuseGroup />}
                    {mode === 'Clone Group' && <CloneGroup />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default NewGroup
