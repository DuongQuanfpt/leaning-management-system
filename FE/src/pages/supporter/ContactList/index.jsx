import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Modal, Tag, Pagination } from 'antd'
import { CloseOutlined, CheckOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

import settingListApi from '~/api/settingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import webContactApi from '~/api/webContactApi'

const ContactList = () => {
  const ITEM_PER_PAGE = 10

  const navigateTo = useNavigate()

  const [listContact, setListContact] = useState([])
  const [listSupporter, setListSupporter] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [supporter, setSupporter] = useState('All Supporter')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterType: '',
    filterStatus: '',
  })

  useEffect(() => {
    loadData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async (page) => {
    const params = {
      page: page,
      limit: ITEM_PER_PAGE,
    }

    await webContactApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setListContact(response)
      })
      .catch((error) => console.log(error))
  }

  const handleSearch = () => {}
  const handleFilterSupporter = () => {}
  const handleFilterStatus = () => {}
  const handleReload = () => {}
  const handleChangePage = () => {}
  const handleActive = (contact) => {}

  const modalConfirm = (setting) => {
    Modal.confirm({
      title: `Are you want to ${setting.status === 'Active' ? 'deactivate' : 'reactivate'} contact with ID "${
        setting.contactId
      }"?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleActive(setting)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'contactId',
      width: 80,
    },
    {
      title: 'Supporter',
      dataIndex: 'staffEmail',
      sorter: (a, b) => a.staffEmail?.length - b.staffEmail?.length,
      width: 120,
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      sorter: (a, b) => a.categoryName?.length - b.categoryName?.length,
      ellipsis: true,
    },

    {
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      width: 150,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      sorter: (a, b) => a.mobile?.length - b.mobile?.length,
      width: 150,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      sorter: (a, b) => a.message?.length - b.message?.length,
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Response',
      dataIndex: 'response',
      sorter: (a, b) => a.response?.length - b.response?.length,
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 90,
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : 'red'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 120,
      render: (_, setting) => (
        <Space size="middle">
          <Tooltip title={setting.status === 'Active' ? 'Deactivate' : 'Reactivate'} placement="top">
            <Button
              type={setting.status === 'Active' ? 'danger' : 'primary'}
              shape="circle"
              icon={setting.status === 'Active' ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => {
                modalConfirm(setting)
              }}
            ></Button>
          </Tooltip>
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
              <div className="col-6 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by title...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{supporter}</CDropdownToggle>
                  <CDropdownMenu>
                    {listSupporter.map((supporter) => (
                      <CDropdownItem onClick={() => handleFilterSupporter(supporter)}>{supporter}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status}</CDropdownItem>
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
            <Table bordered dataSource={listContact} columns={columns} pagination={false} />
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

export default ContactList
