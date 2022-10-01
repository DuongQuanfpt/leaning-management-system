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
    name: 'Trainee',
  },
  {
    component: CNavItem,
    name: 'Trainee list',
    to: '/trainee-list',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Team',
  },
  {
    component: CNavItem,
    name: 'Team list',
    to: '/team-list',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Milestone',
  },
  {
    component: CNavItem,
    name: 'Milestone list',
    to: '/milestone-list',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _nav_trainer
