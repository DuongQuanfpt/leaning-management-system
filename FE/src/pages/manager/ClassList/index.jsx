import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space, Tag, Breadcrumb } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassList = () => {
  const navigateTo = useNavigate()

  const [listClass, setListClass] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await classListApi.getAll().then((response) => {
      setListClass(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await classListApi.changeActive(id).then((response) => {
      loadData()
    })
  }

  const columns = []

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
              <Breadcrumb.Item>Class List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="col-lg-12 m-b30">
            <Table bordered dataSource={listClass} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassList
