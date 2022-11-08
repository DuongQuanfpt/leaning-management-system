import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Breadcrumb,
  Button,
  Cascader,
  Col,
  DatePicker,
  Divider,
  Layout,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import { CButton, CDropdown, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import issueApi from '~/api/issueApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import moment from 'moment'

const IssueList = () => {
  let ITEM_PER_PAGE = 10
  const { roles, currentClass } = useSelector((state) => state.profile)

  const navigateTo = useNavigate()

  const [listIssue, setListIssue] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({})

  const [filter, setFilter] = useState(null)

  const [isEditMode, setIsEditMode] = useState(false)

  const [selectedRows, setSelectedRow] = useState([])

  useEffect(() => {
    setSelectedRow([])
    setFilter(null)
    issueApi
      .getListFilter(currentClass)
      .then((response) => {
        console.log(response)
        setListFilter({
          ...response,
          asigneeFilter: ['None', ...response.asigneeFilter],
          groupFilter: [{ groupId: -1, groupName: 'None' }, ...response.groupFilter],
          requirement: [{ id: null, title: 'General Requirement' }, ...response.requirement],
          typeFilter: [{ title: 'None', id: -1 }, ...response.typeFilter],
          statusFilter: [{ title: 'Open', id: 1 }, { title: 'Close', id: 0 }, ...response.statusFilter],
        })
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    if (filter !== null) {
      loadData(1, filter)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, ITEM_PER_PAGE])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      isIssue: true,
      milestoneId: filter?.milestoneId,
      // filter: btoa(JSON.stringify({ filter: {} })),
    }
    if (q !== '') {
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
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleReload = () => {
    setSearch('')
    setFilter({})
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
    {
      label: 'Requirement',
      value: 'requirement',
      children: listFilter?.requirement?.map((requirement) => ({
        label: requirement.title,
        value: requirement.id,
      })),
    },
    {
      label: 'Group',
      value: 'group',
      children: listFilter?.groupFilter?.map((group) => ({
        label: group.groupName,
        value: group.groupId,
      })),
    },
    {
      label: 'Type',
      value: 'type',
      children: listFilter?.typeFilter?.map((type) => ({
        label: type.title,
        value: type.id,
      })),
    },
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
          <Col className="gutter-row" span={22}>
            <Cascader
              className="w-100"
              options={options}
              onChange={onChange}
              expandTrigger="hover"
              maxTagCount="responsive"
              multiple
              displayRender={displayRenderCascader}
            />
          </Col>
          <Col className="gutter-row" span={2}>
            <Button type="primary" shape="square" icon={<SearchOutlined />} />
          </Col>
        </Row>
      ),
      align: 'start',
      render: (_, issue) => (
        <Space className="d-flex flex-column">
          <Space className="d-flex flex-row">
            <Link to={`/issue-detail/${issue.issueId}`}>
              <Typography.Text className="hover-text-decoration" strong>
                {issue.title}
              </Typography.Text>
            </Link>
          </Space>
          <Space className="d-inline-block">
            <Typography.Text>
              <Typography.Text type="secondary">{`Requirement: `}</Typography.Text>
              <Typography.Text>
                {issue.requirement === null ? 'General Requirement' : issue.requirement}
              </Typography.Text>
            </Typography.Text>
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
              {issue.type !== null ? (
                <Tag className="mr-0 ml-2" color="volcano">
                  {issue.type}
                </Tag>
              ) : (
                <Tag className="mr-0 ml-2" color="blue">
                  {`Requirement`}
                </Tag>
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
      title: () => (
        <Space>
          <Button type="secondary" shape="square" onClick={() => navigateTo('/issue-add')} title={'Issue'}>
            New Issue
          </Button>

          <Button type="primary" shape="square" disabled={isEditMode} onClick={() => setIsEditMode(true)}>
            Edit Issues
          </Button>
        </Space>
      ),
      render: (_, issue) => (
        <Space className="d-flex flex-column">
          <Space className="d-flex flex-row">
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
            {issue.asignee !== null ? (
              <Typography.Text>{issue?.asignee?.fullName}</Typography.Text>
            ) : (
              <Typography.Text style={{ visibility: 'hidden' }}>{issue?.asignee?.fullName}</Typography.Text>
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

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

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
                          <Breadcrumb.Item>Issue List</Breadcrumb.Item>
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
                        rowSelection={
                          isEditMode && {
                            type: 'checbox',
                            onChange: (selectedRowKeys, selectedRows) => {
                              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                              setSelectedRow(selectedRows)
                            },
                            getCheckboxProps: (record) => ({
                              disabled: record.type === null,
                              name: record.issueId,
                            }),
                          }
                        }
                      />
                    )}
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
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
                  onClick={() => console.log('handle edit bath here')}
                >
                  Update All
                </Button>
                <Button className="float-right" onClick={() => setIsEditMode(false)}>
                  Cancel
                </Button>
              </Space>
              <Divider />
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Milestone</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Group</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Assignee</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Requirement</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Type</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
                ></Select>
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Deadline</Typography.Text>
                <DatePicker
                  placement="topRight"
                  className="w-100"
                  format={'YYYY-MM-DD'}
                  disabledDate={(current) => {
                    let customDate = moment().format('YYYY-MM-DD')
                    return current && current < moment(customDate, 'YYYY-MM-DD')
                  }}
                />
              </Space>
              <Space className="w-100 d-flex flex-column mt-2">
                <Typography.Text>Status</Typography.Text>
                <Select
                  className="w-100"
                  options={[
                    {
                      value: 'jack',
                      label: 'Jack',
                    },
                    {
                      value: 'lucy',
                      label: 'Lucy',
                    },
                    {
                      value: 'Yiminghe',
                      label: 'yiminghe',
                    },
                  ]}
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

export default IssueList
