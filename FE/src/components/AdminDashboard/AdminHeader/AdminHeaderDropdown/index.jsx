import React from 'react'
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from '~/assets/images/profile/pic1.jpg'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeaderDropdown = () => {
  const navigateTo = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('persist:root')
    //Reload page
    navigateTo('/')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          <Link to="/">Home Page</Link>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon icon={cilUser} className="me-2" />
          <Link to="/profile">Profile</Link>
        </CDropdownItem>
        <CDropdownItem href="/change-password">
          <CIcon icon={cilSettings} className="me-2" />
          <Link to="/change-password">Change Password</Link>
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
