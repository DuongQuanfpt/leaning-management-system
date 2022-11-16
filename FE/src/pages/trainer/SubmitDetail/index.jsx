import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Button, Input, Select, Table, Typography } from 'antd'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubmitDetail = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const navigateTo = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listSubmitDetail, setListSubmitDetail] = useState([])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadData = async () => {
    setListSubmitDetail([
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ])
  }

  const columns = [
    { title: '#', dataIndex: 'id', width: '6%' },
    { title: 'Milestone', dataIndex: 'id', width: '21%' },
    { title: 'Requirement', dataIndex: 'id', width: '21%' },
    { title: 'Assignee', dataIndex: 'id', width: '11%' },
    { title: 'Status', dataIndex: 'id', width: '11%' },
    { title: 'WP', dataIndex: 'id', width: '6%' },
    {
      title: 'Actions',
      width: '12%',
      render: (_, submit) => (
        <>
          {submit.id % 2 === 0 ? (
            <>
              <Button type="link" className="px-2 mr-2">
                Evaluate
              </Button>
              <Button type="link" className="px-2 mr-2">
                Reject
              </Button>
            </>
          ) : (
            <Button type="link" className="px-2">
              View Result
            </Button>
          )}
        </>
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
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Typography.Title level={3}>Submit Detail</Typography.Title>
                  </div>
                </div>
              </div>
              <div className="widget-box">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-3 my-3">
                        <Select className="w-100" options={[]} placeholder={'Select Milestone'} />
                      </div>
                      <div className="col-2 my-3">
                        <Select className="w-100" options={[]} placeholder={'Select Group'} />
                      </div>
                      <div className="col-2 my-3">
                        <Select className="w-100" options={[]} placeholder={'Select Assignee'} />
                      </div>
                      <div className="col-2 my-3">
                        <Select className="w-100" options={[]} placeholder={'Select Status'} />
                      </div>
                      <div className="col-3 my-3">
                        <Input.Search className="w-100" placeholder={'Select Milestone'} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <Table
                      columns={columns}
                      dataSource={listSubmitDetail}
                      loading={loading}
                      pagination={false}
                      bordered
                    />
                  </div>
                  <div className="col-lg-12 m-b30">
                    <Button type="primary" onClick={() => navigateTo('/submit-list')}>
                      Back
                    </Button>
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

export default SubmitDetail
