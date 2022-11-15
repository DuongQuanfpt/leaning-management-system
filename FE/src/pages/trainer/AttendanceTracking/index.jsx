import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Space, Table, Typography } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import attendanceApi from '~/api/attendanceApi'

const AttendanceTracking = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [listAttendanceTracking, setListAttendanceTracking] = useState([])

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
      .getAttendanceTracking(params)
      .then((response) => {
        console.log(response)
        setListAttendanceTracking(response)
        // const result = response.map((item) => {
        //   const x = {
        //     accountName: item.accountName,
        //     fullName: item.fullName,
        //     absentPercent: item.absentPercent,
        //   }
        //   item.userAttendance.forEach((index) => (x[index.slot] = index.status))
        //   return x
        // })
        // // setListAttendanceTracking(result)
        // // setClone(result)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const column = [
    {
      title: 'Username',
      dataIndex: 'accountName',
      fixed: 'left',
      width: '10%',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      fixed: 'left',
      width: '10%',
    },
    {
      title: 'Absent Percent',
      dataIndex: 'absentPercent',
      fixed: 'left',
      width: '7%',
    },
    {
      title: () => {
        return (
          <Space className="w-100">
            {listAttendanceTracking[0]?.userAttendance?.map((item) => {
              return (
                <Space className="d-flex flex-column">
                  <Typography.Text strong>{item.date}</Typography.Text>
                  <Typography.Text></Typography.Text>
                  <Typography.Text strong>{item.slot}</Typography.Text>
                </Space>
              )
            })}
          </Space>
        )
      },
      dataIndex: 'userAttendance',
      width: '70%',
      render: (_, { userAttendance }, index) => {
        return (
          <Space className="w-100">
            {userAttendance.map((item) => {
              if (item.status === 'Present')
                return (
                  <Typography.Text strong type="success">
                    P
                  </Typography.Text>
                )
              if (item.status === 'Late')
                return (
                  <Typography.Text type="warning" strong>
                    L
                  </Typography.Text>
                )
              if (item.status === 'Absent')
                return (
                  <Typography.Text type="danger" strong>
                    A
                  </Typography.Text>
                )
              return <Typography.Text strong>-</Typography.Text>
            })}
          </Space>
        )
      },
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
                      <Breadcrumb.Item>Attendance Report</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table
                  bordered
                  dataSource={listAttendanceTracking}
                  columns={column}
                  pagination={false}
                  scroll={{
                    x: 1500,
                    y: 480,
                  }}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AttendanceTracking
