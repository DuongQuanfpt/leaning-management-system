import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { read, utils, writeFileXLSX } from 'xlsx'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilSync, cilCloudDownload } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Modal, Tag, Pagination } from 'antd'
import { CloseOutlined, CheckOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import traineeListApi from '~/api/traineeListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const TraineeList = () => {
  const ITEM_PER_PAGE = 10

  const navigateTo = useNavigate()

  const [listTrainee, setListTrainee] = useState([])
  const [listClasses, setListClasses] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [classes, setClasses] = useState('All Class')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterClass: '',
    filterStatus: '',
  })

  useEffect(() => {
    traineeListApi
      .getPage(1)
      .then((response) => {
        setListClasses(response.classFilter)
        setListStatus(response.statuFilter)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    loadData(1, filter)
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    const params = {
      page: page,
      limit: ITEM_PER_PAGE,
    }

    if (q !== '') {
      params.q = q
    }
    if (filter.classFilter !== '') {
      params.filterClass = filter.classFilter
    }
    if (filter.statusFilter !== '') {
      params.filterStatus = filter.statusFilter
    }

    await traineeListApi
      .getPage(params)
      .then((response) => {
        setListTrainee(response.listResult)
        setTotalItem(response.totalItem)
      })
      .catch((error) => console.log(error))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }
  const handleFilterClasses = (classes) => {
    setFilter({ ...filter, classFilter: classes })
    setClasses(classes)
  }
  const handleFilterStatus = (status) => {
    setFilter({ ...filter, statusFilter: status.value })
    setStatus(status.name)
  }
  const handleReload = () => {
    setFilter({ classFilter: '', statusFilter: '' })
    setSearch('')
    setClasses('All Class')
    setStatus('All Status')
    loadData(1, filter)
  }

  const handleExport = async () => {
    const params = {}
    if (filter.classFilter !== '') {
      params.filterClass = filter.classFilter
    }
    if (filter.statusFilter !== '') {
      params.filterStatus = filter.statusFilter
    }
    await traineeListApi
      .getAll(params)
      .then((response) => {
        const listExport = response.listResult
        for (let i = 0; i < listExport.length; i++) {
          delete listExport[i].userId
          listExport[i]['Full name'] = listExport[i].fullName
          listExport[i]['User name'] = listExport[i].username
          listExport[i]['Email'] = listExport[i].email
          listExport[i]['Mobile'] = listExport[i].mobile
          listExport[i]['Status'] = listExport[i].status
          listExport[i]['Note'] = listExport[i].note
          listExport[i]['Class'] = listExport[i].classes
          listExport[i]['Dropout Date'] = listExport[i].dropOut
          delete listExport[i].fullName
          delete listExport[i].username
          delete listExport[i].email
          delete listExport[i].mobile
          delete listExport[i].status
          delete listExport[i].note
          delete listExport[i].classes
          delete listExport[i].dropOut
        }
        const ws = utils.json_to_sheet(listExport)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, ws, 'Data')
        writeFileXLSX(wb, 'ListClassInformation.xlsx')
      })
      .catch((error) => modalError(error))
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
  }
  const modalError = (error) => {
    Modal.error({
      title: 'Error',
      content: "Can't export class data to excel, please try again " + error,
    })
  }
  const columns = [
    {
      title: 'Class',
      dataIndex: 'classes',
      width: 80,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username?.length - b.username?.length,
      width: 180,
    },

    {
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
      width: 220,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      width: 220,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      width: 90,
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Dropout Date',
      dataIndex: 'dropOut',
      sorter: (a, b) => a.dropOut?.length - b.dropOut?.length,
      width: 150,
    },
    {
      title: 'Note',
      dataIndex: 'dropOut',
      sorter: (a, b) => a.note?.length - b.note?.length,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 75,
      render: (_, setting) => (
        <Space size="middle">
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/trainee-detail/${setting?.userId}`)
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
                  <Breadcrumb.Item>Trainee List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-6 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by fullname, username and email...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{classes}</CDropdownToggle>
                  <CDropdownMenu>
                    {listClasses.map((classes) => (
                      <CDropdownItem onClick={() => handleFilterClasses(classes)}>{classes}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                  <CIcon icon={cilSync} />
                </CButton>
                <CButton color="warning" type="submit" className="text-light ml-4" onClick={handleExport}>
                  <CIcon icon={cilCloudDownload} />
                </CButton>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listTrainee} columns={columns} pagination={false} />
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

export default TraineeList
