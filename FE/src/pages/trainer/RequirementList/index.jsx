import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Breadcrumb,
  Button,
  Cascader,
  Col,
  Divider,
  Input,
  Layout,
  message,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { CalendarOutlined, ClockCircleOutlined, SearchOutlined } from '@ant-design/icons'

import issueApi from '~/api/issueApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import moment from 'moment'

const RequirementList = () => {
  let ITEM_PER_PAGE = 10
  const { roles, currentClass, ofGroup } = useSelector((state) => state.profile)

  const navigateTo = useNavigate()

  const [listIssue, setListIssue] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({})

  const [filter, setFilter] = useState(null)

  const [baseFilter, setBaseFilter] = useState({
    groupIds: [],
    statusIds: [],
    typeIds: [],
    assigneeNames: [],
    requirementIds: [],
  })

  const [isEditMode, setIsEditMode] = useState(false)

  const [selectedRows, setSelectedRow] = useState([])

  const [baseEditBatch, setBaseEditBatch] = useState({})
  const [isTrainer, setIsTrainer] = useState(false)

  const [listGroupLeader, setListGroupLeader] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const baseListGroupLeader = []
    ofGroup.forEach((group) => {
      if (group.isLeader) {
        baseListGroupLeader.push(group.groupId)
      }
    })
    console.log(baseListGroupLeader)
    setListGroupLeader(baseListGroupLeader)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsEditMode(false)
    setSelectedRow([])
    setFilter(null)
    setBaseFilter({
      groupIds: [],
      statusIds: [],
      typeIds: [],
      assigneeNames: [],
      requirementIds: [],
    })
    setBaseEditBatch([])

    if (roles.includes('trainer')) {
      setIsTrainer(true)
    }
    issueApi
      .getListFilter(currentClass)
      .then((response) => {
        console.log(response)
        setListFilter({
          ...response,
          asigneeFilter: ['None', ...response.asigneeFilter],
          groupFilter: [{ groupId: 0, groupName: 'None' }, ...response.groupFilter],
          requirement: [{ id: 0, title: 'General Requirement' }, ...response.requirement],
          statusFilter: [{ title: 'Open', id: 1 }, ...response.statusFilter, { title: 'Close', id: 0 }],
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    if (filter !== null) {
      setIsEditMode(false)
      setSelectedRow([])
      setBaseEditBatch({
        groupIds: [],
        statusIds: [],
        typeIds: [],
        assigneeNames: [],
        requirementIds: [],
      })

      loadData(1, filter, search)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, ITEM_PER_PAGE])

  useEffect(() => {
    if (filter?.milestoneId) {
      issueApi
        .getListFilter(currentClass, { milestoneId: filter?.milestoneId })
        .then((response) => {
          console.log(response)
          setListFilter({
            ...response,
            asigneeFilter: ['None', ...response.asigneeFilter],
            groupFilter: [{ groupId: 0, groupName: 'None' }, ...response.groupFilter],
            requirement: [{ id: 0, title: 'General Requirement' }, ...response.requirement],
            statusFilter: [{ title: 'Open', id: 1 }, ...response.statusFilter, { title: 'Close', id: 0 }],
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.milestoneId])

  useEffect(() => {
    document.title = 'LMS - Requirement List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    setLoading(true)
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      isIssue: false,
      milestoneId: filter?.milestoneId,
      filter: btoa(JSON.stringify(baseFilter)),
    }
    if (q.trim() !== '') {
      params.q = q.trim()
    }

    await issueApi
      .getIssue(currentClass, params)
      .then((response) => {
        console.log(response)
        setListIssue(response.issueList.map((item, index) => ({ ...item, key: index })))
        setCurrentPage(page)
        setTotalItem(response.totalItem)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const options = [
    {
      label: 'Assignee',
      value: 'assignee',
      children: listFilter?.asigneeFilter?.map((assignee) => ({
        label: assignee,
        value: assignee,
      })),
    },
    // {
    //   label: 'Requirement',
    //   value: 'requirement',
    //   children: listFilter?.requirement?.map((requirement) => ({
    //     label: requirement.title,
    //     value: requirement.id,
    //   })),
    // },
    {
      label: 'Group',
      value: 'group',
      children: listFilter?.groupFilter?.map((group) => ({
        label: group.groupName,
        value: group.groupId,
      })),
    },
    // {
    //   label: 'Type',
    //   value: 'type',
    //   children: listFilter?.typeFilter?.map((type) => ({
    //     label: type.title,
    //     value: type.id,
    //   })),
    // },
    {
      label: 'Status',
      value: 'status',
      children: listFilter?.statusFilter?.map((status) => ({
        label: status.title,
        value: status.id,
      })),
    },
  ]

  const onChange = (value) => {
    console.log(value)
    const removeItemAll = (arr, value) => {
      let i = 0
      while (i < arr.length) {
        if (arr[i] === value) {
          arr.splice(i, 1)
        } else {
          ++i
        }
      }
      return arr
    }

    const arrayFilter = {
      groupIds: [],
      statusIds: [],
      assigneeNames: [],
    }

    try {
      value.forEach((item) => {
        if (item.includes('assignee')) {
          arrayFilter.assigneeNames.push(...item)
        }
        if (item.includes('group')) {
          arrayFilter.groupIds.push(...item)
        }
        if (item.includes('status')) {
          arrayFilter.statusIds.push(...item)
        }
      })
      removeItemAll(arrayFilter.assigneeNames, 'assignee')
      removeItemAll(arrayFilter.groupIds, 'group')
      removeItemAll(arrayFilter.statusIds, 'status')
    } finally {
      console.log(arrayFilter)
      setBaseFilter(arrayFilter)
    }
  }

  const displayRenderCascader = (labels) => {
    if (labels[1] === undefined) {
      labels[1] = 'Any'
    }
    return <span key={Math.random()}>{`${labels[0]} : ${labels[1]}`}</span>
  }

  const columns = [
    {
      width: '75%',
      title: () => (
        <Row gutter={16}>
          <Col className="gutter-row" span={8}>
            <Input
              placeholder="Searching by ID or Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col className="gutter-row" span={14}>
            <Cascader
              className="w-100"
              options={options}
              placeholder="More filter..."
              onChange={onChange}
              expandTrigger="hover"
              maxTagCount="responsive"
              multiple
              displayRender={displayRenderCascader}
              allowClear={false}
            />
          </Col>
          <Col className="gutter-row" span={2}>
            <Button
              type="primary"
              shape="square"
              icon={<SearchOutlined />}
              onClick={() => {
                try {
                  setIsEditMode(false)
                  setSelectedRow([])
                  setBaseEditBatch({
                    groupIds: [],
                    statusIds: [],
                    typeIds: [],
                    assigneeNames: [],
                    requirementIds: [],
                  })
                } finally {
                  loadData(1, filter, search)
                }
              }}
            />
          </Col>
        </Row>
      ),
      align: 'start',
      render: (_, issue) => (
        <Space className="d-flex flex-column">
          <Space className="d-flex flex-row">
            <Link to={`/requirement-detail/${issue.issueId}`}>
              <Typography.Text className="hover-text-decoration" strong>
                {issue.title}
              </Typography.Text>
            </Link>
          </Space>
          <Space className="d-inline-block">
            <Typography.Text>
              <Typography.Text type="secondary">
                {`#${issue.issueId} · Created ${moment(issue.createdDate).fromNow()} by `}
              </Typography.Text>
              <Tooltip
                title={
                  <Space>
                    <Avatar src={issue?.author?.avatar_url} />
                    <Space className="flex-column pl-2">
                      <p
                        className="p-0 m-0 d-flex align-items-center"
                        style={{ fontSize: '14px', lineHeight: '18px', fontWeight: '500' }}
                      >
                        {issue?.author?.fullName}
                      </p>
                      <p className="p-0 m-0" style={{ fontSize: '10px', lineHeight: '18px', fontWeight: '500' }}>
                        {issue?.author?.username}
                      </p>
                    </Space>
                  </Space>
                }
              >
                {issue?.author?.username}
              </Tooltip>

              {issue?.group && (
                <>
                  <Typography.Text type="secondary" className="ml-2">
                    {` Group: `}
                  </Typography.Text>
                  <Typography.Text>{issue?.group.groupCode}</Typography.Text>
                </>
              )}

              {issue.milestone?.title && (
                <Tooltip
                  title={
                    <>
                      <Typography.Text
                        type={
                          moment(issue.milestone?.deadline, 'YYYY-MM-DD') < moment(new Date(), 'YYYY-MM-DD')
                            ? 'danger'
                            : 'warning'
                        }
                      >
                        {`${issue.milestone.deadline} ${
                          moment(issue.milestone?.deadline, 'YYYY-MM-DD') < moment(new Date(), 'YYYY-MM-DD')
                            ? '(Past due)'
                            : '(Up Coming)'
                        }`}
                      </Typography.Text>
                    </>
                  }
                >
                  <Typography.Text className="ml-2 hover-text-decoration">
                    <ClockCircleOutlined className="d-inline-flex" /> {issue.milestone?.title}
                  </Typography.Text>
                </Tooltip>
              )}

              {issue.deadline !== null && (
                <>
                  <Tooltip
                    title={
                      moment(issue.deadline, 'YYYY-MM-DD').add(1, 'days') < moment(new Date(), 'YYYY-MM-DD')
                        ? 'Due Date'
                        : ''
                    }
                  >
                    <Typography.Text
                      className="ml-2"
                      type={
                        moment(issue.deadline, 'YYYY-MM-DD').add(1, 'days') < moment(new Date(), 'YYYY-MM-DD')
                          ? 'danger'
                          : 'primary'
                      }
                    >
                      <CalendarOutlined className="d-inline-flex" /> {issue.deadline}
                    </Typography.Text>
                  </Tooltip>
                </>
              )}

              <Tag className="ml-2" color="green">
                {issue.status}
              </Tag>
            </Typography.Text>
          </Space>
        </Space>
      ),
    },
    {
      width: '25%',
      align: 'end',
      title: () =>
        // eslint-disable-next-line no-mixed-operators
        (listGroupLeader.length !== 0 || roles.includes('trainer')) && (
          <>
            <Space>
              <Button type="secondary" shape="square" onClick={() => navigateTo('/requirement-add')} title={'Issue'}>
                New Requirement
              </Button>

              <Button
                type="primary"
                shape="square"
                disabled={isEditMode}
                onClick={() => {
                  setSelectedRow([])
                  setIsEditMode(true)
                }}
              >
                Edit Requirements
              </Button>
            </Space>
          </>
        ),
      render: (_, issue) => (
        <Space className="d-flex flex-column">
          <Space className="d-flex flex-row ">
            {issue.asignee !== null ? (
              <Tooltip
                className="flex-column"
                placement="left"
                title={
                  <Space className="flex-column ">
                    <p
                      className="p-0 m-0 d-flex justify-content-center"
                      style={{ fontSize: '14px', lineHeight: '13px', fontWeight: '500' }}
                    >
                      Assignee
                    </p>
                    <p
                      className="p-0 m-0 d-flex justify-content-center"
                      style={{ fontSize: '14px', lineHeight: '13px', fontWeight: '300' }}
                    >
                      {issue?.asignee?.fullName}
                    </p>
                    <p
                      className="p-0 m-0 d-flex justify-content-center"
                      style={{ fontSize: '10px', lineHeight: '13px', fontWeight: '250' }}
                    >
                      {issue?.asignee?.username}
                    </p>
                  </Space>
                }
              >
                <Typography.Text style={{ marginRight: '10px' }}>{issue?.asignee?.fullName}</Typography.Text>
                <Avatar style={{ width: '20px', height: '20px' }} src={issue?.asignee?.avatar_url} />
              </Tooltip>
            ) : (
              <Avatar
                style={{ width: '20px', height: '20px', visibility: 'hidden' }}
                src={issue?.asignee?.avatar_url}
              />
            )}
          </Space>

          <Space className="d-flex flex-row">
            <Typography.Text>
              <Typography.Text type="secondary">{`Updated ${moment(issue.modifiedDate).fromNow()}`}</Typography.Text>
              {issue.modifiedBy !== null && (
                <>
                  <Typography.Text type="secondary"> by</Typography.Text>
                  <Tooltip
                    placement="left"
                    title={
                      <Space>
                        <Avatar src={issue?.author?.avatar_url} />
                        <Space className="flex-column pl-2">
                          <p
                            className="p-0 m-0 d-flex align-items-center"
                            style={{ fontSize: '14px', lineHeight: '18px', fontWeight: '500' }}
                          >
                            {issue?.author?.fullName}
                          </p>
                          <p className="p-0 m-0" style={{ fontSize: '10px', lineHeight: '18px', fontWeight: '500' }}>
                            {issue?.author?.username}
                          </p>
                        </Space>
                      </Space>
                    }
                  >
                    <Typography.Text> {issue?.modifiedBy?.username}</Typography.Text>
                  </Tooltip>
                </>
              )}
            </Typography.Text>
          </Space>
        </Space>
      ),
    },
  ]

  // const modalConfirm = (subject) => {
  //   Modal.confirm({
  //     title: `Are you want to ?`,
  //     icon: <ExclamationCircleOutlined />,
  //     okText: 'OK',
  //     cancelText: 'Cancel',
  //     okType: 'danger',
  //     onOk() {},
  //     onCancel() {},
  //   })
  // }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light custom-sticky">
        <AdminHeader />
        <Layout>
          <Layout.Content>
            <div className="body flex-grow-1 px-3">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-lg-12 m-b30">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <Breadcrumb>
                          <Breadcrumb.Item>
                            <Link to="/dashboard">Dashboard</Link>
                          </Breadcrumb.Item>
                          <Breadcrumb.Item>Requirement List</Breadcrumb.Item>
                        </Breadcrumb>
                      </div>
                      <div className="col-4 d-flex w-80"></div>
                      <div className="col-2 d-flex justify-content-end">
                        <Select
                          className="w-100"
                          placeholder="Select Milestone"
                          options={listFilter?.milestoneFilter?.map((milestone) => ({
                            value: milestone.milestoneId,
                            label: milestone.milestoneTitle,
                          }))}
                          value={filter?.milestoneId}
                          onChange={(value) => setFilter((prev) => ({ ...prev, milestoneId: value }))}
                        ></Select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    {filter !== null && (
                      <Table
                        dataSource={listIssue}
                        columns={columns}
                        pagination={false}
                        loading={loading}
                        rowSelection={
                          isEditMode && {
                            type: 'checbox',
                            onChange: (selectedRowKeys, selectedRows) => {
                              const selected = selectedRows.map((row) => row.issueId)
                              setSelectedRow(selected)
                            },
                            getCheckboxProps: (record) => {
                              console.log(record)
                              return {
                                disabled:
                                  record.evaluated === true
                                    ? true
                                    : isTrainer
                                    ? false
                                    : !listGroupLeader.includes(record?.group?.groupId),
                              }
                            },
                          }
                        }
                      />
                    )}
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end mt-3">
                    {filter !== null && (
                      <Pagination
                        current={currentPage}
                        total={totalItem}
                        onChange={handleChangePage}
                        showSizeChanger
                        onShowSizeChange={(current, pageSize) => {
                          ITEM_PER_PAGE = pageSize
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Layout.Content>
          {isEditMode && (
            <Layout.Sider className="body-sider" width={250}>
              <Space className="w-100">
                <Button
                  type="primary"
                  className="float-left"
                  disabled={selectedRows.length === 0}
                  onClick={async () => {
                    if (baseEditBatch.length === 0) {
                      message.error('You must select at lease one properties')
                      return
                    }
                    const params = {
                      issueToUpdate: selectedRows,
                      updateToApply: {},
                    }
                    if (baseEditBatch.milestoneId) {
                      params.updateToApply.milestoneId = baseEditBatch.milestoneId
                    }
                    if (baseEditBatch.groupId !== undefined) {
                      params.updateToApply.groupId = baseEditBatch.groupId
                    }
                    if (baseEditBatch.assignee) {
                      params.updateToApply.asigneeName = baseEditBatch.assignee
                    }
                    if (baseEditBatch.requirement !== undefined) {
                      params.updateToApply.requirementId = baseEditBatch.requirement
                    }
                    if (baseEditBatch.type) {
                      params.updateToApply.typeId = baseEditBatch.type
                    }
                    if (baseEditBatch.deadline !== undefined) {
                      params.updateToApply.deadline = moment(baseEditBatch.deadline).format('YYYY-MM-DD')
                    }
                    if (baseEditBatch.removeDeadline) {
                      params.updateToApply.deadline = 'none'
                    }
                    if (baseEditBatch.status) {
                      params.updateToApply.statusId = baseEditBatch.status
                    }
                    if (baseEditBatch.status === 0) {
                      params.updateToApply.statusId = baseEditBatch.status
                    }

                    await issueApi
                      .changeBatch(params)
                      .then(() => {
                        message.success('Update Successfully')
                        loadData(currentPage, filter)
                        setIsEditMode(false)
                        setSelectedRow([])
                        setBaseEditBatch([])
                      })
                      .catch((error) => {
                        message.error('Update error, please try again')
                        console.log(error)
                      })
                  }}
                >
                  Update All
                </Button>
                <Button
                  className="float-right"
                  onClick={() => {
                    setIsEditMode(false)
                    setBaseEditBatch([])
                  }}
                >
                  Cancel
                </Button>
              </Space>
              <Divider />
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Milestone</Typography.Text>
                <Select
                  className="w-100"
                  options={listFilter.milestoneFilter.map((milestone) => ({
                    value: milestone.milestoneId,
                    label: milestone.milestoneTitle,
                  }))}
                  placeholder="Select Milestone"
                  onChange={(value) => {
                    setBaseEditBatch((prev) => ({
                      milestoneId: value,
                      milestone: listFilter?.milestoneFilter
                        ?.filter((milestone) => milestone.milestoneId === value)
                        ?.shift(),
                    }))
                  }}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Group</Typography.Text>
                <Select
                  className="w-100"
                  disabled={!baseEditBatch.milestoneId}
                  value={baseEditBatch?.groupId}
                  options={baseEditBatch.milestone?.groups?.map((group) => ({
                    value: group.groupId,
                    label: group.groupName,
                  }))}
                  placeholder="Select Group"
                  onChange={(value) =>
                    setBaseEditBatch((prev) => {
                      const gr = prev.milestone.groups.filter((group) => group.groupId === value)?.shift()
                      const a = {
                        ...prev,
                        groupId: value,
                        groups: gr,
                        assignee: null,
                      }
                      return a
                    })
                  }
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Assignee</Typography.Text>
                <Select
                  className="w-100"
                  disabled={!baseEditBatch.groups}
                  value={baseEditBatch?.assignee}
                  placeholder="Select Assignee"
                  onChange={(value) =>
                    setBaseEditBatch((prev) => ({
                      ...prev,
                      assignee: value,
                    }))
                  }
                >
                  <Select.Option value="Unassigned">Unassigned</Select.Option>
                  {baseEditBatch?.groups?.memberId.map((member) => (
                    <Select.Option value={member}>{member}</Select.Option>
                  ))}
                </Select>
              </Space>
              {/* <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Requirement</Typography.Text>
                <Select
                  className="w-100"
                  options={listFilter?.requirement?.map((require) => ({
                    label: require.title,
                    value: require.id,
                  }))}
                  onChange={(value) => setBaseEditBatch((prev) => ({ ...prev, requirement: value }))}
                  allowClear={true}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Type</Typography.Text>
                <Select
                  className="w-100"
                  options={listFilter?.typeFilter?.map((type) => ({
                    label: type.title,
                    value: type.id,
                  }))}
                  onChange={(value) => setBaseEditBatch((prev) => ({ ...prev, type: value }))}
                  allowClear={true}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Deadline</Typography.Text>
                <DatePicker
                  placement="topRight"
                  className="w-100"
                  format={'YYYY-MM-DD'}
                  disabled={baseEditBatch.removeDeadline}
                  disabledDate={(current) => {
                    let customDate = moment().format('YYYY-MM-DD')
                    return current && current < moment(customDate, 'YYYY-MM-DD')
                  }}
                  onChange={(date) => setBaseEditBatch((prev) => ({ ...prev, deadline: date }))}
                  allowClear={true}
                />
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Checkbox
                  disabled={baseEditBatch.deadline}
                  onChange={(e) => setBaseEditBatch((prev) => ({ ...prev, removeDeadline: e.target.checked }))}
                >
                  No Deadline
                </Checkbox>
              </Space> */}

              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Status</Typography.Text>
                <Select
                  className="w-100"
                  options={listFilter?.statusFilter?.map((status) => ({
                    label: status.title,
                    value: status.id,
                  }))}
                  placeholder="Select Status"
                  onChange={(value) => setBaseEditBatch((prev) => ({ ...prev, status: value }))}
                  allowClear={true}
                ></Select>
              </Space>
            </Layout.Sider>
          )}
        </Layout>
        <AdminFooter />
      </div>
    </div>
  )
}

export default RequirementList
