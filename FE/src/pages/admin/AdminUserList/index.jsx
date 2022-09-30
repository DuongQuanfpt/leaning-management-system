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
} from '@coreui/react'

import { cilReload, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import ReactPaginate from 'react-paginate'
import { useEffect } from 'react'

const AdminUserList = () => {
  const columnHead = ['ID', 'Full name', 'Email', 'Mobile', 'Role', 'Status', 'Actions']

  const handleSearch = () => {}

  const handleReload = () => {}

  const handleSortColumn = () => {}

  const handleActive = () => {}

  const handleView = () => {}

  const handlePageChange = () => {}

  useEffect(() => {}, [])
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
                  value={''}
                  placeholder="Searching by title...."
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
                    <CDropdownMenu></CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select status</CDropdownToggle>
                    <CDropdownMenu></CDropdownMenu>
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
              <CTableRow color="info">
                <CTableHeaderCell scope="row">
                  <div className="d-flex justify-content-evenly">a</div>
                </CTableHeaderCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">b</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">c</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">d</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">e</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">
                    <form action="" method="get"></form>
                  </div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex justify-content-evenly">
                    <CButton color="danger" type="submit" className="text-light">
                      Deactive
                    </CButton>
                    <CButton color="success" type="submit" className="text-light">
                      Reactive
                    </CButton>
                    <CButton color="warning" type="reset">
                      View
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={10}
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
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

export default AdminUserList
