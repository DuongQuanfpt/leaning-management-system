import React from 'react'
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
} from '@coreui/react'

import { cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AdminUserList = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-8 d-flex">
                <input type="search" id="form1" className="form-control" value="Search" />
                <CButton type="submit" color="primary">
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-evenly">
                  <h5 className="d-flex flex-column-reverse">Filter By: </h5>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Trainer</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">Action</CDropdownItem>
                      <CDropdownItem href="#">Another action</CDropdownItem>
                      <CDropdownItem href="#">Something else here</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Term</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">Action</CDropdownItem>
                      <CDropdownItem href="#">Another action</CDropdownItem>
                      <CDropdownItem href="#">Something else here</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Status</CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem href="#">Action</CDropdownItem>
                      <CDropdownItem href="#">Another action</CDropdownItem>
                      <CDropdownItem href="#">Something else here</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
            </div>
          </div>

          <CTable>
            <CTableHead>
              <CTableRow color="info">
                <CTableHeaderCell scope="col">Id</CTableHeaderCell>
                <CTableHeaderCell scope="col">Package</CTableHeaderCell>
                <CTableHeaderCell scope="col">Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">Term</CTableHeaderCell>
                <CTableHeaderCell scope="col">Trainer</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  <div className="d-flex justify-content-evenly">Actions</div>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow color="info">
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Package 1</CTableDataCell>
                <CTableDataCell>Code 1</CTableDataCell>
                <CTableDataCell>Term 1</CTableDataCell>
                <CTableDataCell>Trainer 1 1</CTableDataCell>
                <CTableDataCell>Active</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">
                    <CButton color="primary" type="submit">
                      Deactive
                    </CButton>
                    <CButton color="primary" type="submit">
                      Edit
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
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

export default AdminUserList
