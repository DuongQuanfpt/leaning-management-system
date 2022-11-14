import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Table, Typography } from 'antd'

import attendanceApi from '~/api/attendanceApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ScheduleAttendance = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [listAttendance, setListAttendance] = useState([])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadData = async () => {
    setLoading(true)
    const params = {
      filterClass: currentClass,
    }

    await attendanceApi
      .getScheduleAttendance(params)
      .then((response) => {
        console.log(response)
        setListAttendance(response)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const columns = [
    {
      title: 'Slot',
      dataIndex: 'slot',
      width: '12.5%',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      width: '12.5%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '12.5%',
    },
    {
      title: 'From',
      dataIndex: 'fromTime',
      width: '12.5%',
    },
    {
      title: 'To',
      dataIndex: 'toTime',
      width: '12.5%',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      width: '12.5%',
    },
    {
      title: 'Is Attendance',
      dataIndex: 'scheduleStatus',
      width: '12.5%',
      render: (_, { scheduleStatus }) => (scheduleStatus === 'Inactive' ? 'No' : 'Yes'),
    },
    {
      title: 'My Attendance',
      dataIndex: 'attendanceStatus',
      width: '12.5%',
      render: (_, { attendanceStatus }) => (
        <Typography.Text
          type={
            attendanceStatus === 'Present'
              ? 'success'
              : attendanceStatus === 'Late'
              ? 'warning'
              : attendanceStatus === 'Absent'
              ? 'danger'
              : 'primary'
          }
          strong
        >
          {attendanceStatus !== null ? attendanceStatus : ''}
        </Typography.Text>
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
                      <Breadcrumb.Item>Class Attendance</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <Table columns={columns} dataSource={listAttendance} loading={loading} pagination={false} bordered />
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ScheduleAttendance
