import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

import { Table, Button, Space, Tag, Breadcrumb, Tooltip, Modal, Pagination, Input } from 'antd'
import { ExclamationCircleOutlined, CloseOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassList = () => {
  let ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()
  const { roles, currentClass } = useSelector((state) => state.profile)

  const [listClass, setListClass] = useState([])

  const [listTrainer, setListTrainer] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [listSubject, setListSubject] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [trainer, setTrainer] = useState('All Trainers')
  const [subject, setSubject] = useState('All Subjects')
  const [status, setStatus] = useState('All Statuses')
  const [filter, setFilter] = useState({
    filterTerm: '',
    filterBranch: '',
    filterTrainer: '',
    filterSupporter: '',
    filterStatus: '',
    filterSubject: '',
  })
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState({
    isManager: false,
    isSupporter: false,
    isTrainer: false,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    classListApi.getFilter().then((response) => {
      console.log(response)
      setListTrainer(response.trainerFilter)
      setListStatus(response.statusFilter)
      setListSubject(response.subjectFilter)
    })

    if (roles.includes('manager')) {
      setRole((prev) => ({ ...prev, isManager: true }))
      return
    }
    if (roles.includes('supporter')) {
      setRole((prev) => ({ ...prev, isSupporter: true }))
      return
    }
    if (roles.includes('trainer')) {
      setRole((prev) => ({ ...prev, isTrainer: true }))
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])
  useEffect(() => {
    document.title = 'LMS - Class List'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      filterClass: currentClass,
    }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.filterTrainer !== '' && filter.filterTrainer !== 'All Trainers') {
      params.filterTrainer = filter.filterTrainer
    }
    if (filter.filterStatus !== '' && filter.filterStatus !== 'All Statuses') {
      params.filterStatus = filter.filterStatus
    }
    if (filter.filterSubject !== '' && filter.filterSubject !== 'All Subjects') {
      params.filterSubject = filter.filterSubject
    }
    setLoading(true)
    await classListApi
      .getPage(params)
      .then((response) => {
        setCurrentPage(page)
        setTotalItem(response.totalItem)
        setListClass(response.listResult)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleActive = async (id) => {
    setLoading(true)
    await classListApi
      .changeActive(id)
      .then((response) => {
        loadData(currentPage, filter)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleFilterTrainer = (trainer) => {
    setFilter({ ...filter, filterTrainer: trainer })
    setTrainer(trainer)
  }

  const handleFilterStatus = (status) => {
    setFilter({ ...filter, filterStatus: status.value })
    setStatus(status.name)
  }

  const handleFilterSubject = (status) => {
    setFilter({ ...filter, filterSubject: status })
    setSubject(status)
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleAdd = () => {
    navigateTo('/class-add')
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const modalConfirm = (subject) => {
    Modal.confirm({
      title: `Are you want to ${subject.classId === 'Active' ? 'deactivate' : 'reactivate'} "${subject.code}"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(subject.classId)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'Class',
      dataIndex: 'code',
      width: '10%',
      sorter: (a, b) => a.code.toString().localeCompare(b.code.toString(), 'en', { sensitivity: 'base' }),
    },
    {
      title: 'Subject',
      dataIndex: 'subjectCode',
      sorter: (a, b) => a.subjectCode.toString().localeCompare(b.subjectCode.toString(), 'en', { sensitivity: 'base' }),
      width: '25%',
    },
    {
      title: 'Term',
      dataIndex: 'term',
      sorter: (a, b) => a.term.toString().localeCompare(b.term.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
      render: (_, { term }) => term?.title,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: (a, b) => a.branch.toString().localeCompare(b.branch.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',

      render: (_, { branch }) => branch?.title,
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      sorter: (a, b) => a.trainer.toString().localeCompare(b.trainer.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Supporter',
      dataIndex: 'supporter',
      sorter: (a, b) => a.supporter.toString().localeCompare(b.supporter.toString(), 'en', { sensitivity: 'base' }),
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '7.5%',
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
      width: '7.5%',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          {!role.isTrainer && (
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
          )}
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/class-detail/${subject?.classId}`)
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
        <div className="body flex-grow-1 px-3 m-b30">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Class List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-4 d-flex w-80">
                <Input.Search
                  placeholder="Searching by Code or Subject...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  size="large"
                  onSearch={handleSearch}
                />
              </div>
              <div className="col-6 d-flex justify-content-end" style={{ gap: '10px' }}>
                <CDropdown className="">
                  <CDropdownToggle color="secondary">{subject}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterSubject('All Subjects')}>{'All Subjects'}</CDropdownItem>
                    {listSubject.map((subject) => (
                      <CDropdownItem onClick={() => handleFilterSubject(subject)}>{subject}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                {role.isTrainer ? null : (
                  <CDropdown className="">
                    <CDropdownToggle color="secondary">{trainer}</CDropdownToggle>
                    <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                      <CDropdownItem onClick={() => handleFilterTrainer('All Trainers')}>
                        {'All Trainers'}
                      </CDropdownItem>
                      {listTrainer.map((trainer) => (
                        <CDropdownItem onClick={() => handleFilterTrainer(trainer)}>{trainer}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                )}
                <CDropdown className="">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    <CDropdownItem onClick={() => handleFilterStatus({ name: 'All Statuses', value: undefined })}>
                      {'All Statuses'}
                    </CDropdownItem>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>

                {role.isManager && (
                  <Tooltip title="Add New Class" placement="top">
                    <CButton color="danger" type="submit" className="text-light" onClick={handleAdd}>
                      <CIcon icon={cilPlus} />
                    </CButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listClass} columns={columns} pagination={false} loading={loading} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end mt-3">
            <Pagination
              current={currentPage}
              total={totalItem}
              onChange={handleChangePage}
              showSizeChanger
              onShowSizeChange={(current, pageSize) => {
                ITEM_PER_PAGE = pageSize
              }}
            />
            ;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassList
