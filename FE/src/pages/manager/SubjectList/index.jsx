import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Table, Input, Button, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import subjectListApi from '~/api/subjectListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectList = () => {
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

  const handleActive = async (id) => {
    await subjectListApi.changeActive(id).then((response) => {
      loadData()
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'subjectId',
      sorter: (a, b) => a.subjectId - b.subjectId,
    },
    {
      title: 'Code',
      dataIndex: 'subjectCode',
      sorter: (a, b) => a.subjectCode?.length - b.subjectCode?.length,
    },
    {
      title: 'Name',
      dataIndex: 'subjectName',
      sorter: (a, b) => a.subjectName?.length - b.subjectName?.length,
    },
    {
      title: 'Manager',
      dataIndex: 'managerEmail',
      sorter: (a, b) => a.managerEmail?.length - b.managerEmail?.length,

      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Manager"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
            <Button
              type="primary"
              onClick={() => {
                confirm()
              }}
            >
              Search
            </Button>
            <Button
              type="danger"
              onClick={() => {
                clearFilters()
                confirm()
              }}
            >
              Clear
            </Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record?.managerEmail.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Expert',
      dataIndex: 'expertEmail',
      sorter: (a, b) => a.expertEmail?.length - b.expertEmail?.length,

      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Manager"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : [])
                confirm({ closeDropdown: false })
              }}
              onPressEnter={() => {
                confirm()
              }}
              onBlur={() => {
                confirm()
              }}
            ></Input>
            <Button
              type="primary"
              onClick={() => {
                confirm()
              }}
            >
              Search
            </Button>
            <Button
              type="danger"
              onClick={() => {
                clearFilters()
                confirm()
              }}
            >
              Clear
            </Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value, record) => {
        return record?.expertEmail.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Status',
      dataIndex: 'subjectStatus',
      sorter: (a, b) => a.subjectStatus?.length - b.subjectStatus?.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, subject) => (
        <Space size="middle">
          <Button
            type={subject.subjectStatus === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              handleActive(subject.subjectId)
            }}
          >
            {subject.subjectStatus === 'ACTIVE' ? 'Deactive' : 'Reactive'}
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigateTo(`/subject-detail/${subject?.subjectId}`)
            }}
          >
            View
          </Button>
        </Space>
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
            <Table bordered dataSource={listSubject} columns={columns} />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectList
