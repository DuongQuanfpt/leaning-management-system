import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Avatar,
  Breadcrumb,
  Button,
  Cascader,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

import { CalendarOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import issueApi from '~/api/issueApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import moment from 'moment'

const IssueList = () => {
  const ITEM_PER_PAGE = 10
  const { roles, currentClass } = useSelector((state) => state.profile)

  const navigateTo = useNavigate()

  const [listIssue, setListIssue] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({})

  const [filter, setFilter] = useState({})

  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    issueApi
      .getListFilter(currentClass)
      .then((response) => {
        console.log(response)
        setListFilter(response)
      })
      .catch((error) => {
        console.log(error)
      })
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  const loadData = async (page, filter, q = '') => {
    const params = { limit: ITEM_PER_PAGE, page: page }
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

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  // const handleFilterType = (type) => {
  //   setFilter((prev) => ({ ...prev, type: type }))
  // }

  // const handleFilterStatus = (status) => {
  //   setFilter((prev) => ({ ...prev, status: status }))
  // }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleReload = () => {
    setSearch('')
    setFilter({})
  }

  console.log(listFilter)

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
      label: 'Milestone',
      value: 'milestone',
      children: listFilter?.milestoneFilter?.map((milestone) => ({
        label: milestone.milestoneTitle,
        value: milestone.milestoneId,
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
              <Typography.Text className="hover-text-decoration">{issue.title}</Typography.Text>
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

              {issue.type !== null && (
                <>
                  <Typography.Text type="secondary" className="ml-2">
                    {` Requirement: `}
                  </Typography.Text>
                  <Typography.Text>
                    {issue.requirement === null ? 'General Requirement' : issue.requirement}
                  </Typography.Text>
                </>
              )}

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
          <Button type="primary" shape="square" onClick={() => navigateTo('/requirement-add')}>
            New Requirement
          </Button>
          <Button type="primary" shape="square" onClick={() => navigateTo('/issue-add')}>
            New Issue
          </Button>

          <Button type="secondary" shape="square" onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? 'Cancel' : 'Edit'}
          </Button>
        </Space>
      ),
      render: (_, issue) => (
        <Space className="d-flex flex-column">
          {issue.asignee !== null ? (
            <Space className="d-flex flex-row">
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
            </Space>
          ) : (
            <Space className="d-flex flex-row">
              <Avatar
                style={{ width: '20px', height: '20px', visibility: 'hidden' }}
                src={issue?.asignee?.avatar_url}
              />
            </Space>
          )}
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
                      <Breadcrumb.Item>Issue List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex w-80">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by Class title..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{'filter.type.title'}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}></CDropdownMenu>
                    </CDropdown>
                    <CDropdown className="ml-4">
                      <CDropdownToggle color="secondary">{'filter.status.name'}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}></CDropdownMenu>
                    </CDropdown>
                    <Tooltip title="Reload" placement="top">
                      <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                        <CIcon icon={cilSync} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Add New Class Setting" placement="right">
                      <CButton
                        color="danger"
                        type="submit"
                        className="text-light ml-4"
                        onClick={() => navigateTo('/issue-add')}
                      >
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Edit" placement="right">
                      <CButton
                        color="secondary"
                        type="submit"
                        className="text-light ml-4"
                        onClick={() => setIsEditMode(!isEditMode)}
                      >
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table
                  dataSource={listIssue}
                  columns={columns}
                  pagination={false}
                  rowSelection={
                    isEditMode && {
                      type: 'checbox',
                      onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                      },
                      getCheckboxProps: (record) => ({
                        name: record.issueId,
                      }),
                    }
                  }
                />
              </div>
              <div className="col-lg-12 d-flex justify-content-end">
                <Pagination
                  current={currentPage}
                  total={totalItem}
                  onChange={handleChangePage}
                  showSizeChanger={false}
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

export default IssueList
