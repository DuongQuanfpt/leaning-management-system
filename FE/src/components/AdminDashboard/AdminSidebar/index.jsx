import React from 'react'
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
import _nav_admin from '~/features/navigator/_nav_admin'
import _nav_manager from '~/features/navigator/_nav_manager'
import _nav_supporter from '~/features/navigator/_nav_supporter'
import _nav_trainer from '~/features/navigator/_nav_trainer'
import _nav_trainee from '~/features/navigator/_nav_trainee'

const AdminSidebar = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebar.sidebarUnfoldable)

  const role = useSelector((state) => state.profile.roles)
  console.log(role)

  let navigator
  navigator = role.includes('admin') ? _nav_admin : null
  navigator = role.includes('manager') ? _nav_manager : null
  navigator = role.includes('supporter') ? _nav_supporter : null
  navigator = role.includes('trainer') ? _nav_trainer : null
  navigator = role.includes('trainee') ? _nav_trainee : null

  console.log(role.includes('admin'))
  console.log(navigator)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => dispatch(setSidebarShow(visible))}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AdminSidebarNav
            items={
              role.includes('admin')
                ? _nav_admin
                : role.includes('manager')
                ? _nav_manager
                : role.includes('supporter')
                ? _nav_supporter
                : role.includes('trainer')
                ? _nav_trainer
                : _nav_trainee
            }
          />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch(setSidebarUnfoldable(!unfoldable))} />
    </CSidebar>
  )
}

export default React.memo(AdminSidebar)
