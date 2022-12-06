import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSidebarShow, setSidebarUnfoldable } from '~/redux/SidebarSlice/sidebarSlice'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import { AdminSidebarNav } from './AdminSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import '~/assets/css/custom/scrollbar.css'

// sidebar nav config
import _nav from '~/utils/navigator/_nav'

const AdminSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable)

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={false}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch(setSidebarShow(visible))
          dispatch(setSidebarUnfoldable(!unfoldable))
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">
          <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
          <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AdminSidebarNav items={_nav} />
          </SimpleBar>
        </CSidebarNav>
      </CSidebar>
    </>
  )
}

export default memo(AdminSidebar)
