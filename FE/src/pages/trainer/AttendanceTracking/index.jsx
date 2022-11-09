import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Breadcrumb, Table, Tag } from 'antd'

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
      .getAttendanceDetail(params)
      .then((response) => {
        console.log(response)
        setListAttendanceTracking(response)
        const result = response.map((item) => {
          const x = {
            accountName: item.accountName,
            fullName: item.fullName,
            absentPercent: item.absentPercent,
          }
          item.userAttendance.forEach((index) => (x[index.slot] = index.status))
          return x
        })
        // setListAttendanceTracking(result)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const x = listAttendanceTracking.map((item) => {
    const baseObject = {}
    for (const property in item) {
      baseObject[property] = item[property]
    }
    return baseObject
  })

  const array = []

  for (const property in x[0]) {
    array.push({
      title: property,
      dataIndex: property,
      render: () => property,
    })
  }
  // title: 'slot 1',
  // dataIndex: 'slot 1'
  // render (_) =>
  array[0] = {
    ...array[0],
    title: 'Username',
    width: '10%',
    fixed: 'left',
  }
  array[1] = {
    ...array[1],
    title: 'Fullname',
    width: '10%',
    fixed: 'left',
  }
  array[2] = {
    ...array[2],
    title: 'Absent Percent',
    width: '10%',
    fixed: 'left',
  }

  const column = [
    {
      title: 'Username',
      dataIndex: 'accountName',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
    },
    {
      title: 'dummy',
      dataIndex: 'safdf',
      render: (_, { userAttendance }) => {
        console.log(userAttendance)
        return <span> 1</span>
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
                      <Breadcrumb.Item>Attendance Tracking</Breadcrumb.Item>
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
