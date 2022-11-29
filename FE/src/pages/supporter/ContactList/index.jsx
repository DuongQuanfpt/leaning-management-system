import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Tag, Pagination } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import webContactApi from '~/api/webContactApi'
import { useSelector } from 'react-redux'

let ITEM_PER_PAGE = 10
const ContactList = () => {
  const navigateTo = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const [listContact, setListContact] = useState([])
  const [listSupporter, setListSupporter] = useState([])
  const [listCategory, setListCategory] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [supporter, setSupporter] = useState('All Supporter')
  const [category, setCategory] = useState('All Category')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterSupporter: '',
    filterCategory: '',
    filterStatus: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    webContactApi
      .getPage({ page: 1 }, token)
      .then((response) => {
        setListSupporter(response.suppFilter)
        setListCategory(response.contactFilter)
        setListStatus(response.statusFilter)
      })
      .catch((error) => console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const loadData = async (page, filter, q = '') => {
    setLoading(true)
    const params = {
      page: page,
      limit: ITEM_PER_PAGE,
    }

    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.filterSupporter !== '') {
      params.filterSupporter = filter.filterSupporter
    }
    if (filter.filterCategory !== '') {
      params.filterCategory = filter.filterCategory
    }
    if (filter.filterStatus !== '') {
      params.filterStatus = filter.filterStatus
    }

    await webContactApi
      .getPage(params, token)
      .then((response) => {
        console.log(response)
        setListContact(response.listResult)
        setTotalItem(response.totalItem)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterSupporter = (supporter) => {
    setFilter({ ...filter, filterSupporter: supporter })
    setSupporter(supporter)
  }
  const handleFilterCategory = (category) => {
    setFilter({ ...filter, filterCategory: category.value })
    setCategory(category.title)
  }
  const handleFilterStatus = (status) => {
    setFilter({ ...filter, filterStatus: status.value })
    setStatus(status.name)
  }
  const handleReload = () => {
    setSearch('')
    setSupporter('All Supporter')
    setCategory('All Category')
    setStatus('All Status')
    setFilter({ q: '', filterType: '', filterStatus: '' })
    ITEM_PER_PAGE = 10
  }
  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter, search)
  }

  const columns = [
    {
      title: 'Category',
      dataIndex: 'categoryName',
      sorter: (a, b) => a.categoryName?.length - b.categoryName?.length,
      width: '15%',
    },

    {
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      width: '20%',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile?.length - b.mobile?.length,
      width: '10%',
    },

    {
      title: 'Supporter',
      dataIndex: 'staffName',
      sorter: (a, b) => a.staffName?.length - b.staffName?.length,
      width: '10%',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',

      render: (_, { status }) => (
        <Tag color={status === 'OPEN' ? 'blue' : 'red'} key={status}>
          {`${status.charAt(0).toUpperCase()}${status.slice(1).toLowerCase()}`}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '5%',

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
        <div className="body flex-grow-1 px-3 m-b30">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Contact List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-5 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by name, email, message and response...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{supporter}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listSupporter.map((supporter) => (
                      <CDropdownItem onClick={() => handleFilterSupporter(supporter)}>{supporter}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{category}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listCategory.map((category) => (
                      <CDropdownItem onClick={() => handleFilterCategory(category)}>{category.title}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                  <CIcon icon={cilSync} />
                </CButton>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listContact} columns={columns} pagination={false} loading={loading} />
          </div>
          <div className="col-lg-12 d-flex justify-content-end mt-3">
            <Pagination
              defaultCurrent={currentPage}
              total={totalItem}
              onChange={handleChangePage}
              showSizeChanger
              onShowSizeChange={(current, pageSize) => {
                ITEM_PER_PAGE = pageSize
              }}
            />
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ContactList
