import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Button, Checkbox, Image, Input, message, Radio, Space, Table } from 'antd'

import attendanceApi from '~/api/attendanceApi'

import avatar from '~/assets/images/profile/pic1.jpg'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AttendanceTracking = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [listAttendance, setListAttendance] = useState([])
  const [isShowImage, setIsShowImage] = useState(true)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    setLoading(true)

    await attendanceApi
      .getAttendanceDetail(id)
      .then((response) => {
        console.log(response)
        setListAttendance(
          response.map((attendance) => ({
            ...attendance,
            status:
              attendance.status === 'Present'
                ? 1
                : attendance.status === 'Late'
                ? 0
                : attendance.status === 'Absent'
                ? -1
                : null,
          })),
        )
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const columns = [
    {
      title: 'Class',
      dataIndex: 'classCode',
      width: '10%',
    },
    {
      title: 'Username',
      dataIndex: 'accountName',
      width: '12.5%',
    },
    {
      title: 'Fullname',
      dataIndex: 'fullName',
      width: '12.5%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '30%',
      render: (_, attendance) => (
        <Space>
          <Radio.Group
            onChange={(e) => {
              const newAttendance = [{ ...attendance, status: e.target.value }]
              const result = listAttendance.map(
                (obj) => newAttendance.find((o) => o.accountName === obj.accountName) || obj,
              )
              setListAttendance(result)
            }}
            value={attendance.status}
          >
            <Radio value={1}>Present</Radio>
            <Radio value={0}>Late</Radio>
            <Radio value={-1}>Absent</Radio>
          </Radio.Group>
        </Space>
      ),
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      width: '15%',
      render: (_, attendance) => (
        <Input
          value={attendance.comment}
          onChange={(e) => {
            const newAttendance = [{ ...attendance, comment: e.target.value }]
            const result = listAttendance.map(
              (obj) => newAttendance.find((o) => o.accountName === obj.accountName) || obj,
            )
            setListAttendance(result)
          }}
        />
      ),
    },
    {
      title: () => (
        <Checkbox defaultChecked onChange={(e) => setIsShowImage(e.target.checked)}>
          Show Image
        </Checkbox>
      ),
      dataIndex: 'image',
      width: '20%',
      render: (_, { image }) => isShowImage && <Image width={120} height={120} src={image} fallback={avatar} />,
    },
  ]

  const handleSave = async () => {
    const params = {
      dto: listAttendance.map((attendance) => ({
        accountName: attendance.accountName,
        classCode: attendance.classCode,
        comment: attendance.comment,
        fullName: attendance.fullName,
        image: attendance.image,
        status: attendance.status,
      })),
    }

    console.log(params)

    await attendanceApi
      .changeAttendanceDetail(id, params)
      .then((response) => {
        console.log(response)
        message.success({
          content: 'Update Attendance Successfully',
          style: {
            transform: `translate(0, 8vh)`,
          },
        })
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message === 'Must add status!') {
          message.error({
            content: 'You must fill all trainee status',
            style: {
              transform: `translate(0, 8vh)`,
            },
          })
          return
        }
        message.error({
          content: 'Something went wrong, please try again',
          style: {
            transform: `translate(0, 8vh)`,
          },
        })
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
                  <div className="col-12 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/schedule-list">Schedule List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Attendance Tracking</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <Table columns={columns} dataSource={listAttendance} loading={loading} pagination={false} bordered />
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

export default AttendanceTracking
