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
                <Link to="/" className="ttr-material-button ttr-submenu-toggle">
                  HOME
                </Link>
              </li>
              <li>
                <Link href="#" className="ttr-material-button ttr-submenu-toggle">
                  QUICK MENU <i className="fa fa-angle-down"></i>
                </Link>
                <div className="ttr-header-submenu">
                  <ul>
                    <li>
                      <Link to="">Our Courses</Link>
                    </li>
                    <li>
                      <Link to="">New Event</Link>
                    </li>
                    <li>
                      <Link to="">Membership</Link>
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
                <Link to="" className="ttr-material-button ttr-search-toggle">
                  <i className="fa fa-search"></i>
                </Link>
              </li>
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
                          <Link to="">Your order is placed</Link> sent you a message.
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
                <Link to="#" className="ttr-material-button ttr-submenu-toggle">
                  <span className="ttr-user-avatar">
                    <img alt="" src="assets/images/testimonials/pic3.jpg" width="32" height="32" />
                  </span>
                </Link>
                <div className="ttr-header-submenu">
                  <ul>
                    <li>
                      <Link to="user-profile.html">My profile</Link>
                    </li>
                    <li>
                      <Link to="list-view-calendar.html">Activity</Link>
                    </li>
                    <li>
                      <Link to="mailbox.html">Messages</Link>
                    </li>
                    <li>
                      <Link to="/login">Logout</Link>
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

export default headerDashboard
