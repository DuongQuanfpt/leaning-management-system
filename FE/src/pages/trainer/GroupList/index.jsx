import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Space, Table, Tag, Typography, Avatar, Dropdown, Menu, message, Modal, Select } from 'antd'
import { CrownTwoTone, ExclamationCircleOutlined, MoreOutlined } from '@ant-design/icons'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import groupApi from '~/api/groupApi'

import LocalizedModal from './LocalizedModal'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const GroupList = () => {
  const navigateTo = useNavigate()

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
  const [choice, setChoice] = useState(1)

  useEffect(() => {
    loadMilestone()
  }, [])

  const loadMilestone = async () => {
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

  const loadGroup = async (params) => {
    await groupApi
      .getGroup(params)
      .then((response) => {
        setIsHaveGroup(response.listResult.length === 0 ? false : true)
        setWaitingList(response.noGroup)
        const waitingGroup = {
          classCode: '',
          description: '',

          groupCode: 'Waiting List',
          topicName: 'These trainee would work personally',

          groupId: '',
          groupMembers: response.noGroup.map((item, index) => ({ key: 'index', memberInfo: item })),
          key: '',
          milestone: [],
          status: '',
        }
        const group = [waitingGroup, ...response.listResult.map((item, index) => ({ ...item, key: index }))]
        setGroup(group)
      })

      .catch((error) => {
        console.log(error)
      })
  }

  const handleFilterMilestone = async (milestone) => {
    setFilter((prev) => ({
      ...prev,
      milstone: milestone,
    }))
    const params = {
      filterMilestone: milestone.milestoneId,
    }

    loadGroup(params)
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({
      ...prev,
      status: status,
    }))
  }

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        marginTop: '8vh',
      },
    })
  }

  const modalConfirm = (callbackHandler, message) => {
    Modal.confirm({
      title: message,
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        callbackHandler()
      },
      onCancel() {},
    })
  }

  const modalChangeGroup = (trainee) => {}

  const modalAddStudentFromWaitingList = (group) => {
    let userName = ''

    Modal.confirm({
      title: `Add Student From Waiting List`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        const handleAddStudentFromWaitingList = async () => {
          await groupApi
            .addFromWaitingList(userName, group.groupId, filter.milstone.milestoneId)
            .then(() => {
              toastMessage('success', 'Add Student Successfully!')
              loadGroup({ filterMilestone: filter.milstone.milestoneId })
            })
            .catch((error) => {
              console.log(error)
              toastMessage('error', 'Something went wrong, please try again')
            })
        }
        if (userName === '') {
          toastMessage('error', 'You must select one student')
          return
        }
        modalConfirm(handleAddStudentFromWaitingList, `Are you sure want to add <${userName}> to <${group.groupCode}>?`)
      },
      onCancel() {},
      width: '600px',
      content: (
        <>
          <Typography className="mt-1 mb-3">{`Select student you want add to <${group.groupCode}> `}</Typography>
          <Select
            defaultValue="Select Student from Waiting List"
            style={{
              width: 400,
            }}
            onChange={(e) => (userName = e)}
          >
            {waitingList.map((item, index) => (
              <Select.Option value={item.username}>{`${item.username} - ${item.fullName}`}</Select.Option>
            ))}
          </Select>
        </>
      ),
    })
  }

  // const modalDetachGroup = (group) => {
  //   Modal.confirm({
  //     title: `Detach Group`,
  //     okText: 'Confirm',
  //     cancelText: 'Cancel',
  //     okType: 'danger',
  //     onOk() {
  //       groupApi
  //         .detachGroup(group.groupId, filter.milstone.milestoneId)
  //         .then(() => {
  //           toastMessage('success', 'Detach Group Successfully!')
  //           loadGroup({ filterMilestone: filter.milstone.milestoneId })
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           toastMessage('error', 'Something went wrong, please try again')
  //         })
  //     },
  //     onCancel() {},
  //     content: (
  //       <Typography className="mt-1 mb-3">{`All student of this group will be moved to Waiting List. Are you sure want to detach group <${group.groupCode}> ? `}</Typography>
  //     ),
  //   })
  // }

  const menuStudent = (trainee) => (
    <Menu
      items={[
        {
          key: '1',
          label: 'Set as Leader',
          disabled: trainee.isLeader || !trainee.groupId,
          onClick: () => {
            const handleChangeLeader = async () => {
              await groupApi
                .setLeader(trainee.memberInfo.username, trainee.groupId)
                .then(() => {
                  toastMessage('success', 'Change Leader Successfully!')
                  loadGroup({ filterMilestone: filter.milstone.milestoneId })
                })
                .catch((error) => {
                  console.log(error)
                  toastMessage('error', 'Something went wrong, please try again')
                })
            }
            modalConfirm(
              handleChangeLeader,
              `Are you sure want to promote <${trainee.memberInfo.username}> (${trainee.memberInfo.fullName}) to leader ?`,
            )
          },
        },
        {
          key: '2',
          label: 'Change Group',
          onClick: () => {
            modalChangeGroup(trainee)
          },
        },
        {
          type: 'divider',
        },
        {
          key: '3',
          label: 'Remove',
          disabled: !trainee.groupId,
          onClick: () => {
            const handleRemove = async () => {
              await groupApi
                .remove(trainee.memberInfo.username, trainee.groupId, filter.milstone.milestoneId)
                .then(() => {
                  toastMessage('success', 'Remove Student Successfully!')
                  loadGroup({ filterMilestone: filter.milstone.milestoneId })
                })
                .catch((error) => {
                  console.log(error)
                  toastMessage('error', 'Something went wrong, please try again')
                })
            }

            modalConfirm(
              handleRemove,
              `${trainee.memberInfo.username} will be moved to Waiting List. Are you sure want to remove ${trainee.memberInfo.username} ?`,
            )
          },
        },
      ]}
    />
  )

  const menuGroup = (group) => (
    <Menu
      items={[
        {
          key: Math.random(),
          label: 'Add New Student',
          disabled: waitingList.length === 0,
          onClick: () => {
            modalAddStudentFromWaitingList(group)
          },
        },
        {
          key: Math.random(),
          label: 'Group Detail',
          onClick: () => {
            console.log(group)
            navigateTo(`/group-detail/${group.groupId}`)
          },
        },
        { type: 'divider' },
        {
          key: Math.random(),
          label: group.status === 'Active' ? 'Deactivate' : 'Reactivate',
          onClick: () => {
            console.log(group)
            // const handleActivate = async () => {}
          },
        },
      ]}
    />
  )

  const expandedRowRender = (group) => {
    const listMember = group?.groupMembers?.map((item, index) => ({
      ...item,
      key: index + 1,
    }))
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
        render: (_, trainee) => {
          return {
            props: {
              style: { padding: 0, margin: 0 },
            },
            children: trainee.empty ? (
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
          }
        },
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        render: (_, trainee) => {
          return {
            props: {
              style: { padding: 0, margin: 0 },
            },
            children: trainee?.memberInfo?.email,
          }
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '13%',
        render: (_, trainee) => {
          return {
            props: {
              style: { padding: 0, margin: 0 },
            },
            children: trainee.isActive && (
              <Tag color={trainee?.isActive ? 'green' : 'red'} key={trainee?.isActive}>
                {trainee?.isActive ? 'Active' : 'Inactive'}
              </Tag>
            ),
          }
        },
      },
      {
        title: 'Action',
        key: Math.random(),
        width: '7%',

        render: (_, trainee) =>
          !trainee.empty && (
            <Space>
              <Dropdown overlay={menuStudent(trainee)} placement="left" trigger={['click']}>
                <Button
                  shape="circle"
                  icon={<MoreOutlined />}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                ></Button>
              </Dropdown>
            </Space>
          ),
      },
    ]

    const customLocale = {
      emptyText: 'No trainee here',
    }

    return (
      <Table locale={customLocale} pagination={false} showHeader={false} columns={columns} dataSource={listMember} />
    )
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
      render: (_, { status }) => {
        return {
          props: {
            style: { padding: 0, margin: 0 },
          },
          children: status && (
            <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
              {status}
            </Tag>
          ),
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '7%',
      render: (_, group) =>
        group.groupCode !== 'Waiting List' && (
          <Space>
            <Dropdown overlay={menuGroup(group)} placement="left" trigger={['click']}>
              <Button
                shape="circle"
                icon={<MoreOutlined />}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              ></Button>
            </Dropdown>
          </Space>
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
                  <div className="col-12 d-flex align-items-center">
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
                    expandable={{ expandedRowRender, defaultExpandedRowKeys: [''] }}
                    // expandRowByClick={true}
                    dataSource={group}
                    pagination={false}
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
