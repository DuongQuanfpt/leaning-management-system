import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import $ from 'jquery'
import Sticky from 'react-stickynode'

import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilCreditCard, cilAccountLogout, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// Images
import logo from '~/assets/images/logo.png'
import adv from '~/assets/images/adv/adv.jpg'
import logoWhite from '~/assets/images/logo-white.png'
import avatar from '~/assets/images/profile/pic1.jpg'

const Header = () => {
  const navigateTo = useNavigate()

  const [logged, setLogged] = useState(false)
  useEffect(() => {
    // Search Form Popup
    var searchForm = document.querySelector('.nav-search-bar')
    var closeBtn = document.getElementById('search-remove')

    closeBtn.addEventListener('click', function () {
      searchForm.classList.remove('show')
    })

    // Mobile Menu sidebar function
    var btn = document.querySelector('.menuicon')
    var nav = document.querySelector('.menu-links')

    function toggleFunc() {
      btn.classList.toggle('open')
      nav.classList.toggle('show')
    }

    btn.addEventListener('click', toggleFunc)
    // Mobile Submenu open close function
    var navMenu = [].slice.call(document.querySelectorAll('.menu-links > ul > li'))
    for (var y = 0; y < navMenu.length; y++) {
      navMenu[y].addEventListener('click', function () {
        menuClick(this)
      })
    }
    function menuClick(current) {
      const active = current.classList.contains('open')
      navMenu.forEach((el) => el.classList.remove('open'))

      if (active) {
        current.classList.remove('open')
      } else {
        current.classList.add('open')
      }
    }

    var searchToggle = function () {
      $('.ttr-search-toggle').on('click', function (e) {
        e.preventDefault()
        $('.ttr-search-bar').toggleClass('active')
      })
    }

    var waveEffect = function (e, a) {
      var s = '.ttr-wave-effect',
        n = e.outerWidth(),
        t = a.offsetX,
        i = a.offsetY
      return (
        e.prepend('<span class="ttr-wave-effect"></span>'),
        $(s)
          .css({
            top: i,
            left: t,
          })
          .animate(
            {
              opacity: '0',
              width: 2 * n,
              height: 2 * n,
            },
            500,
            function () {
              e.find(s).remove()
            },
          )
      )
    }

    var materialButton = function () {
      $('.ttr-material-button').on('click', function (e) {
        waveEffect($(this), e)
      })
    }

    var headerSubMenu = function () {
      $('.ttr-header-submenu').show()
      $('.ttr-header-submenu')
        .parent()
        .find('a:first')
        .on('click', function (e) {
          e.stopPropagation()
          e.preventDefault()
          $(this)
            .parents('.ttr-header-navigation')
            .find('.ttr-header-submenu')
            .not($(this).parents('li').find('.ttr-header-submenu'))
            .removeClass('active')
          $(this).parents('li').find('.ttr-header-submenu').show().toggleClass('active')
        })
      $(document).on('click', function (e) {
        var a = $(e.target)
        return (
          !0 === $('.ttr-header-submenu').hasClass('active') &&
            !a.hasClass('ttr-submenu-toggle') &&
            a.parents('.ttr-header-submenu').length < 1 &&
            $('.ttr-header-submenu').removeClass('active'),
          a.parents('.ttr-search-bar').length < 1 &&
            !a.hasClass('ttr-search-bar') &&
            !a.parent().hasClass('ttr-search-toggle') &&
            !a.hasClass('ttr-search-toggle') &&
            $('.ttr-search-bar').removeClass('active')
        )
      })
    }

    searchToggle()
    materialButton()
    headerSubMenu()
  }, [])

  const currentAccessToken = useSelector((state) => state.auth.token)
  const profileData = useSelector((state) => state.profile)

  useEffect(() => {
    if (currentAccessToken) {
      setLogged(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('persist:LMS')
    //Reload page
    navigateTo('/login')
    navigateTo(0)
  }

  return (
    <>
      <header className="header-client rs-nav header-transparent">
        <Sticky enabled={true} className="sticky-header navbar-expand-lg">
          <div className="menu-bar clearfix">
            <div className="container clearfix">
              {/* <!-- Header Logo ==== --> */}
              <div className="menu-logo">
                <Link to="/">
                  <img src={logoWhite} alt="" />
                </Link>
              </div>
              {/* <!-- Mobile Nav Button ==== --> */}
              <button
                className="navbar-toggler collapsed menuicon justify-content-end"
                type="button"
                data-toggle="collapse"
                data-target="#menuDropdown"
                aria-controls="menuDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
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
                          <CDropdownItem>
                            <CIcon icon={cilUser} className="me-2" />
                            <Link to="/dashboard">Dashboard</Link>
                          </CDropdownItem>
                          <CDropdownItem>
                            <CIcon icon={cilSettings} className="me-2" />
                            <Link to="/profile">Profile</Link>
                          </CDropdownItem>
                          <CDropdownItem>
                            <CIcon icon={cilCreditCard} className="me-2" />
                            <Link to="/change-password">Change Password</Link>
                          </CDropdownItem>
                          <CDropdownItem onClick={handleLogout}>
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
              {/* <!-- Navigation Menu ==== --> */}
              <div className="menu-links navbar-collapse collapse justify-content-start" id="menuDropdown">
                <div className="menu-logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <ul className="nav navbar-nav">
                  <li className="active">
                    <Link to="#">
                      Home <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/">Home 1</Link>
                      </li>
                      <li>
                        <Link to="/index-2">Home 2</Link>
                      </li>
                      <li>
                        <Link to="/index-3">Home 3</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      Pages <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/about-1">About 1</Link>
                      </li>
                      <li>
                        <Link to="/about-2">About 2</Link>
                      </li>
                      <li>
                        <Link to="/faq-1">FAQ's 1</Link>
                      </li>
                      <li>
                        <Link to="/faq-2">FAQ's 2</Link>
                      </li>
                      <li>
                        <Link to="/portfolio">Portfolio</Link>
                      </li>
                      <li>
                        <Link to="/error-404">404 Page</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      Events <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/event">Event</Link>
                      </li>
                      <li>
                        <Link to="/events-details">Events Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="add-mega-menu">
                    <Link to="#">
                      Courses <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu add-menu">
                      <li className="add-menu-left">
                        <h5 className="menu-adv-title">Our Courses</h5>
                        <ul>
                          <li>
                            <Link to="/courses">Courses </Link>
                          </li>
                          <li>
                            <Link to="/courses-details">Courses Details</Link>
                          </li>
                          <li>
                            <Link to="/profile">Instructor Profile</Link>
                          </li>
                          <li>
                            <Link to="/event">Upcoming Event</Link>
                          </li>
                          <li>
                            <Link to="/membership">Membership</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="add-menu-right">
                        <img src={adv} alt="" />
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      Blog <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/blog-classic-grid">Blog Classic</Link>
                      </li>
                      <li>
                        <Link to="/blog-classic-sidebar">Blog Classic Sidebar</Link>
                      </li>
                      <li>
                        <Link to="/blog-list-sidebar">Blog List Sidebar</Link>
                      </li>
                      <li>
                        <Link to="/blog-standard-sidebar">Blog Standard Sidebar</Link>
                      </li>
                      <li>
                        <Link to="/blog-details">Blog Details</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="#">
                      Contact Us <i className="fa fa-chevron-down"></i>
                    </Link>
                    <ul className="sub-menu">
                      <li>
                        <Link to="/contact-1">Contact Us 1</Link>
                      </li>
                      <li>
                        <Link to="/contact-2">Contact Us 2</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="nav-social-link">
                  <Link to="#">
                    <i className="fa fa-facebook"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-google-plus"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </div>
              </div>
              {/* <!-- Navigation Menu END ==== --> */}
            </div>
          </div>
        </Sticky>
        {/* <!-- Search Box ==== --> */}
        <div className="nav-search-bar">
          <form action="#">
            <input name="search" type="text" className="form-control" placeholder="Type to search" />
            <span>
              <i className="ti-search"></i>
            </span>
          </form>
          <span id="search-remove">
            <i className="ti-close"></i>
          </span>
        </div>
      </header>
    </>
  )
}

export default Header
