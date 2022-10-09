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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'classId',
      sorter: (a, b) => a.classId - b.classId,
      width: 80,
    },
    {
      title: 'Package',
      dataIndex: 'package',
      sorter: (a, b) => a.package?.length - b.package?.length,
      ellipsis: true,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      sorter: (a, b) => a.code?.length - b.code?.length,
      ellipsis: true,
    },
    {
      title: 'Term',
      dataIndex: 'term',
      sorter: (a, b) => a.term - b.term,
      width: 150,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Term"
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
        return record?.term.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: (a, b) => a.branch?.length - b.branch?.length,
      width: 150,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Branch"
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
        return record?.branch.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      sorter: (a, b) => a.trainer?.length - b.trainer?.length,
      width: 180,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Trainer"
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
        return record?.trainer.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Supporter',
      dataIndex: 'supporter',
      sorter: (a, b) => a.supporter?.length - b.supporter?.length,
      width: 180,
      filterDropdown: ({ selectedKeys, setSelectedKeys, confirm, clearFilters }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Searching by Supporter"
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
        return record?.supporter.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      ellipsis: true,
      filters: [
        { text: 'ACTIVE', value: 'ACTIVE' },
        { text: 'INACTIVE', value: 'INACTIVE' },
        { text: 'CLOSED', value: 'CLOSED' },
      ],
      onFilter: (value, record) => record.status === value,
      render: (_, { status }) => (
        <Tag color={status === 'ACTIVE' ? 'green' : status === 'INACTIVE' ? 'red' : 'primary'} key={status}>
          {status}
        </Tag>
      ),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 180,
      render: (_, setting) => (
        <Space size="middle">
          <Button
            type={setting.status === 'ACTIVE' ? 'danger' : 'primary'}
            onClick={() => {
              handleActive(setting.classId)
            }}
          >
            {setting.status === 'ACTIVE' ? 'Deactive' : 'Reactive'}
          </Button>
          <Button
            type="link"
            onClick={() => {
              navigateTo(`/class-detail/${setting?.classId}`)
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
