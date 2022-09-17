import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

const HeaderDashboard = () => {
  useEffect(() => {
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
  return (
    <>
      <header className="ttr-header">
        <div className="ttr-header-wrapper">
          {/* <!--sidebar menu toggler start --> */}
          <div className="ttr-toggle-sidebar ttr-material-button">
            <i className="ti-close ttr-open-icon"></i>
            <i className="ti-menu ttr-close-icon"></i>
          </div>
          {/* <!--sidebar menu toggler end --> */}
          {/* <!--logo start --> */}
          <div className="ttr-logo-box">
            <div>
              <Link to="/admin" className="ttr-logo">
                <img className="ttr-logo-mobile" alt="" src="assets/images/logo-mobile.png" width="30" height="30" />
                <img className="ttr-logo-desktop" alt="" src="assets/images/logo-white.png" width="160" height="27" />
              </Link>
            </div>
          </div>
          {/* <!--logo end --> */}
          <div className="ttr-header-menu">
            {/* <!-- header left menu start --> */}
            <ul className="ttr-header-navigation">
              <li>
                <Link to="/" className="ttr-material-button ttr-submenu-toggle">
                  DASHBOARD
                </Link>
              </li>
              <li>
                <Link to="/" className="ttr-material-button ttr-submenu-toggle">
                  USER
                </Link>
              </li>
              <li>
                <Link to="/" className="ttr-material-button ttr-submenu-toggle">
                  SETTING
                </Link>
              </li>
              <li>
                <Link to="#" className="ttr-material-button ttr-submenu-toggle">
                  ROLE_NAME_HERE
                </Link>
              </li>
            </ul>
            {/* <!-- header left menu end --> */}
          </div>
          <div className="ttr-header-right ttr-with-seperator">
            {/* <!-- header right menu start --> */}
            <ul className="ttr-header-navigation">
              <li>
                <Link to="#" className="ttr-material-button ttr-submenu-toggle">
                  <i className="fa fa-bell"></i>
                </Link>
                <div className="ttr-header-submenu noti-menu">
                  <div className="ttr-notify-header">
                    <span className="ttr-notify-text-top">9 New</span>
                    <span className="ttr-notify-text">User Notifications</span>
                  </div>
                  <div className="noti-box-list">
                    <ul>
                      <li>
                        <span className="notification-icon dashbg-gray">
                          <i className="fa fa-check"></i>
                        </span>
                        <span className="notification-text">
                          <span>Sneha Jogi</span> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/admin" className="fa fa-close"></Link>
                          <span> 02:14</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-yellow">
                          <i className="fa fa-shopping-cart"></i>
                        </span>
                        <span className="notification-text">
                          <Link to="/">Your order is placed</Link> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/admin" className="fa fa-close"></Link>
                          <span> 7 Min</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-red">
                          <i className="fa fa-bullhorn"></i>
                        </span>
                        <span className="notification-text">
                          <span>Your item is shipped</span> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/admin" className="fa fa-close"></Link>
                          <span> 2 May</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-green">
                          <i className="fa fa-comments-o"></i>
                        </span>
                        <span className="notification-text">
                          <Link to="#">Sneha Jogi</Link> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/admin" className="fa fa-close"></Link>
                          <span> 14 July</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-primary">
                          <i className="fa fa-file-word-o"></i>
                        </span>
                        <span className="notification-text">
                          <span>Sneha Jogi</span> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/admin" className="fa fa-close"></Link>
                          <span> 15 Min</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <Link to="/" className="ttr-material-button ttr-submenu-toggle">
                  <span className="ttr-user-avatar">
                    <img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32" />
                  </span>
                </Link>
                <div className="ttr-header-submenu">
                  <ul>
                    <li>
                      <Link to="user-profile.html">
                        <i className="fa fa-check pr-2"></i>
                        My profile
                      </Link>
                    </li>
                    <li>
                      <Link to="list-view-calendar.html">
                        <i className="fa fa-check pr-2"></i>
                        Activity
                      </Link>
                    </li>
                    <li>
                      <Link to="mailbox.html">
                        <i className="fa fa-check pr-2"></i>
                        Messages
                      </Link>
                    </li>
                    <li>
                      <Link to="/login">
                        <i className="fa fa-check pr-2"></i>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="ttr-hide-on-mobile">
                <Link to="" className="ttr-material-button">
                  <i className="ti-layout-grid3-alt"></i>
                </Link>
                <div className="ttr-header-submenu ttr-extra-menu">
                  <Link to="">
                    <i className="fa fa-music"></i>
                    <span>Musics</span>
                  </Link>
                  <Link to="">
                    <i className="fa fa-youtube-play"></i>
                    <span>Videos</span>
                  </Link>
                  <Link to="">
                    <i className="fa fa-envelope"></i>
                    <span>Emails</span>
                  </Link>
                  <Link to="">
                    <i className="fa fa-book"></i>
                    <span>Reports</span>
                  </Link>
                  <Link to="">
                    <i className="fa fa-smile-o"></i>
                    <span>Persons</span>
                  </Link>
                  <Link to="">
                    <i className="fa fa-picture-o"></i>
                    <span>Pictures</span>
                  </Link>
                </div>
              </li>
            </ul>
            {/* <!-- header right menu end --> */}
          </div>
          {/* <!--header search panel start --> */}
          <div className="ttr-search-bar">
            <form className="ttr-search-form">
              <div className="ttr-search-input-wrapper">
                <input type="text" name="qq" placeholder="search something..." className="ttr-search-input"></input>
                <button type="submit" name="search" className="ttr-search-submit">
                  <i className="ti-arrow-right"></i>
                </button>
              </div>
              <span className="ttr-search-close ttr-search-toggle">
                <i className="ti-close"></i>
              </span>
            </form>
          </div>
          {/* <!--header search panel end --> */}
        </div>
      </header>
    </>
  )
}

export default HeaderDashboard
