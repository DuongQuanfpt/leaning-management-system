import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Breadcrumb, Pagination, Table, Tooltip } from 'antd'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilSearch, cilSync } from '@coreui/icons'

import classSettingListApi from '~/api/classSettingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const ClassSettingList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

  const [listClassSetting, setListClassSetting] = useState([])
  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    classFilter: [],
    typeFilter: [],
    statusFilter: [],
  })
  const [filter, setFilter] = useState({
    classes: 'Select Class',
    type: {
      title: 'Select Type',
      value: '',
    },
    status: {
      name: 'Select Status',
      value: '',
    },
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await classSettingListApi
      .getPage({ item: ITEM_PER_PAGE, page: 1 })
      .then((response) => {
        console.log(response)
        setListClassSetting(response.listResult)
        setListFilter((prev) => ({
          ...prev,
          classFilter: response.classFilter,
          typeFilter: response.typeFilter,
          statusFilter: response.statusFilter,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterClasses = (classes) => {
    setFilter((prev) => ({ ...prev, classes: classes }))
  }

  const handleFilterType = (type) => {
    setFilter((prev) => ({ ...prev, type: type }))
  }

  const handleFilterStatus = (status) => {
    setFilter((prev) => ({ ...prev, status: status }))
  }

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber)
    loadData(pageNumber, filter)
  }

  const handleReload = () => {
    setSearch('')
    setFilter({
      subject: 'Select Subject',
      type: {
        title: 'Select Type',
        value: '',
      },
      status: {
        name: 'Select Status',
        value: '',
      },
    })
  }

  const handleAdd = () => {
    navigateTo('/class-setting-add')
  }

  const columns = []

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="col-lg-12 m-b30">
          <div className="row">
            <div className="col-lg-12 m-b30">
              <div className="row">
                <div className="col-2 d-flex align-items-center">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Class Setting List</Breadcrumb.Item>
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
                    <CDropdownToggle color="secondary">{filter.classes}</CDropdownToggle>
                    <CDropdownMenu>
                      {listFilter.classFilter.map((classes) => (
                        <CDropdownItem onClick={() => handleFilterClasses(classes)}>{classes}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown className="ml-4">
                    <CDropdownToggle color="secondary">{filter.type.title}</CDropdownToggle>
                    <CDropdownMenu>
                      {listFilter.typeFilter.map((type) => (
                        <CDropdownItem onClick={() => handleFilterType(type)}>{type.title}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown className="ml-4">
                    <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                    <CDropdownMenu>
                      {listFilter.statusFilter.map((status) => (
                        <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <Tooltip title="Reload" placement="top">
                    <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                      <CIcon icon={cilSync} />
                    </CButton>
                  </Tooltip>
                  <Tooltip title="Add New Subject Setting" placement="right">
                    <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                      <CIcon icon={cilPlus} />
                    </CButton>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <Table bordered dataSource={listClassSetting} columns={columns} pagination={false} />
            </div>
            <div className="col-lg-12 d-flex justify-content-end">
              <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  )
}

export default ClassSettingList
