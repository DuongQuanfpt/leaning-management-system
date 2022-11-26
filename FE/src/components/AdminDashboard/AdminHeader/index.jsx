/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useDebounce } from '~/hooks/useDebounce'
import { setCurrentClass } from '~/redux/ProfileSlice/profileSlice'
import { setSidebarShow, setSearchQueryDashboard } from '~/redux/SidebarSlice/sidebarSlice'

import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Input, Menu, Space } from 'antd'

import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import AdminHeaderDropdown from './AdminHeaderDropdown'
import { logo } from 'src/assets/brand/logo'
import logoWhite from '~/assets/images/logo.png'
import { useEffect } from 'react'

const AdminHeader = () => {
  const location = useLocation()
  // const showDropdownClassPathname = [
  //   '/trainee-list',
  //   '/trainee-import',
  //   '/class-setting-list',
  //   '/class-criteria-list',
  //   '/milestone-list',
  //   '/group-list',
  //   '/schedule-list',
  //   '/schedule-add',
  //   '/issue-list',
  //   '/issue-add',
  //   '/requirement-list',
  //   '/requirement-add',
  //   '/attendance-report',
  //   '/class-attendance',
  //   '/submit-list',
  //   '/assignment-evaluation',
  // ]

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const listClassAssigned = useSelector((state) => state.profile.classCodes)
  const currentClass = useSelector((state) => state.profile.currentClass)
  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 1000)

  useEffect(() => {
    dispatch(setSearchQueryDashboard(debouncedSearch))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  const handleChangeClass = (key) => {
    console.log(listClassAssigned[key])
    dispatch(setCurrentClass(listClassAssigned[key]))
  }

  const menu = (
    <Menu
      selectable
      onClick={({ key }) => handleChangeClass(key)}
      items={listClassAssigned.map((item, index) => ({
        key: index,
        label: item,
      }))}
    />
  )

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto ml-3" style={{ width: '600px' }}>
          <CNavItem>
            <div className="menu-logo" style={{ height: '50px' }}>
              <Link to="/dashboard">
                <img src={logoWhite} alt="" />
              </Link>
            </div>
          </CNavItem>
          {['/dashboard'].includes(location.pathname) && (
            <CNavItem className="w-100 d-flex align-items-center ml-3">
              <Input.Search
                className="w-100"
                size="large"
                placeholder="Enter text search for the notice"
                value={search}
                onChange={(e) => {
                  if (e.target.value) {
                    setSearch(() => e.target.value)
                  } else {
                    setSearch(() => undefined)
                  }
                }}
                allowClear
              />
            </CNavItem>
          )}
        </CHeaderNav>

        {/* {showDropdownClassPathname.includes(location.pathname) && ( */}
        <CHeaderNav>
          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {currentClass}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </CHeaderNav>
        {/* // )} */}
        <CHeaderNav className="ms-3">
          <AdminHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default memo(AdminHeader)
