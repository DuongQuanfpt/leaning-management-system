const Sidebar = () => {
  return (
    <>
      <div className="ttr-sidebar">
        <div className="ttr-sidebar-wrapper content-scroll">
          {/* <!-- side menu logo start --> */}
          <div className="ttr-sidebar-logo">
            <a href="#">
              <img alt="" src="assets/images/logo.png" width="122" height="27" />
            </a>
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
                <a href="index.html" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-home"></i>
                  </span>
                  <span className="ttr-label">Dashborad</span>
                </a>
              </li>
              <li>
                <a href="courses.html" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-book"></i>
                  </span>
                  <span className="ttr-label">Courses</span>
                </a>
              </li>
              <li>
                <a href="#" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-email"></i>
                  </span>
                  <span className="ttr-label">Mailbox</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </a>
                <ul>
                  <li>
                    <a href="mailbox.html" className="ttr-material-button">
                      <span className="ttr-label">Mail Box</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailbox-compose.html" className="ttr-material-button">
                      <span className="ttr-label">Compose</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailbox-read.html" className="ttr-material-button">
                      <span className="ttr-label">Mail Read</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-calendar"></i>
                  </span>
                  <span className="ttr-label">Calendar</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </a>
                <ul>
                  <li>
                    <a href="basic-calendar.html" className="ttr-material-button">
                      <span className="ttr-label">Basic Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a href="list-view-calendar.html" className="ttr-material-button">
                      <span className="ttr-label">List View</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="bookmark.html" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-bookmark-alt"></i>
                  </span>
                  <span className="ttr-label">Bookmarks</span>
                </a>
              </li>
              <li>
                <a href="review.html" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-comments"></i>
                  </span>
                  <span className="ttr-label">Review</span>
                </a>
              </li>
              <li>
                <a href="add-listing.html" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-layout-accordion-list"></i>
                  </span>
                  <span className="ttr-label">Add listing</span>
                </a>
              </li>
              <li>
                <a href="#" className="ttr-material-button">
                  <span className="ttr-icon">
                    <i className="ti-user"></i>
                  </span>
                  <span className="ttr-label">My Profile</span>
                  <span className="ttr-arrow-icon">
                    <i className="fa fa-angle-down"></i>
                  </span>
                </a>
                <ul>
                  <li>
                    <a href="user-profile.html" className="ttr-material-button">
                      <span className="ttr-label">User Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="teacher-profile.html" className="ttr-material-button">
                      <span className="ttr-label">Teacher Profile</span>
                    </a>
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
