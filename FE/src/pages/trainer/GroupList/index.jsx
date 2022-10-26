import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Badge, Breadcrumb, Button, Menu, Space, Table, Tag, Typography, Dropdown, Avatar } from 'antd'
import { CrownTwoTone, MoreOutlined } from '@ant-design/icons'

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

  const [group, setGroup] = useState([])
  const [waitingList, setWaitingList] = useState([])
  const [isHaveGroup, setIsHaveGroup] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    groupApi
      .getGroup()
      .then((response) => {
        setListFilter((prev) => ({
          ...prev,
          milstoneFilter: response.milstoneFilter,
        }))
      })
      .catch((error) => console.log(error))
  }

  const handleFilterMilestone = async (milestone) => {
    setFilter((prev) => ({
      ...prev,
      milstone: milestone,
    }))
    const params = {
      filterMilestone: milestone.milestoneId,
    }
    await groupApi
      .getGroup(params)
      .then((response) => {
        setIsHaveGroup(response.listResult.length === 0 ? false : true)
        const group = response.listResult.map((item, index) => ({ ...item, key: index }))
        setWaitingList(response.noGroup)
        return group
      })
      .then((group) => {
        const waitingGroup = {
          classCode: '',
          description: '',

          groupCode: 'Waiting List',
          topicName: 'These trainee would work personally',

          groupId: '',
          groupMembers: [{ key: '', empty: true }],
          key: '',
          milestone: [],
          status: '',
        }
        setGroup([waitingGroup, ...group])
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

  const expandedRowRender = (group) => {
    const listMember = group?.groupMembers.map((item, index) => ({ ...item, key: index + 1 }))

    const columns = [
      {
        title: '#',
        dataIndex: 'key',
        key: 'key',
        width: '8%',
        render: (_, trainee) => (trainee.empty ? '' : trainee.key),
      },
      {
        title: 'Student',
        dataIndex: 'student',
        key: 'student',
        width: '42%',
        render: (_, trainee) =>
          trainee.empty ? (
            <Space>
              <Typography>No trainee here</Typography>
            </Space>
          ) : (
            <Space>
              <Avatar src={trainee?.memberInfo?.profileUrl} />
              <Space className="flex-column pl-3" style={{ width: '250px' }}>
                <p
                  className="p-0 m-0 d-flex align-items-center "
                  style={{ fontSize: '14px', lineHeight: '18px', fontWeight: '500' }}
                >
                  {trainee?.memberInfo?.fullName} {trainee.isLeader && <CrownTwoTone className="ml-2" />}
                </p>
                <p className="p-0 m-0" style={{ fontSize: '10px', lineHeight: '18px', fontWeight: '500' }}>
                  {trainee?.memberInfo?.username}
                </p>
              </Space>
            </Space>
          ),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        render: (_, trainee) => trainee?.memberInfo?.email,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '13%',
        render: (_, trainee) =>
          trainee.isActive && (
            <Tag color={trainee?.isActive ? 'green' : 'red'} key={trainee?.isActive}>
              {trainee?.isActive ? 'Active' : 'Inactive'}
            </Tag>
          ),
      },
      {
        title: 'Action',
        key: Math.random(),
        width: '7%',

        render: (_, trainee) =>
          !trainee.empty && (
            <Button
              shape="circle"
              icon={<MoreOutlined />}
              onClick={(e) => {
                console.log(trainee)
                e.stopPropagation()
              }}
            ></Button>
          ),
      },
    ]

    return <Table showHeader={false} columns={columns} dataSource={listMember} pagination={false} />
  }

  const columnsGroup = [
    { title: '#', dataIndex: 'groupId', key: 'groupId', width: '1%', render: () => '' },
    {
      title: 'topicName',
      dataIndex: 'topicName',
      key: 'topicName',
      width: '79%',
      render: (_, group) => (
        <>
          <Typography className="d-flex flex-row">
            <Typography.Text className="mr-3" style={{ fontWeight: '500' }}>
              {group.groupCode}
            </Typography.Text>
            <Typography.Text>{`    (${group.topicName}) `}</Typography.Text>
          </Typography>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '13%',
      render: (_, { status }) =>
        status && (
          <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
            {status}
          </Tag>
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '7%',
      render: (_, group) =>
        group.status && (
          <Button
            shape="circle"
            icon={<MoreOutlined />}
            onClick={(e) => {
              console.log(group)
              e.stopPropagation()
            }}
          ></Button>
        ),
    },
  ]

  const columnsTrainee = [
    { title: '#', dataIndex: 'key', key: 'key', width: '10%' },
    { title: 'Student', dataIndex: 'student', key: 'student', width: '40%' },
    { title: 'Email', dataIndex: 'email', key: 'email', width: '30%' },
    { title: 'Status', dataIndex: 'status', key: 'status', width: '13%' },
    { title: 'Action', key: Math.random(), width: '7%' },
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
              {filter.milstone.title !== 'Select Milestone' &&
                (!isHaveGroup ? (
                  <div className="col-lg-12">
                    <Typography.Text className="mr-4" type="warning" strong>
                      Trainee have not been grouped
                    </Typography.Text>
                    <Typography.Link strong underline>
                      <Link to="/new-group">Create Groups</Link>
                    </Typography.Link>
                  </div>
                ) : (
                  <div className="col-lg-12">
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
                ))}
              {filter.milstone.title !== 'Select Milestone' && (
                <div className="col-lg-12 m-b30">
                  <Table
                    className="m-0 p-0"
                    style={{ transform: `translate(0px, 20px)` }}
                    columns={columnsTrainee}
                    dataSource={group}
                    pagination={false}
                    rowClassName={(record, index) => 'd-none'}
                  />
                  <Table
                    columns={columnsGroup}
                    showHeader={false}
                    expandedRowRender={(record) => expandedRowRender(record)}
                    expandRowByClick={true}
                    dataSource={group}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default GroupList
