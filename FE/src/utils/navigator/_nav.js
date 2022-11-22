import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilHome, cilBook, cilGroup, cilPen } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'System Adminitration',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'System Settings',
        to: '/setting-list',
      },
      {
        component: CNavItem,
        name: 'User Management',
        to: '/user-list',
      },
      {
        component: CNavItem,
        name: 'Subject Management',
        to: '/subject-list',
      },
      {
        component: CNavItem,
        name: 'Web Supports',
        to: '/contact-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Training Subjects',
    icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subject Settings',
        to: '/subject-setting-list',
      },
      {
        component: CNavItem,
        name: 'Subject Assignments',
        to: '/assignment-list',
      },
      {
        component: CNavItem,
        name: 'Evaluation Criteria',
        to: '/criteria-list',
      },
      {
        component: CNavItem,
        name: 'Class Management',
        to: '/class-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Class Configuration',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Class Settings',
        to: '/class-setting-list',
      },
      {
        component: CNavItem,
        name: 'Class Evaluation',
        to: '/class-criteria-list',
      },
      {
        component: CNavItem,
        name: 'Class Schedule',
        to: '/schedule-list',
      },
      {
        component: CNavItem,
        name: 'Class Trainees',
        to: '/trainee-list',
      },
      {
        component: CNavItem,
        name: 'Class Assignments',
        to: '/milestone-list',
      },
      {
        component: CNavItem,
        name: 'Trainee Groups',
        to: '/group-list',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Training Tracking',
    icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Class Attendance',
        to: '/class-attendance',
      },
      {
        component: CNavItem,
        name: 'Class Requirements',
        to: '/requirement-list',
      },
      {
        component: CNavItem,
        name: 'Issue Management',
        to: '/issue-list',
      },
      {
        component: CNavItem,
        name: 'Assignment Submits',
        to: '/submit-list',
      },
      {
        component: CNavItem,
        name: 'Work Submits (?)',
        to: '/',
      },
      {
        component: CNavItem,
        name: 'Attendance Report',
        to: '/attendance-report',
      },
      {
        component: CNavItem,
        name: 'Class Evaluations',
        to: '/class-evaluation',
      },
      {
        component: CNavItem,
        name: 'Assignment Evaluations',
        to: '/assignment-evaluation',
      },
    ],
  },
]

export default _nav
