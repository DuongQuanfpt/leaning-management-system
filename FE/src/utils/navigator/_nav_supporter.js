import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilUser, cilHome } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav_supporter = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Web Contact',
  },
  {
    component: CNavItem,
    name: 'Web Contact list',
    to: '/web-contact-list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav_supporter
