import { Link } from 'react-router-dom'

const headerDashboard = () => {
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
                <a href="../index.html" className="ttr-material-button ttr-submenu-toggle">
                  HOME
                </a>
              </li>
              <li>
                <a href="#" className="ttr-material-button ttr-submenu-toggle">
                  QUICK MENU <i className="fa fa-angle-down"></i>
                </a>
                <div className="ttr-header-submenu">
                  <ul>
                    <li>
                      <a href="../courses.html">Our Courses</a>
                    </li>
                    <li>
                      <a href="../event.html">New Event</a>
                    </li>
                    <li>
                      <a href="../membership.html">Membership</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            {/* <!-- header left menu end --> */}
          </div>
          <div className="ttr-header-right ttr-with-seperator">
            {/* <!-- header right menu start --> */}
            <ul className="ttr-header-navigation">
              <li>
                <a href="#" className="ttr-material-button ttr-search-toggle">
                  <i className="fa fa-search"></i>
                </a>
              </li>
              <li>
                <a href="#" className="ttr-material-button ttr-submenu-toggle">
                  <i className="fa fa-bell"></i>
                </a>
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
                          <a href="#" className="fa fa-close"></a>
                          <span> 02:14</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-yellow">
                          <i className="fa fa-shopping-cart"></i>
                        </span>
                        <span className="notification-text">
                          <a href="#">Your order is placed</a> sent you a message.
                        </span>
                        <span className="notification-time">
                          <a href="#" className="fa fa-close"></a>
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
                          <a href="#" className="fa fa-close"></a>
                          <span> 2 May</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-green">
                          <i className="fa fa-comments-o"></i>
                        </span>
                        <span className="notification-text">
                          <a href="#">Sneha Jogi</a> sent you a message.
                        </span>
                        <span className="notification-time">
                          <a href="#" className="fa fa-close"></a>
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
                          <a href="#" className="fa fa-close"></a>
                          <span> 15 Min</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="ttr-material-button ttr-submenu-toggle">
                  <span className="ttr-user-avatar">
                    <img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32" />
                  </span>
                </a>
                <div className="ttr-header-submenu">
                  <ul>
                    <li>
                      <a href="user-profile.html">My profile</a>
                    </li>
                    <li>
                      <a href="list-view-calendar.html">Activity</a>
                    </li>
                    <li>
                      <a href="mailbox.html">Messages</a>
                    </li>
                    <li>
                      <a href="../login.html">Logout</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="ttr-hide-on-mobile">
                <a href="#" className="ttr-material-button">
                  <i className="ti-layout-grid3-alt"></i>
                </a>
                <div className="ttr-header-submenu ttr-extra-menu">
                  <a href="#">
                    <i className="fa fa-music"></i>
                    <span>Musics</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-youtube-play"></i>
                    <span>Videos</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-envelope"></i>
                    <span>Emails</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-book"></i>
                    <span>Reports</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-smile-o"></i>
                    <span>Persons</span>
                  </a>
                  <a href="#">
                    <i className="fa fa-picture-o"></i>
                    <span>Pictures</span>
                  </a>
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

export default headerDashboard
