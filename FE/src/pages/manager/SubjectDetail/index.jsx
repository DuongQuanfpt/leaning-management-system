import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space, Tag, PageHeader, Breadcrumb } from 'antd'
import { SearchOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'

import subjectListApi from '~/api/subjectListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectDetail = () => {
  const navigateTo = useNavigate()

  const [listSubject, setListSubject] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await subjectListApi.getAll().then((response) => {
      setListSubject(response.listResult)
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
                <Link to="/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/subject-list">Subject List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Subject Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30"></div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectDetail
