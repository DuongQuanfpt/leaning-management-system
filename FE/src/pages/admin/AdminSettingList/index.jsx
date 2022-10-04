import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import settingListApi from '~/api/settingListApi'

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
  const ITEM_PER_PAGE = 7

  const navigateTo = useNavigate()

  const [listSettingFetched, setListSettingFetched] = useState([])
  const [listSettingDisplay, setListSettingDisplay] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [listStatus, setListStatus] = useState([])
  const [listType, setListType] = useState([])
  const [search, setSearch] = useState('')

  const columnHead = ['ID', 'Type', 'Title', 'Value', 'Display Order', 'Status', 'Actions']
  const columnSort = ['ID', 'Type', 'Title', 'Value']

  useEffect(() => {
    settingListApi.getFilter().then((response) => {
      setListStatus(response.statusFilter)
      setListType(response.typeFilter)
    })
    loadData(1)
  }, [])

  const loadData = async (page) => {
    const params = { page: page, limit: ITEM_PER_PAGE }
    await settingListApi.getPage(params).then((response) => {
      setListSettingFetched(response.listResult)
      setListSettingDisplay(response.listResult)
      setTotalPages(response.totalPage)
    })
  }

  const handleSearch = () => {
    if (search === '') {
      setSearch('')
      setListSettingDisplay(listSettingFetched)
      return
    }
    setListSettingDisplay(() => [...listSettingFetched.filter((setting) => setting.settingTitle.includes(search))])
  }

  const handleSortColumn = (column) => {
    switch (column) {
      case 'ID':
        setListSettingDisplay(() => [...listSettingFetched.sort((a, b) => (a.settingId > b.settingId ? 1 : -1))])
        break
      case 'Type':
        setListSettingDisplay(() => [...listSettingFetched.sort((a, b) => (a.typeName > b.typeName ? 1 : -1))])
        break
      case 'Title':
        setListSettingDisplay(() => [...listSettingFetched.sort((a, b) => (a.settingTitle > b.settingTitle ? 1 : -1))])
        break
      case 'Value':
        setListSettingDisplay(() => [...listSettingFetched.sort((a, b) => (a.settingValue > b.settingValue ? 1 : -1))])
        break
      default:
        break
    }
    console.log(column)
    console.log(listSettingFetched)
    console.log(listSettingDisplay)
  }

  const handleFilterStatus = (item) => {
    setListSettingDisplay(() => [...listSettingFetched.filter((setting) => setting.status === item)])
  }

  const handleFilterType = (item) => {
    setListSettingDisplay(() => [...listSettingFetched.filter((setting) => setting.typeName === item)])
  }

  const handleReload = () => {
    setSearch('')
    loadData(1)
  }

  const handlePageChange = async ({ selected }) => {
    const params = { page: selected + 1, limit: ITEM_PER_PAGE }
    await settingListApi.getPage(params).then((response) => {
      setListSettingDisplay(response.listResult)
    })
  }

  const handleActive = async ({ settingId }) => {
    // eslint-disable-next-line no-unused-vars
    await settingListApi.changeActive(settingId).then((response) => {
      navigateTo(0)
    })
  }

  const handleView = ({ settingId }) => {
    navigateTo(`/setting-detail/${settingId}`)
  }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-5 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  value={search}
                  placeholder="Searching by title...."
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-3 w-80">
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
                  <CTableHeaderCell scope="col">
                    <div className="d-flex justify-content-evenly">{column}</div>
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {listSettingDisplay.length === 0 ? (
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
                listSettingDisplay.map((item) => {
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
                })
              )}
            </CTableBody>
          </CTable>
          <ReactPaginate
            breakLabel="..."
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

export default AdminSettingList
