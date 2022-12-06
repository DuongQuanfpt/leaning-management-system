import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sticky from 'react-stickynode'

import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout, cilUser, cilHome, cilLockLocked, cilCalendar, cilDescription } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Images
import logoWhite from '~/assets/images/logo-white.png'
import avatar from '~/assets/images/profile/pic1.jpg'
import { Input, Space, Typography } from 'antd'
import { useDebounce } from '~/hooks/useDebounce'
import { setSearchQueryHomepage } from '~/redux/SidebarSlice/sidebarSlice'

const Header = ({ isPost = false }) => {
  const [logged, setLogged] = useState(false)
  const navigateTo = useNavigate()
  const dispatch = useDispatch()

  const currentAccessToken = useSelector((state) => state.auth.token)
  const profileData = useSelector((state) => state.profile)

  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search, 400)

  useEffect(() => {
    dispatch(setSearchQueryHomepage(debouncedSearch))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  useEffect(() => {
    if (currentAccessToken) {
      setLogged(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('persist:LMS')
    navigateTo('/login')
  }

  return (
    <>
      <header
        className={
          isPost
            ? 'header-client rs-nav header-transparent custom-background-color'
            : 'header-client rs-nav header-transparent'
        }
      >
        <Sticky
          enabled={true}
          className="sticky-header navbar-expand-lg"
          style={{ backgroundColor: '#171717 !important' }}
        >
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* <!-- Header Logo ==== --> */}
              <div className="menu-logo">
                <Link to="/">
                  <img src={logoWhite} alt="" />
                </Link>
              </div>
              <div className="menu-logo w-50 d-flex align-items-center">
                <Input
                  className="w-100"
                  size="large"
                  placeholder="Enter post title here"
                  style={{ backgroundColor: 'transparent', border: 'none', color: 'white' }}
                  value={search}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSearch(() => e.target.value)
                    } else {
                      setSearch(() => undefined)
                    }
                  }}
                />
              </div>

              {/* <!-- Author Nav ==== --> */}
              <div className="secondary-menu">
                <div className="secondary-inner">
                  <ul>
                    {logged ? (
                      <CDropdown variant="nav-item">
                        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                          <CAvatar
                            src={!!profileData.avatar_url === true ? profileData.avatar_url : avatar}
                            size="md"
                          />
                        </CDropdownToggle>
                        <CDropdownMenu className="pt-0" placement="bottom-end">
                          <CDropdownItem style={{ cursor: 'default' }}>
                            <Space className="d-flex flex-column p-0 m-0" style={{ gap: '0px' }}>
                              <Space className="d-flex flex-column">
                                <Typography.Text strong style={{ fontSize: '14px', lineHeight: '1px' }}>
                                  {profileData.fullName}
                                </Typography.Text>
                              </Space>
                              <Space className="d-flex flex-column">
                                <Typography.Text style={{ fontSize: '12px', lineHeight: '1px' }}>
                                  {profileData.username}
                                </Typography.Text>
                              </Space>
                              <Space className="d-flex flex-column">
                                <Typography.Text style={{ fontSize: '12px', lineHeight: '1px' }}>
                                  {profileData.email}
                                </Typography.Text>
                              </Space>
                            </Space>
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem onClick={() => navigateTo('/dashboard')}>
                            <CIcon icon={cilHome} className="me-2" />
                            <Link to="/dashboard">Dashboard</Link>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigateTo('/profile')}>
                            <CIcon icon={cilUser} className="me-2" />
                            <Link to="/profile">User Profile</Link>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigateTo('/my-schedule')}>
                            <CIcon icon={cilCalendar} className="me-2" />
                            <Link to="/my-schedule">My Schedule</Link>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => navigateTo('/new-post')}>
                            <CIcon icon={cilDescription} className="me-2" />
                            <Link to="/new-post">New Post</Link>
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownItem onClick={() => navigateTo('/change-password')}>
                            <CIcon icon={cilLockLocked} className="me-2" />
                            <Link to="/change-password">Change Password</Link>
                          </CDropdownItem>
                          <CDropdownItem onClick={() => handleLogout()}>
                            <CIcon icon={cilAccountLogout} className="me-2" />
                            Logout
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    ) : (
                      <div className="d-flex justify-content-evenly">
                        <li className="px-2">
                          <Link to="/register" className="btn-link">
                            Register
                          </Link>
                        </li>
                        <li className="px-2">
                          <Link to="/login" className="btn-link">
                            Login
                          </Link>
                        </li>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Sticky>
      </header>
    </>
  )
}

export default Header
