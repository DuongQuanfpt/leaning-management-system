import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, Input, Modal, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { CheckOutlined, CloseOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import evalCriteriaApi from '~/api/evalCriteriaApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'

const EvalCriteriaList = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

  const [listEval, setListEval] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    assignmentFilter: [],
    statusFilter: [],
  })

  const [filter, setFilter] = useState({
    assignment: 'All Assignments',
    status: {
      name: 'All Statuses',
      value: '',
    },
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    evalCriteriaApi
      .getPage({
        limit: ITEM_PER_PAGE,
        page: 1,
        classCode: currentClass,
      })
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({
          ...prev,
          assignmentFilter: response.assignmentFilter,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [currentClass])

  useEffect(() => {
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])
  useEffect(() => {
    document.title = 'LMS - Eval Criteria List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    setLoading(true)
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      classCode: currentClass,
    }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.assignment !== 'All Assignments') {
      params.filterAssignment = filter.assignment
    }
    if (filter.status.name !== 'All Statuses') {
      params.filterStatus = filter.status.value
    }

    await evalCriteriaApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListEval(response.listResult)
        setCurrentPage(page)
        setTotalItem(response.totalItem)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterAssignment = (assignment) => {
    setFilter((prev) => ({ ...prev, assignment: assignment }))
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: { ...prev.status, name: status.name, value: status.value } }))
  }

  const handleAdd = () => {
    navigateTo('/criteria-add')
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleActive = async (id) => {
    setLoading(true)
    await evalCriteriaApi
      .changeActive(id)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(true))
  }

  const modalConfirm = (subject) => {
    console.log(subject)
    Modal.confirm({
      title: `Are you want to ${subject.status === 'Active' ? 'deactivate' : 'reactivate'} "${
        subject.assignment.title
      }" - "${subject.criteriaName}" ?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject.criteriaId)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subjectName',
      sorter: (a, b) => a.subjectName.localeCompare(b.subjectName, 'en', { sensitivity: 'base' }),

      width: '7.5%',
    },
    {
      title: 'Assignment',
      dataIndex: 'assignment',
      sorter: (a, b) => a.assignment.localeCompare(b.assignment, 'en', { sensitivity: 'base' }),
      width: '25%',
      render: (_, { assignment }) => assignment.title,
    },
    {
      title: 'Eval Criteria Name',
      dataIndex: 'criteriaName',
      sorter: (a, b) => a.criteriaName.localeCompare(b.criteriaName, 'en', { sensitivity: 'base' }),
      width: '20%',
    },
    {
      title: 'Expected Work',
      dataIndex: 'expectedWork',
      sorter: (a, b) =>
        a.expectedWork.toString().localeCompare(b.expectedWork.toString(), 'en', { sensitivity: 'base' }),
      width: '15%',
    },

    {
      title: 'Eval Weight',
      dataIndex: 'evalWeight',
      sorter: (a, b) => a.evalWeight.toString().localeCompare(b.evalWeight.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { evalWeight }) => evalWeight + '%',
    },
    {
      title: 'Team Eval?',
      dataIndex: 'isTeamEval',
      sorter: (a, b) => a.isTeamEval.toString().localeCompare(b.isTeamEval.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isTeamEval }) => (isTeamEval === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Work Eval?',
      dataIndex: 'isWorkEval',
      sorter: (a, b) => a.isWorkEval.toString().localeCompare(b.isWorkEval.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { isWorkEval }) => (isWorkEval === 1 ? 'Yes' : 'No'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      sorter: (a, b) => a.status.toString().localeCompare(b.status.toString(), 'en', { sensitivity: 'base' }),
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '10%',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          <Tooltip title={subject.status === 'Active' ? 'Deactivate' : 'Reactivate'} placement="top">
            <Button
              type={subject.status === 'Active' ? 'danger' : 'primary'}
              shape="circle"
              icon={subject.status === 'Active' ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => {
                modalConfirm(subject)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/criteria-detail/${subject?.criteriaId}`)
              }}
            ></Button>
          </Tooltip>
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
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Eval Criteria List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex w-80">
                    <Input.Search
                      className="w-100"
                      placeholder="Searching by Class code or Title..."
                      size="large"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={handleSearch}
                    />
                  </div>
                  <div className="col-6 d-flex justify-content-end" style={{ gap: '10px' }}>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.assignment}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterAssignment('All Assignments')}>
                          {'All Assignments'}
                        </CDropdownItem>

                        {listFilter?.assignmentFilter?.map((assignment) => (
                          <CDropdownItem onClick={() => handleFilterAssignment(assignment)}>{assignment}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>
                    <CDropdown className="">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                        <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: '' })}>
                          {'All Statuses'}
                        </CDropdownItem>

                        {listFilter?.statusFilter?.map((status) => (
                          <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>

                    <Tooltip title="Add New Eval Criteria" placement="right">
                      <CButton color="danger" type="submit" className="text-light " onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={listEval} columns={columns} pagination={false} loading={loading} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end mt-3">
                <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default EvalCriteriaList
