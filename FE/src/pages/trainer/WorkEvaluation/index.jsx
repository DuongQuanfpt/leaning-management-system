import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Button, Table } from 'antd'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const WorkEvaluation = () => {
  const { id } = useParams()
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [listWork, setListWork] = useState([])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - Work Evaluation'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    const res = submitApi.getListSubmitFilter(id).then((response) => console.log(response))
    console.log(res)
  }

  useEffect(() => {
    console.log(listWork)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = []

  const handleSave = async () => {}

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
                  <div className="col-12 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/submit-list">Submit List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Work Evaluation</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <Table columns={columns} dataSource={listWork} loading={loading} pagination={false} bordered />
              </div>
              <div className="col-lg-12 m-b30 d-flex justify-content-center">
                <Button type="primary" onClick={handleSave}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default WorkEvaluation
