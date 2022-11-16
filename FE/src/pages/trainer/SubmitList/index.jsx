import React, { useState } from 'react'
import { Breadcrumb, Segmented } from 'antd'
import { useSelector } from 'react-redux'

import Group from './Group'
import Individual from './Individual'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const SubmitList = () => {
  const [mode, setMode] = useState('Group')

  const { currentClass } = useSelector((state) => state.profile)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Submit List</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12 m-b30">
                  <Segmented
                    options={[
                      {
                        label: 'Group',
                        value: 'Group',
                      },
                      {
                        label: 'Individual',
                        value: 'Individual',
                      },
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                  <div className="widget-box">
                    {mode === 'Group' && <Group />}
                    {mode === 'Individual' && <Individual />}
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

export default SubmitList
