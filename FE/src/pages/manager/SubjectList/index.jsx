import React, { useState, useEffect } from 'react'
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

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectList = () => {
  const [listSubjectFetched, setListSubjectFetched] = useState([])
  const [listSubjectDisplay, setListSubjectDisplay] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [listManager, setListManager] = useState([])
  const [listExpert, setListExpert] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [search, setSearch] = useState('')

  const columnHead = ['ID', 'Code', 'Name', 'Manager', 'Expert', 'Status', 'Actions']
  const columnSort = ['ID', 'Code', 'Name', 'Manager', 'Expert', 'Status']

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {}
  const handleSearch = () => {}
  const handleSortColumn = () => {}
  const handleFilterManager = () => {}
  const handleFilterExpert = () => {}
  const handleFilterStatus = () => {}
  const handleReload = () => {}

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-4 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  value={search}
                  placeholder="Searching by Code or Name...."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-2 w-80">
                <div className="d-flex justify-content-evenly">
                  <h6 className="d-flex flex-column-reverse">Sort By: </h6>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Column</CDropdownToggle>
                    <CDropdownMenu>
                      {columnSort.map((item) => (
                        <CDropdownItem onClick={() => handleSortColumn(item)}>{item}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
              <div className="col-6 w-80">
                <div className="d-flex justify-content-evenly">
                  <h6 className="d-flex flex-column-reverse">Filter By: </h6>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Manager</CDropdownToggle>
                    <CDropdownMenu>
                      {listManager.map((item) => (
                        <CDropdownItem onClick={() => handleFilterManager(item.title)}>{item.title}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Expert</CDropdownToggle>
                    <CDropdownMenu>
                      {listExpert.map((item) => (
                        <CDropdownItem onClick={() => handleFilterExpert(item)}>{item}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select Status</CDropdownToggle>
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
                  <CTableHeaderCell scope="col">
                    <div className="d-flex justify-content-evenly">{column}</div>
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listSubjectDisplay.length === 0 ? (
                <CTableRow color="info">
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell>No data found</CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                  <CTableDataCell></CTableDataCell>
                </CTableRow>
              ) : (
                listSubjectDisplay.map((item) => {
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
                      <CTableDataCell></CTableDataCell>
                    </CTableRow>
                  )
                })
              )}
            </CTableBody>
          </CTable>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubjectList
