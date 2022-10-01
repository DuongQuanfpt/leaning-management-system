import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilControl, cilBook } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav_manager = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Class',
  },
  {
    component: CNavItem,
    name: 'Class list',
    to: '/class-list',
    icon: <CIcon icon={cilControl} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Subject',
  },
  {
    component: CNavItem,
    name: 'Subject list',
    to: '/subject-list',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
  },
]

export default _nav_manager
