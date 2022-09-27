import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
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
  CPagination,
  CPaginationItem,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'

const AdminSettingList = () => {
  const currentAccessToken = useSelector((state) => state.auth.token)

  const [listSettingFetched, setListSettingFetched] = useState([])
  const [listSettingDisplay, setListSettingDisplay] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [listType, setListType] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = axios
        .get('https://lms-app-1.herokuapp.com/admin/setting?limit=10&page=1', {
          headers: { Authorization: `Bearer ${currentAccessToken}` },
        })
        .then((response) => {
          setListSettingFetched(response.data.listResult)
          setListSettingDisplay(response.data.listResult)
        })
    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setListStatus(() => [...new Set(listSettingFetched.map((item) => item.status))])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearch = () => {}

  const handleFilterStatus = (item) => {
    setListSettingDisplay(() => listSettingFetched.filter((setting) => setting.status === item))
    console.log(item)
  }
  console.log(listSettingFetched)

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-8 d-flex">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton type="submit" color="primary" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-evenly">
                  <h6 className="d-flex flex-column-reverse">Filter By: </h6>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Type</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">Action</CDropdownItem>
                      <CDropdownItem href="#">Another action</CDropdownItem>
                      <CDropdownItem href="#">Something else here</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select status</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem onClick={() => setListSettingDisplay(listSettingFetched)}>ALL</CDropdownItem>
                      {listStatus.map((item) => (
                        <CDropdownItem onClick={() => handleFilterStatus(item)}>{item}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
            </div>
          </div>
          <CTable hover>
            <CTableHead>
              <CTableRow color="info">
                <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                <CTableHeaderCell scope="col">Display Order</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <div className="d-flex justify-content-evenly">Actions</div>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listSettingDisplay.map((item) => {
                return (
                  <CTableRow color="info">
                    <CTableHeaderCell scope="row">{item.settingId}</CTableHeaderCell>
                    <CTableDataCell>{item.typeName}</CTableDataCell>
                    <CTableDataCell>{item.settingTitle}</CTableDataCell>
                    <CTableDataCell>{item.settingValue}</CTableDataCell>
                    <CTableDataCell>{item.displayOrder}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={item.status === 'ACTIVE' ? 'success' : 'danger'}>{item.status}</CBadge>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">
                        <CButton color="danger" type="submit" className="text-light">
                          Deactive
                        </CButton>
                        <CButton color="warning" type="reset">
                          Edit
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CPagination align="end">
            <CPaginationItem disabled>Previous</CPaginationItem>
            <CPaginationItem>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem>Next</CPaginationItem>
          </CPagination>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminSettingList
