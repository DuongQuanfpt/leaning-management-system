/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentClass } from '~/redux/ProfileSlice/profileSlice'
import { setSidebarShow } from '~/redux/SidebarSlice/sidebarSlice'
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavLink, CNavItem } from '@coreui/react'

import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Menu, Space } from 'antd'

import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import AdminHeaderDropdown from './AdminHeaderDropdown'
import { logo } from 'src/assets/brand/logo'
import { memo } from 'react'

const AdminHeader = () => {
  const location = useLocation()
  const showDropdownClassPathname = ['/trainee-list', '/trainee-import', '/class-setting-list']

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const listClassAssigned = useSelector((state) => state.profile.classCodes)
  const currentClass = useSelector((state) => state.profile.currentClass)

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

  console.log()

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={() => dispatch(setSidebarShow(!sidebarShow))}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {showDropdownClassPathname.includes(location.pathname) && (
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
        )}
        <CHeaderNav className="ms-3">
          <AdminHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default memo(AdminHeader)
