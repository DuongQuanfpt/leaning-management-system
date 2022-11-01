import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Pagination, Space, Table, Tag } from 'antd'
import {} from '@ant-design/icons'

import scheduleApi from '~/api/scheduleApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ScheduleList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

  const [schedule, setSchedule] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const params = {}
    await scheduleApi
      .getSchedule(params)
      .then((response) => {
        console.log(response)
        setSchedule(response.listResult)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChangePage = (pageNumber) => {}

  const columns = [
    {
      title: 'Slot',
      dataIndex: 'modules',
      width: '10%',
      render: (_, { modules }) => modules.slot,
    },
    {
      title: 'Topic',
      dataIndex: 'modules',
      width: '20%',
      render: (_, { modules }) => modules.topic,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '17%',
    },
    {
      title: 'From',
      dataIndex: 'fromTime',
      width: '11%',
    },
    {
      title: 'To',
      dataIndex: 'toTime',
      width: '11%',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      width: '11%',
      render: (_, { room }) => room?.title,
    },
    {
      title: 'Take Attendance',
      dataIndex: 'status',
      width: '15%',
      // Active : Đã điểm danh hôm đó, click vào thì cho sửa
      // Inactive: Chưa điểm danh hôm đó
      // Attendance taken: ?
      render: (_, { status }) => (status === 'Active' ? 'Edit Attendance' : status === 'Inactive' ? 'Take' : ''),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '5%',
      render: (_, subject) => <Space size="middle" align="baseline"></Space>,
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
                  <div className="col-4 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Schedule List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={schedule} columns={columns} pagination={false} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end">
                <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ScheduleList
