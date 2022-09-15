import { Link } from 'react-router-dom'

import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const Mailbox = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Mailbox</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <Link to="#">
                  <i className="fa fa-home"></i>Home
                </Link>
              </li>
              <li>Mailbox</li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="email-wrapper">
                  <div className="email-menu-bar">
                    <div className="compose-mail">
                      <Link to="/admin/mailbox-compose" className="btn btn-block">
                        Compose
                      </Link>
                    </div>
                    <div className="email-menu-bar-inner">
                      <ul>
                        <li className="active">
                          <Link to="">
                            <i className="fa fa-envelope-o"></i>Inbox <span className="badge badge-success">8</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="fa fa-send-o"></i>Sent
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="fa fa-file-text-o"></i>Drafts <span className="badge badge-warning">8</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="fa fa-cloud-upload"></i>Outbox <span className="badge badge-danger">8</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="">
                            <i className="fa fa-trash-o"></i>Trash
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mail-list-container">
                    <div className="mail-toolbar">
                      <div className="check-all">
                        <div className="custom-control custom-checkbox checkbox-st1">
                          <input type="checkbox" className="custom-control-input" id="check1" />
                          <label className="custom-control-label" for="check1"></label>
                        </div>
                      </div>
                      <div className="mail-search-bar">
                        <input type="text" className="form-control" placeholder="Search" />
                      </div>
                      <div className="dropdown all-msg-toolbar">
                        <span className="btn btn-info-icon" data-toggle="dropdown">
                          <i className="fa fa-ellipsis-v"></i>
                        </span>
                        <ul className="dropdown-menu">
                          <li>
                            <Link to="">
                              <i className="fa fa-trash-o"></i> Delete
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              <i className="fa fa-arrow-down"></i> Archive
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              <i className="fa fa-clock-o"></i> Snooze
                            </Link>
                          </li>
                          <li>
                            <Link to="">
                              <i className="fa fa-envelope-open"></i> Mark as unread
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="next-prev-btn">
                        <Link to="">
                          <i className="fa fa-angle-left"></i>
                        </Link>
                        <Link to="">
                          <i className="fa fa-angle-right"></i>
                        </Link>
                      </div>
                    </div>
                    <div className="mail-box-list">
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check2" />
                            <label className="custom-control-label" for="check2"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check3" />
                            <label className="custom-control-label" for="check3"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check4" />
                            <label className="custom-control-label" for="check4"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check5" />
                            <label className="custom-control-label" for="check5"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check6" />
                            <label className="custom-control-label" for="check6"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check7" />
                            <label className="custom-control-label" for="check7"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check8" />
                            <label className="custom-control-label" for="check8"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check9" />
                            <label className="custom-control-label" for="check9"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check10" />
                            <label className="custom-control-label" for="check10"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check11" />
                            <label className="custom-control-label" for="check11"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check12" />
                            <label className="custom-control-label" for="check12"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check13" />
                            <label className="custom-control-label" for="check13"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check14" />
                            <label className="custom-control-label" for="check14"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check15" />
                            <label className="custom-control-label" for="check15"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check16" />
                            <label className="custom-control-label" for="check16"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check17" />
                            <label className="custom-control-label" for="check17"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check18" />
                            <label className="custom-control-label" for="check18"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                      <div className="mail-list-info">
                        <div className="checkbox-list">
                          <div className="custom-control custom-checkbox checkbox-st1">
                            <input type="checkbox" className="custom-control-input" id="check19" />
                            <label className="custom-control-label" for="check19"></label>
                          </div>
                        </div>
                        <div className="mail-rateing">
                          <span>
                            <i className="fa fa-star-o"></i>
                          </span>
                        </div>
                        <div className="mail-list-title">
                          <h6>David Moore</h6>
                        </div>
                        <div className="mail-list-title-info">
                          <p>Change the password for your Micr</p>
                        </div>
                        <div className="mail-list-time">
                          <span>10:59 AM</span>
                        </div>
                        <ul className="mailbox-toolbar">
                          <li data-toggle="tooltip" title="Delete">
                            <i className="fa fa-trash-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Archive">
                            <i className="fa fa-arrow-down"></i>
                          </li>
                          <li data-toggle="tooltip" title="Snooze">
                            <i className="fa fa-clock-o"></i>
                          </li>
                          <li data-toggle="tooltip" title="Mark as unread">
                            <i className="fa fa-envelope-open"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
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

export default Mailbox
