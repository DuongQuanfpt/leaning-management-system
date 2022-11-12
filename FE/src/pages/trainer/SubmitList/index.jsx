import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Segmented } from 'antd'
import {} from '@ant-design/icons'

import submitApi from '~/api/submitApi'
import { useSelector } from 'react-redux'

import Group from './Group'
import Individual from './Individual'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useEffect } from 'react'

const SubmitList = () => {
  const [mode, setMode] = useState('Group')

  const { currentClass } = useSelector((state) => state.profile)
  const [listData, setListData] = useState([])
  const [listFilter, setListFilter] = useState([])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadData = async () => {
    const params = {
      isGroup: false,
    }
    await submitApi
      .getListSubmit(currentClass, params)
      .then((response) => {
        console.log(response)
        setListData(response)
      })
      .catch((error) => {
        console.log(error)
      })

    await submitApi
      .getListfilter(currentClass)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
                      <Breadcrumb.Item>Submit List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex align-items-center"></div>
                  <div className="col-4 d-flex align-items-center"></div>
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
                    {mode === 'Group' && <Group listData={listData} />}
                    {mode === 'Individual' && <Individual listData={listData} />}
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
