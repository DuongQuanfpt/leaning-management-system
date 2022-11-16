import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Table, Typography, Button } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import scheduleApi from '~/api/scheduleApi'
import moment from 'moment'

const MySchedule = () => {
  const { fullName, roles } = useSelector((state) => state.profile)
  const navigateTo = useNavigate()
  const [loading, setLoading] = useState(false)
  const [listSchedule, setListSchedule] = useState([])
  const [mode, setMode] = useState('today')
  const [isTrainer, setIsTrainer] = useState(false)

  useEffect(() => {
    if (roles.includes('trainer')) {
      setIsTrainer(true)
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    setLoading(true)
    await scheduleApi
      .getMySchedule()
      .then((response) => {
        console.log(response)
        setListSchedule(response)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const column = [
    { title: 'Slot', dataIndex: 'slot', width: '10%' },
    { title: 'From', dataIndex: 'fromTime', width: '5%' },
    { title: 'To', dataIndex: 'toTime', width: '5%' },
    { title: 'Topic', dataIndex: 'topic', width: '24%' },
    { title: 'Class', dataIndex: 'classCode', width: '10%' },
    { title: 'Room', dataIndex: 'room', width: '10%', render: (_, { room }) => room.title },
    { title: 'Date', dataIndex: 'date', width: '10%', render: (_, { date }) => moment(date).format('DD-MM-YYYY') },
    {
      title: 'Take Attendance',
      dataIndex: 'status',
      width: '13%',
      render: (_, { status }) => (status === 'Inactive' ? 'Not Yet' : 'Taken'),
    },
    {
      title: 'Actions',
      width: '13%',
      render: (_, schedule) =>
        isTrainer && (
          <>
            <Button className="px-0 mx-0" type="link" onClick={() => navigateTo(`/attendance-tracking/${schedule.id}`)}>
              {schedule.status === 'Inactive'
                ? 'Take Attendance'
                : schedule.status === 'Active'
                ? 'Edit Attendance'
                : ''}
            </Button>
            <Typography.Text>{schedule.status === 'Attendance_taken' && 'Attendance Taken'}</Typography.Text>
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
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>My Schedule</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 mb-3">
                <Typography.Title level={4}>{`Schedule for ${
                  mode === 'today' ? 'today' : '3 days ago'
                } for ${fullName} (${moment().format('DD-MM-YYYY')})`}</Typography.Title>
              </div>
              <div className="col-lg-6 m-b10 d-flex justify-content-start">
                {mode === 'today' ? (
                  <Typography.Link className="mr-3" onClick={() => setMode('3daysago')}>
                    View Schedule 3 days ago
                  </Typography.Link>
                ) : (
                  <Typography.Link className="mr-3" onClick={() => setMode('today')}>
                    View Schedule Today
                  </Typography.Link>
                )}
                <Typography.Text className="mr-3">{`Access time: ${moment().format('hh:mm:ss')}`}</Typography.Text>
              </div>
              <div className="col-lg-6 m-b10 d-flex justify-content-end">
                {isTrainer && (
                  <Button type="link" className="px-0 mx-0" onClick={() => navigateTo('/attendance-report')}>
                    View Attendance Reports
                  </Button>
                )}
              </div>
              <div className="col-lg-12 m-b30">
                {mode === 'today' ? (
                  <Table
                    bordered
                    dataSource={listSchedule.todayClasses}
                    columns={column}
                    pagination={false}
                    loading={loading}
                  />
                ) : (
                  <Table
                    bordered
                    dataSource={listSchedule.threeDaysAgo}
                    columns={column}
                    pagination={false}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default MySchedule
