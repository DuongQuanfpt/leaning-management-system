import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Tag, Breadcrumb, Tooltip, Modal, Pagination } from 'antd'
import { ExclamationCircleOutlined, CloseOutlined, CheckOutlined, EyeOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

  const [listClass, setListClass] = useState([])

  const [listTerm, setListTerm] = useState([])
  const [listBranch, setListBranch] = useState([])
  const [listTrainer, setListTrainer] = useState([])
  const [listSupporter, setListSupporter] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [term, setTerm] = useState('All Term')
  const [branch, setBranch] = useState('All Branch')
  const [trainer, setTrainer] = useState('All Trainer')
  const [supporter, setSupporter] = useState('All Supporter')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterTerm: '',
    filterBranch: '',
    filterTrainer: '',
    filterSupporter: '',
    filterStatus: '',
  })

  useEffect(() => {
    classListApi.getFilter().then((response) => {
      setListTerm(response.terms)
      setListBranch(response.branches)
      setListTrainer(response.trainerFilter)
      setListSupporter(response.supporterFilter)
      setListStatus(response.statusFilter)
    })
  }, [])

  useEffect(() => {
    loadData(1, filter)
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
    }
    if (q !== '') {
      params.q = q
    }
    if (filter.filterTerm !== '') {
      params.filterTerm = filter.filterTerm
    }
    if (filter.filterBranch !== '') {
      params.filterBranch = filter.filterBranch
    }
    if (filter.filterTrainer !== '') {
      params.filterTrainer = filter.filterTrainer
    }
    if (filter.filterSupporter !== '') {
      params.filterSupporter = filter.filterSupporter
    }
    if (filter.filterStatus !== '') {
      params.filterStatus = filter.filterStatus
    }
    await classListApi.getPage(params).then((response) => {
      setTotalItem(response.totalItem)
      setListClass(response.listResult)
    })
  }

  const handleActive = async (id) => {
    await classListApi.changeActive(id).then((response) => {
      loadData()
    })
  }

  const handleFilterTerm = (term) => {
    setFilter({ ...filter, filterTerm: term.value })
    setTerm(term.title)
  }
  const handleFilterBranch = (branch) => {
    setFilter({ ...filter, filterBranch: branch.value })
    setBranch(branch.title)
  }
  const handleFilterTrainer = (trainer) => {
    setFilter({ ...filter, filterTrainer: trainer })
    setTrainer(trainer)
  }
  const handleFilterSupporter = (supporter) => {
    setFilter({ ...filter, filterSupporter: supporter })
    setSupporter(supporter)
  }
  const handleFilterStatus = (status) => {
    setFilter({ ...filter, filterStatus: status.value })
    setTerm(status.name)
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleReload = () => {
    setFilter({
      filterTerm: '',
      filterBranch: '',
      filterTrainer: '',
      filterSupporter: '',
      filterStatus: '',
    })
    setTerm('All Term')
    setBranch('All Branch')
    setTrainer('All Trainer')
    setSupporter('All Supporter')
    setStatus('All Status')
    setSearch('')
  }

  const handleAdd = () => {
    navigateTo('/class-add')
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
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
      title: 'ID',
      dataIndex: 'classId',
      sorter: (a, b) => a.classId - b.classId,
      width: 80,
    },
    {
      title: 'Class',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      sorter: (a, b) => a.subject?.length - b.subject?.length,
      ellipsis: true,
      render: (_, { subject }) => subject.map((item) => <Tag key={item}>{item}</Tag>),
    },
    {
      title: 'Term',
      dataIndex: 'term',
      sorter: (a, b) => a.term - b.term,
      width: 100,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      sorter: (a, b) => a.branch?.length - b.branch?.length,
      width: 100,
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      sorter: (a, b) => a.trainer?.length - b.trainer?.length,
      width: 150,
    },
    {
      title: 'Supporter',
      dataIndex: 'supporter',
      sorter: (a, b) => a.supporter?.length - b.supporter?.length,
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      sorter: (a, b) => a.status?.length - b.status?.length,
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },

    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 120,
      render: (_, subject) => (
        <Space size="middle">
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
        <div className="body flex-grow-1 px-3">
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
              <div className="col-3 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by Code or Subject...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-7 d-flex justify-content-end">
                <CDropdown className="ml-2">
                  <CDropdownToggle color="secondary">{term}</CDropdownToggle>
                  <CDropdownMenu>
                    {listTerm.map((term) => (
                      <CDropdownItem onClick={() => handleFilterTerm(term)}>{term.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-2">
                  <CDropdownToggle color="secondary">{branch}</CDropdownToggle>
                  <CDropdownMenu>
                    {listBranch.map((branch) => (
                      <CDropdownItem onClick={() => handleFilterBranch(branch)}>{branch.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-2">
                  <CDropdownToggle color="secondary">{trainer}</CDropdownToggle>
                  <CDropdownMenu>
                    {listTrainer.map((trainer) => (
                      <CDropdownItem onClick={() => handleFilterTrainer(trainer)}>{trainer}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-2">
                  <CDropdownToggle color="secondary">{supporter}</CDropdownToggle>
                  <CDropdownMenu>
                    {listSupporter.map((supporter) => (
                      <CDropdownItem onClick={() => handleFilterSupporter(supporter)}>{supporter}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-2">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Reload" placement="top">
                  <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                    <CIcon icon={cilSync} />
                  </CButton>
                </Tooltip>
                <Tooltip title="Add New Class" placement="top">
                  <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                    <CIcon icon={cilPlus} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listClass} columns={columns} pagination={false} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end">
            <Pagination defaultCurrent={currentPage} total={totalItem} onChange={handleChangePage} />;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassList
