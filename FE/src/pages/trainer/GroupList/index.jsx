import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Breadcrumb, Button, Menu, Space, Table, Tag, Typography, Dropdown } from 'antd'
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import groupApi from '~/api/groupApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const GroupList = () => {
  const [listFilter, setListFilter] = useState({
    milstoneFilter: [],
    statusFilter: [
      {
        name: 'All Member Statuses',
        value: null,
      },
      {
        name: 'Active',
        value: 1,
      },
      {
        name: 'Inactive',
        value: 0,
      },
    ],
  })

  const [filter, setFilter] = useState({
    milstone: {
      milestoneId: '',
      title: 'Select Milestone',
    },

    status: {
      name: 'All Member Statuses',
      value: null,
    },
  })

  const [group, setGroup] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    groupApi
      .getFilter()
      .then((response) => {
        setListFilter((prev) => ({
          ...prev,
          milstoneFilter: response.milstoneFilter,
        }))
      })
      .catch((error) => console.log(error))
  }

  const handleFilterMilestone = async (milestone) => {
    const groupId = milestone.groupId

    setFilter((prev) => ({
      ...prev,
      milstone: milestone,
    }))

    await groupApi
      .getDetail(groupId)
      .then((response) => {
        console.log(response)
        setGroup(response.listResult)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({
      ...prev,
      status: status,
    }))
  }

  const menu = (
    <Menu
      items={[
        { key: '1', label: 'Action 1' },
        { key: '2', label: 'Action 2' },
      ]}
    />
  )

  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Space size="large">
            {/* <Button.Link>Pause</Button.Link>
            <Button.Link>Stop</Button.Link>
            <Dropdown overlay={menu}>
              <Button.Link>
                More <DownOutlined />
              </Button.Link>
            </Dropdown> */}
            <Button>a</Button>
          </Space>
        ),
      },
    ]

    const data = []
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      })
    }
    return <Table showHeader={false} columns={columns} dataSource={data} pagination={false} />
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ]

  const data = []
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
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
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Group List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <CDropdown className=" mr-4">
                  <CDropdownToggle color="secondary">{filter.milstone.title}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listFilter.milstoneFilter.map((milestone) => (
                      <CDropdownItem onClick={() => handleFilterMilestone(milestone)}>{milestone.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className=" mr-4">
                  <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listFilter.statusFilter.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </div>
              <div className="col-lg-12 m-b30">
                <Typography.Text className="mr-4" type="warning" strong>
                  Trainee have not been grouped
                </Typography.Text>
                <Typography.Link strong underline>
                  <Link to="/new-group">Create Groups</Link>
                </Typography.Link>
              </div>
              <div className="col-lg-12 m-b30">
                <Typography.Text className="mr-4" type="warning" strong>
                  This milestone has groups already
                </Typography.Text>
                <Typography.Link strong underline className="mr-4">
                  <Link to="/">Reset Groups</Link>
                </Typography.Link>
                <Typography.Link strong underline>
                  <Link to="/">Remove Groups</Link>
                </Typography.Link>
              </div>
              <div className="col-lg-12 m-b30">
                {/* <Table
                  bordered
                  rowClassName={(record, index) => {
                    return typeof record.key === 'number' ? 'bg-row-antd-table' : ''
                  }}
                  columns={columns}
                  dataSource={data}
                /> */}

                <Table
                  columns={columns}
                  expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
                  expandRowByClick={true}
                  dataSource={data}
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

export default GroupList
