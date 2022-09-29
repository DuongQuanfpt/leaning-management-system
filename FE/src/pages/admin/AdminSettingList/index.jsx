import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilReload, cilSearch } from '@coreui/icons'

const AdminSettingList = () => {
  const ITEM_PER_PAGE = 3

  const currentAccessToken = useSelector((state) => state.auth.token)

  const navigateTo = useNavigate()

  const [listSettingFetched, setListSettingFetched] = useState([])
  const [listSettingDisplay, setListSettingDisplay] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [listStatus, setListStatus] = useState([])
  const [listType, setListType] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = axios
        .get(`https://lms-app-1.herokuapp.com/admin/setting?limit=${ITEM_PER_PAGE}`, {
          headers: { Authorization: `Bearer ${currentAccessToken}` },
        })
        .then((response) => {
          setListSettingFetched(response.data.listResult)
          setListSettingDisplay(response.data.listResult)
          setTotalPages(response.data.totalPage)
        })
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const response = axios
      .get('https://lms-app-1.herokuapp.com/admin/setting-filter', {
        headers: { Authorization: `Bearer ${currentAccessToken}` },
      })
      .then((response) => {
        setListStatus(response.data.statusFilter)
        setListType(response.data.typeFilter)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columnHead = ['ID', 'Type', 'Title', 'Value', 'Display Order', 'Status', 'Actions']

  const handleSearch = () => {
    if (search === '') {
      setSearch('')
      setListSettingDisplay(listSettingFetched)
      return
    }
    setListSettingDisplay(() => listSettingFetched.filter((setting) => setting.settingTitle.includes(search)))
  }

  const handleFilterStatus = (item) => {
    setListSettingDisplay(() => listSettingFetched.filter((setting) => setting.status === item))
  }

  const handleFilterType = (item) => {
    setListSettingDisplay(() => listSettingFetched.filter((setting) => setting.typeName === item))
  }

  const handleReload = () => {
    setListSettingDisplay(listSettingFetched)
    setSearch('')
  }

  const handlePageChange = ({ selected }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = axios
        .get(`https://lms-app-1.herokuapp.com/admin/setting?limit=${ITEM_PER_PAGE}&page=${selected + 1}`, {
          headers: { Authorization: `Bearer ${currentAccessToken}` },
        })
        .then((response) => {
          setListSettingDisplay(response.data.listResult)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleActive = async ({ settingId }) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios
        .put(`https://lms-app-1.herokuapp.com/admin/setting/status/${settingId}`, {
          headers: { Authorization: `Bearer ${currentAccessToken}` },
        })
        .then((response) => console.log(response))
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = (item) => {
    navigateTo(`/setting-detail/${item.settingId}`)
  }

  const handleSortColumn = (column) => {
    console.log(column)
  }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-8 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  value={search}
                  placeholder="Searching by title...."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 w-80">
                <div className="d-flex justify-content-evenly">
                  <h6 className="d-flex flex-column-reverse">Filter By: </h6>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Type</CDropdownToggle>
                    <CDropdownMenu>
                      {listType.map((item) => (
                        <CDropdownItem onClick={() => handleFilterType(item.title)}>{item.title}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select status</CDropdownToggle>
                    <CDropdownMenu>
                      {listStatus.map((item) => (
                        <CDropdownItem onClick={() => handleFilterStatus(item)}>{item}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CButton color="success" type="submit" className="text-light" onClick={handleReload}>
                    <CIcon icon={cilReload} />
                  </CButton>
                </div>
              </div>
            </div>
          </div>
          <CTable hover>
            <CTableHead>
              <CTableRow color="info">
                {columnHead.map((column) => (
                  <CTableHeaderCell scope="col" onClick={() => handleSortColumn(column)}>
                    <div className="d-flex justify-content-evenly">{column}</div>
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listSettingDisplay.map((item) => {
                return (
                  <CTableRow color="info">
                    <CTableHeaderCell scope="row">
                      <div className="d-flex justify-content-evenly">{item.settingId}</div>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.typeName}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.settingTitle}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.settingValue}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.displayOrder}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">
                        <CBadge color={item.status === 'ACTIVE' ? 'success' : 'danger'}>{item.status}</CBadge>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">
                        {item.status === 'ACTIVE' ? (
                          <CButton
                            color="danger"
                            type="submit"
                            className="text-light"
                            onClick={() => handleActive(item)}
                          >
                            Deactive
                          </CButton>
                        ) : (
                          <CButton
                            color="success"
                            type="submit"
                            className="text-light"
                            onClick={() => handleActive(item)}
                          >
                            Reactive
                          </CButton>
                        )}
                        <CButton color="warning" type="reset" onClick={() => handleView(item)}>
                          View
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <ReactPaginate
            breakLabel="..."
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            containerClassName="r-pagination"
            pageLinkClassName="r-p-btn"
            previousLinkClassName="r-p-btn"
            nextLinkClassName="r-p-btn"
            disabledLinkClassName="r-p-disabled"
            activeLinkClassName="r-p-active"
          />
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminSettingList
