import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilUser, cilHome } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav_trainer = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'Users list',
    to: '/user-list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Settings list',
    to: '/setting-list',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav_trainer
