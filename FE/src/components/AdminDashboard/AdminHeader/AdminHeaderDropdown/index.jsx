import React from 'react'
import { useSelector } from 'react-redux'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '~/assets/images/profile/pic1.jpg'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeaderDropdown = () => {
  const profileData = useSelector((state) => state.profile)

  const navigateTo = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('persist:root')
    //Navigate to Homepage and reload
    navigateTo('/')
    navigateTo(0)
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={profileData.avatar_url ?? avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <Link to="/" className="p-0">
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Home Page
          </CDropdownItem>
        </Link>
        <Link to="/profile" className="p-0">
          <CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        </Link>
        <Link to="/" className="p-0">
          <CDropdownItem>
            <CIcon icon={cilSettings} className="me-2" />
            Change Password
          </CDropdownItem>
        </Link>
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
