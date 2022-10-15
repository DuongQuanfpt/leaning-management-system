import React from 'react'
import { useSelector } from 'react-redux'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '~/assets/images/profile/pic1.jpg'
import { useNavigate } from 'react-router-dom'

const AdminHeaderDropdown = () => {
  const profileData = useSelector((state) => state.profile)

  const navigateTo = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('persist:LMS')
    //Navigate to Login and reload
    navigateTo('/login')
    navigateTo(0)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={!!profileData.avatar_url === true ? profileData.avatar_url : avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="/">
          <CIcon icon={cilUser} className="me-2" />
          Homepage
        </CDropdownItem>
        <CDropdownItem href="/profile">
          <CIcon icon={cilSettings} className="me-2" />
          User Profile
        </CDropdownItem>
        <CDropdownItem href="/change-password">
          <CIcon icon={cilSettings} className="me-2" />
          Change Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout} className="text-danger">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AdminHeaderDropdown
