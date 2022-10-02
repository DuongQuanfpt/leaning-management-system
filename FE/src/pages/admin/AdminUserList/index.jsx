import React, { useState, useEffect } from 'react'
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
  CBadge,
  CDropdownItem,
} from '@coreui/react'

import { cilReload, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import userListApi from '~/api/userListApi'
import { useNavigate } from 'react-router-dom'

const AdminUserList = () => {
  const ITEM_PER_PAGE = 7
  const columnHead = ['ID', 'Full name', 'Email', 'Mobile', 'Role', 'Status', 'Actions']

  const navigateTo = useNavigate()

  const [listUserFetched, setListUserFetched] = useState([])
  const [listUserDisplay, setListUserDisplay] = useState([])
  const [listRole, setListRole] = useState([])
  const [listStatus, setListStatus] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const params = { page: 1, limit: ITEM_PER_PAGE }

    userListApi.getFirstPage(params).then((response) => {
      setListUserFetched(response.listResult)
      setListUserDisplay(response.listResult)
      setTotalPages(response.totalPage)
    })

    userListApi.getFilter().then((response) => {
      setListRole(response.roleFilter)
      setListStatus(response.statusFilter)
    })
  }, [])

  const handleSearch = async () => {
    if (search === '') {
      setSearch('')
      setListUserDisplay(listUserFetched)
      return
    }
    const query = search.toLowerCase()
    setListUserDisplay(() =>
      listUserFetched.filter((user) => {
        return (
          user.fullName?.toLowerCase().includes(query) ||
          user.email?.toLowerCase().includes(query) ||
          user.mobile?.toLowerCase().includes(query)
        )
      }),
    )
  }

  const handleReload = () => {
    navigateTo(0)
  }

  const handleFilterStatus = (status) => {
    setListUserDisplay(() => listUserFetched.filter((user) => user.status === status))
  }

  const handleFilterRole = (item) => {
    // setListUserDisplay(() => listUserFetched.filter((user) => user.status === item))
  }

  const handleSortColumn = () => {}

  const handleActive = async ({ userId }) => {
    await userListApi.changeActive(userId).then((response) => {
      navigateTo(0)
    })
  }

  const handleView = ({ userId }) => {
    navigateTo(`/user-detail/${userId}`)
  }

  const handlePageChange = async ({ selected }) => {
    const params = { page: selected + 1, limit: ITEM_PER_PAGE }
    await userListApi.getPage(params).then((response) => {
      setListUserDisplay(response.listResult)
    })
  }

  console.log(listStatus)
  console.log(listRole)

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
                  placeholder="Searching by name, email or mobile...."
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
                    <CDropdownToggle color="secondary">Select role</CDropdownToggle>
                    <CDropdownMenu>
                      {listRole.map((item) => (
                        <CDropdownItem onClick={() => handleFilterRole(item.role)}>{item.role}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                  <CDropdown>
                    <CDropdownToggle color="secondary">Select status</CDropdownToggle>
                    <CDropdownMenu>
                      {listStatus.map((status) => (
                        <CDropdownItem onClick={() => handleFilterStatus(status)}>{status}</CDropdownItem>
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
              {listUserDisplay.map((item) => (
                <>
                  <CTableRow color="info">
                    <CTableHeaderCell scope="row">
                      <div className="d-flex justify-content-evenly">{item.userId}</div>
                    </CTableHeaderCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.fullName}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.mobile}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">{item.roles.join('/')}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className="d-flex justify-content-evenly">
                        <CBadge
                          color={
                            item.status === 'ACTIVE' ? 'success' : item.status === 'INACTIVE' ? 'danger' : 'warning'
                          }
                        >
                          {item.status}
                        </CBadge>
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
                        ) : item.status === 'INACTIVE' ? (
                          <CButton
                            color="success"
                            type="submit"
                            className="text-light"
                            onClick={() => handleActive(item)}
                          >
                            Reactive
                          </CButton>
                        ) : (
                          <CButton color="info" type="submit" className="text-light" onClick={() => handleActive(item)}>
                            Verify
                          </CButton>
                        )}
                        <CButton color="warning" type="reset" onClick={() => handleView(item)}>
                          View
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </>
              ))}
            </CTableBody>
          </CTable>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageCount={totalPages}
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
