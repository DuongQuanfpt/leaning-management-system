import { Link } from 'react-router-dom'
import logo from '~/assets/images/logo.png'

const Sidebar = () => {
  return (
    <>
      <div className="ttr-sidebar">
        <div className="ttr-sidebar-wrapper content-scroll">
          {/* <!-- side menu logo start --> */}
          <div className="ttr-sidebar-logo">
            <Link to="/">
              <img alt="" src={logo} width="122" height="27" />
            </Link>
            {/* <!-- <div className="ttr-sidebar-pin-button" title="Pin/Unpin Menu">
					<i className="material-icons ttr-fixed-icon">gps_fixed</i>
					<i className="material-icons ttr-not-fixed-icon">gps_not_fixed</i>
				</div> --> */}
            <div className="ttr-sidebar-toggle-button">
              <i className="ti-arrow-left"></i>
            </div>
          </div>
          {/* <!-- side menu logo end --> */}
          {/* <!-- sidebar menu start --> */}
          <nav className="ttr-sidebar-navi">
            <ul>
              <li>
                <Link to="/admin" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-home"></i>
                  </span>
                  <span className="ttr-label">Dashborad</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/courses" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-book"></i>
                  </span>
                  <span className="ttr-label">Courses</span>
                </Link>
              </li>
              <li>
                <Link to="" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-email"></i>
                  </span>
                  <span className="ttr-label">Mailbox</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </Link>
                <ul>
                  <li>
                    <Link to="/admin/mailbox" className="ttr-material-button">
                      <span className="ttr-label">Mail Box</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/mailbox-compose" className="ttr-material-button">
                      <span className="ttr-label">Compose</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/mailbox-read" className="ttr-material-button">
                      <span className="ttr-label">Mail Read</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-calendar"></i>
                  </span>
                  <span className="ttr-label">Calendar</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </Link>
                <ul>
                  <li>
                    <Link to="/admin/basic-calendar" className="ttr-material-button">
                      <span className="ttr-label">Basic Calendar</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/list-view-calendar" className="ttr-material-button">
                      <span className="ttr-label">List View</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/admin/bookmark" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-bookmark-alt"></i>
                  </span>
                  <span className="ttr-label">Bookmarks</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/review" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-comments"></i>
                  </span>
                  <span className="ttr-label">Review</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/add-listing" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-layout-accordion-list"></i>
                  </span>
                  <span className="ttr-label">Add listing</span>
                </Link>
              </li>
              <li>
                <Link to="" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-user"></i>
                  </span>
                  <span className="ttr-label">My Profile</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </Link>
                <ul>
                  <li>
                    <Link to="/admin/user-profile" className="ttr-material-button">
                      <span className="ttr-label">User Profile</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/teacher-profile" className="ttr-material-button">
                      <span className="ttr-label">Teacher Profile</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="ttr-seperate"></li>
            </ul>
            {/* <!-- sidebar menu end --> */}
          </nav>
          {/* <!-- sidebar menu end --> */}
        </div>
      </div>
    </>
  )
}

export default Sidebar
