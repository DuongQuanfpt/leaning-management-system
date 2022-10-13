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

  const [listClasses, setListClasses] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [classes, setClasses] = useState('All Class')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterCategory: '',
    filterStatus: '',
  })

  useEffect(() => {}, [])

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

    await traineeListApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListClasses(response.listResult)
        setTotalItem(response.totalItem)
      })
      .catch((error) => console.log(error))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }
  const handleFilterClasses = (classes) => {}
  const handleFilterStatus = () => {}
  const handleReload = () => {}

  const handleExport = () => {
    console.log('export start')
    const ws = utils.json_to_sheet(listClasses)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    writeFileXLSX(wb, 'SheetJSReactAoO.xlsx')
    console.log('export done')
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
  }
  //Class, Full Name, User Name, Email, Status, Dropout Date, Note
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
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
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
      ellipsis: true,
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
                navigateTo(`/contact-detail/${setting?.contactId}`)
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
          <h1>Chưa xong đừng sờ vào</h1>
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
                    {/* {listClasses.map((classes) => (
                      <CDropdownItem onClick={() => handleFilterClasses(classes)}>{classes}</CDropdownItem>
                    ))} */}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu>
                    {/* {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))} */}
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
            <Table bordered dataSource={listClasses} columns={columns} pagination={false} />
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
