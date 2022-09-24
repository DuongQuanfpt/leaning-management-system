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
} from '@coreui/react'

const AdminSettingList = () => {
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <CDropdown>
            <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CTable>
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
              <CTableRow color="info">
                <CTableHeaderCell scope="row">1</CTableHeaderCell>
                <CTableDataCell>Type 1</CTableDataCell>
                <CTableDataCell>Title 1</CTableDataCell>
                <CTableDataCell>Value 1</CTableDataCell>
                <CTableDataCell>Order 1</CTableDataCell>
                <CTableDataCell>Active</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">
                    <CButton color="primary" type="submit">
                      Deactive
                    </CButton>
                    <CButton color="primary" type="reset">
                      Edit
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminSettingList
