import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSettings, cilHome, cilBook, cilGroup, cilPen } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const roles = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).profile).roles

const isAdmin = roles.includes('admin')
const isSupporter = roles.includes('supporter')
const isManager = roles.includes('manager')
const isTrainer = roles.includes('trainer')
const isTrainee = roles.includes('trainee')

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  isAdmin || isSupporter || isManager
    ? {
        component: CNavGroup,
        name: 'System Adminitration',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
        items: [
          isAdmin
            ? {
                component: CNavItem,
                name: 'System Settings',
                to: '/setting-list',
              }
            : { component: CNavItem },
          isAdmin
            ? {
                component: CNavItem,
                name: 'User Management',
                to: '/user-list',
              }
            : { component: CNavItem },
          isAdmin || isManager
            ? {
                component: CNavItem,
                name: 'Subject Management',
                to: '/subject-list',
              }
            : { component: CNavItem },
          isSupporter
            ? {
                component: CNavItem,
                name: 'Web Supports',
                to: '/contact-list',
              }
            : { component: CNavItem },
        ],
      }
    : { component: CNavGroup },
  isManager || isSupporter || isTrainer
    ? {
        component: CNavGroup,
        name: 'Training Subjects',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        items: [
          isManager
            ? {
                component: CNavItem,
                name: 'Subject Settings',
                to: '/subject-setting-list',
              }
            : { component: CNavItem },
          isManager
            ? {
                component: CNavItem,
                name: 'Subject Assignments',
                to: '/assignment-list',
              }
            : { component: CNavItem },
          isManager
            ? {
                component: CNavItem,
                name: 'Evaluation Criteria',
                to: '/criteria-list',
              }
            : { component: CNavItem },
          isManager || isSupporter || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Management',
                to: '/class-list',
              }
            : { component: CNavItem },
        ],
      }
    : { component: CNavGroup },
  isSupporter || isTrainer || isManager || isTrainee
    ? {
        component: CNavGroup,
        name: 'Class Configuration',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
        items: [
          isSupporter || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Settings',
                to: '/class-setting-list',
              }
            : { component: CNavGroup },
          isSupporter || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Milestones',
                to: '/milestone-list',
              }
            : { component: CNavGroup },
          isSupporter || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Evaluation',
                to: '/class-criteria-list',
              }
            : { component: CNavGroup },
          isSupporter
            ? {
                component: CNavItem,
                name: 'Class Schedule',
                to: '/schedule-list',
              }
            : { component: CNavGroup },
          isSupporter || isTrainer || isManager
            ? {
                component: CNavItem,
                name: 'Class Trainees',
                to: '/trainee-list',
              }
            : { component: CNavGroup },

          isTrainer || isTrainee
            ? {
                component: CNavItem,
                name: 'Trainee Groups',
                to: '/group-list',
              }
            : { component: CNavGroup },
        ],
      }
    : { component: CNavGroup },
  isSupporter || isTrainer || isTrainee
    ? {
        component: CNavGroup,
        name: 'Training Tracking',
        icon: <CIcon icon={cilPen} customClassName="nav-icon" />,
        items: [
          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Attendance',
                to: '/class-attendance',
              }
            : { component: CNavItem },
          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Requirements',
                to: '/requirement-list',
              }
            : { component: CNavItem },
          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Issue Management',
                to: '/issue-list',
              }
            : { component: CNavItem },
          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Assignment Submits',
                to: '/submit-list',
              }
            : { component: CNavItem },

          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Class Evaluations',
                to: '/class-evaluation',
              }
            : { component: CNavItem },
          isTrainee || isTrainer
            ? {
                component: CNavItem,
                name: 'Assignment Evaluations',
                to: '/assignment-evaluation',
              }
            : { component: CNavItem },
          isTrainer || isSupporter
            ? {
                component: CNavItem,
                name: 'Attendance Report',
                to: '/attendance-report',
              }
            : { component: CNavItem },
        ],
      }
    : { component: CNavGroup },
]

export default _nav
