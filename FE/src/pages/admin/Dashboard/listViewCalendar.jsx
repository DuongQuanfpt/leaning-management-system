import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const ListViewCalendar = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">List Views Calendar</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>List Views Calendar</li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>List Views Calendar</h4>
                </div>
                <div className="widget-inner">
                  <div id="calendar"></div>
                </div>
              </div>
            </div>
            {/* <!-- Your Profile Views Chart END--> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListViewCalendar
