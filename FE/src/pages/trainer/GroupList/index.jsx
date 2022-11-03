import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Breadcrumb,
  Button,
  Space,
  Table,
  Tag,
  Typography,
  Avatar,
  Dropdown,
  Menu,
  message,
  Modal,
  Select,
  Input,
} from 'antd'
import { CrownTwoTone, DownOutlined, ExclamationCircleOutlined, MoreOutlined, RightOutlined } from '@ant-design/icons'

import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import groupApi from '~/api/groupApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const GroupList = () => {
  const navigateTo = useNavigate()
  const { roles, currentClass } = useSelector((state) => state.profile)

  const [milestoneDetail, setMilestoneDetail] = useState({})
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
  const [isTrainer, setIsTrainer] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isTeamwork, setIsTeamwork] = useState(true)

  const groupNameRef = useRef(null)
  const topicNameRef = useRef(null)

  useEffect(() => {
    setListFilter({
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
    setFilter({
      milstone: {
        milestoneId: '',
        title: 'Select Milestone',
      },

      status: {
        name: 'All Member Statuses',
        value: null,
      },
    })
    loadMilestone()
    setIsTrainer(roles.includes('trainer'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadMilestone = async () => {
    await groupApi
      .getFilter(currentClass)
      .then((response) => {
        setMilestoneDetail(response)
        setListFilter((prev) => ({
          ...prev,
          milstoneFilter: response.milstoneFilter,
        }))
      })
      .catch((error) => console.log(error))
  }

  const loadGroup = async (params) => {
    const isOpen = milestoneDetail.milstoneFilter.filter((item) => item.milestoneId === params.filterMilestone)
    if (isOpen[0].status !== 'Open') {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }

    if (!isOpen[0].teamWork) {
      setIsTeamwork(false)
    }

    await groupApi
      .getGroup(params)
      .then((response) => {
        setIsHaveGroup(response.listResult.length === 0 ? false : true)
        setWaitingList(response.noGroup)
        const waitingGroup = {
          classCode: '',
          description: '',
          editable: true,
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
    if (filter.status.value !== null) {
      params.filterStatus = milestone.status.value === 1 ? true : false
    }

    loadGroup(params)
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({
      ...prev,
      status: status,
    }))
  }

  useEffect(() => {
    const params = {
      filterMilestone: filter.milstone.milestoneId,
    }
    if (filter.status.value !== null) {
      params.filterStatus = filter.status.value === 1 ? true : false
    }
    if (filter.milstone.title !== 'Select Milestone') {
      loadGroup(params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.status.value])

  const handleRemoveGroups = () => {
    const removeGroup = async () => {
      await groupApi
        .removeAllGroups(filter.milstone.milestoneId)
        .then((response) => {
          loadGroup({ filterMilestone: filter.milstone.milestoneId })
          toastMessage('success', 'Remove Groups Successfully!')
        })
        .catch((error) => {
          console.log(error)
          toastMessage('error', 'Something went wrong, please try again')
        })
    }
    modalConfirm(
      removeGroup,
      `All student from all groups will be moved to Waiting list. Are you sure want to remove all groups?`,
    )
  }

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
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
      async onOk() {
        await callbackHandler()
      },
      onCancel() {},
    })
  }

  const modalMoveToExist = (trainee) => {
    const listGroup = [...group.slice(1, group.length)].filter((group) => group.groupId !== trainee.groupId)

    let targetGroupId = null
    Modal.confirm({
      title: `Move student to existed group`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        const handleFromGroupMoveToExistGroup = async () => {
          await groupApi
            .moveFromGroupToExistGroup(trainee.memberInfo.username, trainee.groupId, targetGroupId)
            .then(() => {
              toastMessage('success', 'Add Student Successfully!')
              loadGroup({ filterMilestone: filter.milstone.milestoneId })
            })
            .catch((error) => {
              console.log(error)
              toastMessage('error', 'Something went wrong, please try again')
            })
        }

        const handleFromWaitingListMoveToExistGroup = async () => {
          await groupApi
            .moveFromWaitingListToExistGroup(trainee.memberInfo.username, targetGroupId)
            .then(() => {
              toastMessage('success', 'Add Student Successfully!')
              loadGroup({ filterMilestone: filter.milstone.milestoneId })
            })
            .catch((error) => {
              console.log(error)
              toastMessage('error', 'Something went wrong, please try again')
            })
        }

        if (targetGroupId === null) {
          toastMessage('error', 'You must select group')
          return
        }

        await modalConfirm(
          trainee.groupId === undefined ? handleFromWaitingListMoveToExistGroup : handleFromGroupMoveToExistGroup,
          `Are you sure want to add?`,
        )
      },
      onCancel() {},
      width: '600px',
      content: (
        <>
          <Typography className="mt-1 mb-3">{`Select group you want <${trainee.memberInfo.username}> (${trainee.memberInfo.fullName}) coming `}</Typography>
          <Select
            defaultValue="Select Group"
            style={{
              width: 400,
            }}
            onChange={(e) => (targetGroupId = e)}
          >
            {listGroup
              .filter((key) => key.editable === true)
              .map((item, index) => {
                return (
                  <Select.Option key={index} value={item.groupId}>
                    {`<${item.groupCode}> (${item.topicName})`}
                  </Select.Option>
                )
              })}
          </Select>
        </>
      ),
    })
  }

  const modalMoveToNew = (trainee) => {
    Modal.confirm({
      title: `Move student to new group`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        const params = {
          groupCode: groupNameRef.current.input.value.trim(),
          topicName: topicNameRef.current.input.value.trim(),
          description: '',
        }

        const handleCreateAndMove = async () => {
          await groupApi
            .createGroup(trainee.memberInfo.username, filter.milstone.milestoneId, params)
            .then((response) => {
              console.log(response)
              loadGroup({ filterMilestone: filter.milstone.milestoneId })
              toastMessage('success', 'Add Student Successfully!')
            })
            .catch((error) => {
              console.log(error)
              toastMessage('danger', 'Something went wrong, please try again')
            })
        }
        modalConfirm(
          handleCreateAndMove,
          `Are you sure want to create group (${groupNameRef.current.input.value.trim()}) and move <${
            trainee.memberInfo.username
          }> (${trainee.memberInfo.fullName}) ?`,
        )
      },
      onCancel() {},
      width: '600px',
      content: (
        <>
          <Typography className="mt-1 mb-3">{`Create group you want <${trainee.memberInfo.username}> (${trainee.memberInfo.fullName}) coming `}</Typography>
          <Input className="my-1" placeholder="Group Name" ref={groupNameRef} />
          <Input className="my-1" placeholder="Topic Name" ref={topicNameRef} />
        </>
      ),
    })
  }

  const modalAddStudentFromWaitingList = (group) => {
    let userName = ''

    Modal.confirm({
      title: `Add Student From Waiting List`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        const handleAddStudentFromWaitingList = async () => {
          await groupApi
            .addFromWaitingList(userName, group.groupId)
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
              <Select.Option value={item.username}>{`<${item.username}> (${item.fullName})`}</Select.Option>
            ))}
          </Select>
        </>
      ),
    })
  }

  // const modalChangeActiveStudent = (trainee, listMember) => {
  //   Modal.confirm({
  //     title: `Are you sure want to ${trainee.status === 'Active' ? 'Reactive' : 'Deactive'} <${
  //       trainee.memberInfo.username
  //     }> (${trainee.memberInfo.fullName}) ?`,
  //     okText: 'Confirm',
  //     cancelText: 'Cancel',
  //     okType: 'danger',
  //     async onOk() {
  //       await groupApi
  //         .changeActiveStudent(trainee.memberInfo.username, trainee.groupId)
  //         .then((response) => {
  //           toastMessage('success', 'Change Status Student Successfully!')
  //           loadGroup({ filterMilestone: filter.milstone.milestoneId })
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           toastMessage('error', 'Something went wrong, please try again')
  //         })
  //     },
  //     onCancel() {},
  //   })
  // }

  // const modalChangeActiveGroup = (group) => {
  //   Modal.confirm({
  //     title: `Are you sure want to ${group.status === 'Active' ? 'Deactive' : 'Reactive'} <${group.groupCode}> (${
  //       group.topicName
  //     }) ?`,
  //     okText: 'Confirm',
  //     cancelText: 'Cancel',
  //     okType: 'danger',
  //     async onOk() {
  //       await groupApi
  //         .changeActiveGroup(group.groupId)
  //         .then(() => {
  //           toastMessage('success', 'Change Status Group Successfully!')
  //           loadGroup({ filterMilestone: filter.milstone.milestoneId })
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           toastMessage('error', 'Something went wrong, please try again')
  //         })
  //     },
  //     onCancel() {},
  //   })
  // }

  const modalDetachGroup = (group) => {
    Modal.confirm({
      title: `Detach Group`,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        groupApi
          .detachGroup(group.groupId, filter.milstone.milestoneId)
          .then(() => {
            toastMessage('success', 'Detach Group Successfully!')
            loadGroup({ filterMilestone: filter.milstone.milestoneId })
          })
          .catch((error) => {
            console.log(error)
            toastMessage('error', 'Something went wrong, please try again')
          })
      },
      onCancel() {},
      content: (
        <Typography className="mt-1 mb-3">{`All student of this group will be moved to Waiting List. Are you sure want to detach group <${group.groupCode}> ? `}</Typography>
      ),
    })
  }

  const menuStudent = (trainee, listMember) =>
    trainee.editable === true ? (
      <Menu
        items={[
          trainee.groupId && {
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
            label: 'Move to existing group',

            onClick: () => {
              modalMoveToExist(trainee)
            },
          },
          {
            key: '3',
            label: 'Move to new group',
            onClick: () => {
              modalMoveToNew(trainee)
            },
          },
          trainee.groupId && {
            type: 'divider',
          },
          trainee.groupId && {
            key: '5',
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
    ) : (
      <Menu items={[{ label: 'This group is uneditable' }]} />
    )

  const menuGroup = (group) => (
    <Menu
      items={[
        isTrainer &&
          isOpen &&
          group.editable && {
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
            navigateTo(`/group-detail/${group.groupId}`)
          },
        },
        isTrainer && isOpen && group.editable && { type: 'divider' },
        isTrainer &&
          isOpen &&
          group.editable && {
            key: Math.random(),
            label: 'Remove',
            onClick: () => {
              modalDetachGroup(group)
            },
          },
      ]}
    />
  )

  const expandedRowRender = (group) => {
    const listMember = group?.groupMembers?.map((item, index) => ({
      ...item,
      key: index + 1,
      editable: group.editable,
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
                    className="p-0 m-0 d-flex align-items-center"
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
            children: trainee.groupId && (
              <Tag color={trainee?.isActive ? 'green' : 'red'} key={trainee?.isActive}>
                {trainee.isActive ? 'Active' : 'Inactive'}
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
          isTrainer &&
          isOpen &&
          isTeamwork && (
            <Space>
              <Dropdown overlay={menuStudent(trainee, listMember)} placement="left" trigger={['hover']}>
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
      render: (_, { status }) => {},
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      width: '7%',
      render: (_, group) =>
        group.groupCode !== 'Waiting List' && (
          <Space>
            <Dropdown overlay={menuGroup(group)} placement="left" trigger={['hover']}>
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
              <div className="col-lg-12 m-b15">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Group List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <CDropdown className="mr-4">
                      <CDropdownToggle color="secondary">{filter.milstone.title}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter.milstoneFilter.length === 0 && <CDropdownItem>No Milestone here</CDropdownItem>}
                        {listFilter.milstoneFilter.map((milestone) => (
                          <CDropdownItem onClick={() => handleFilterMilestone(milestone)}>
                            {milestone.title}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <CDropdown className="">
                      <CDropdownToggle disabled={filter.milstone.title === 'Select Milestone'} color="secondary">
                        {filter.status.name}
                      </CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter.statusFilter.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </div>
              </div>

              {filter.milstone.title !== 'Select Milestone' &&
                isTrainer &&
                (isOpen ? (
                  !isHaveGroup ? (
                    isTeamwork ? (
                      <div className="col-lg-12">
                        <Typography.Text className="mr-4" type="warning" strong>
                          Trainee have not been grouped
                        </Typography.Text>
                        {isTrainer && (
                          <Button type="link " onClick={() => navigateTo(`/new-group/${filter.milstone.milestoneId}`)}>
                            <Typography.Link strong underline>
                              Create Groups
                            </Typography.Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="col-lg-12">
                        <Typography.Text className="mr-4" type="warning" strong>
                          This milestone is working individually, you can't create group for this milestone
                        </Typography.Text>
                      </div>
                    )
                  ) : (
                    <div className="col-lg-12">
                      <Typography.Text className="mr-4" type="warning" strong>
                        This milestone has groups already
                      </Typography.Text>
                      {isTrainer && (
                        <>
                          <Button type="link " onClick={() => navigateTo(`/new-group/${filter.milstone.milestoneId}`)}>
                            <Typography.Link strong underline>
                              Reset Groups
                            </Typography.Link>
                          </Button>
                          <Button type="link " onClick={handleRemoveGroups}>
                            <Typography.Link strong underline>
                              Remove Groups
                            </Typography.Link>
                          </Button>
                        </>
                      )}
                    </div>
                  )
                ) : (
                  <div className="col-lg-12 mt-1 mb-1">
                    <Typography.Text className="mr-4" type="warning" strong>
                      This milestone already In_Progress or Close, you can't reconfigurate group this milestone
                    </Typography.Text>
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
                    expandIcon={({ expanded, onExpand, record }) =>
                      expanded ? (
                        <DownOutlined className="d-flex align-items-center" onClick={(e) => onExpand(record, e)} />
                      ) : (
                        <RightOutlined className="d-flex align-items-center" onClick={(e) => onExpand(record, e)} />
                      )
                    }
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
