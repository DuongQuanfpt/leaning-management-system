import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Table, Input, Button, Space, Tag, PageHeader, Breadcrumb } from 'antd'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  const [classDetail, setClassDetail] = useState({})

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await classListApi.getDetail(id).then((response) => {
      setClassDetail(response)
    })
  }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/class-list">Class List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Class Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30"></div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassDetail
