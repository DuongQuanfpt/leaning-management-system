import React from 'react'
import { useSelector } from 'react-redux'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout, cilCalendar, cilDescription, cilHome, cilLockLocked, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '~/assets/images/profile/pic1.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { Space, Typography } from 'antd'

const AdminHeaderDropdown = () => {
  const profileData = useSelector((state) => state.profile)
  const navigateTo = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('persist:LMS')
    window.location.replace('/login')
  }
  return (
    <>
      <CDropdown variant="nav-item" className="d-flex align-content-center align-items-center justify-content-center">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CAvatar src={!!profileData.avatar_url === true ? profileData.avatar_url : avatar} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem style={{ cursor: 'default' }} className="p-0 m-0 px-3">
            <Space className="d-flex flex-column p-0 m-0">
              <Typography.Text strong style={{ fontSize: '16px', lineHeight: '0' }}>
                {profileData.fullName}
              </Typography.Text>
            </Space>
            <Space className="d-flex flex-column p-0 m-0">
              <Typography.Text italic style={{ fontSize: '12px', lineHeight: '0' }}>
                {profileData.username}
              </Typography.Text>
            </Space>
            <Space className="d-flex flex-column p-0 m-0">
              <Typography.Text italic style={{ fontSize: '12px', lineHeight: '0' }}>
                {profileData.email}
              </Typography.Text>
            </Space>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={() => navigateTo('/')}>
            <CIcon icon={cilHome} className="me-2" />
            <Link to="/" className="color-black">
              Homepage
            </Link>
          </CDropdownItem>
          <CDropdownItem onClick={() => navigateTo('/profile')}>
            <CIcon icon={cilPeople} className="me-2" />
            <Link to="/profile" className="color-black">
              User Profile
            </Link>
          </CDropdownItem>
          <CDropdownItem onClick={() => navigateTo('/my-schedule')}>
            <CIcon icon={cilCalendar} className="me-2" />
            <Link to="/my-schedule" className="color-black">
              My Schedule
            </Link>
          </CDropdownItem>
          <CDropdownItem onClick={() => navigateTo('/new-post')}>
            <CIcon icon={cilDescription} className="me-2" />
            <Link to="/new-post" className="color-black">
              New Post
            </Link>
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={() => navigateTo('/change-password')}>
            <CIcon icon={cilLockLocked} className="me-2" />
            <Link to="/change-password" className="color-black">
              Change Password
            </Link>
          </CDropdownItem>
          <CDropdownItem onClick={handleLogout} className="text-danger">
            <CIcon icon={cilAccountLogout} className="me-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AdminHeaderDropdown
