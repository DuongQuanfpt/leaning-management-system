import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const Dashboard = () => {
  return (
    <body>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Dashboard</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <Link to="/">
                  <i className="fa fa-home"></i>Home
                </Link>
              </li>
              <li>Dashboard</li>
            </ul>
          </div>
          {/* <!-- Card --> */}
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
              <div className="widget-card widget-bg1">
                <div className="wc-item">
                  <h4 className="wc-title">Total Frofit</h4>
                  <span className="wc-des">All Customs Value</span>
                  <span className="wc-stats">
                    $<span className="counter">18</span>M
                  </span>
                  <div className="progress wc-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '78%' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="wc-progress-bx">
                    <span className="wc-change">Change</span>
                    <span className="wc-number ml-auto">78%</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
              <div className="widget-card widget-bg2">
                <div className="wc-item">
                  <h4 className="wc-title">New Feedbacks</h4>
                  <span className="wc-des">Customer Review</span>
                  <span className="wc-stats counter">120</span>
                  <div className="progress wc-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '88%' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="wc-progress-bx">
                    <span className="wc-change">Change</span>
                    <span className="wc-number ml-auto">88%</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
              <div className="widget-card widget-bg3">
                <div className="wc-item">
                  <h4 className="wc-title">New Orders</h4>
                  <span className="wc-des">Fresh Order Amount</span>
                  <span className="wc-stats counter">772</span>
                  <div className="progress wc-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '65%' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="wc-progress-bx">
                    <span className="wc-change">Change</span>
                    <span className="wc-number ml-auto">65%</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3 col-sm-6 col-12">
              <div className="widget-card widget-bg4">
                <div className="wc-item">
                  <h4 className="wc-title">New Users</h4>
                  <span className="wc-des">Joined New User</span>
                  <span className="wc-stats counter">350</span>
                  <div className="progress wc-progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '90%' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <span className="wc-progress-bx">
                    <span className="wc-change">Change</span>
                    <span className="wc-number ml-auto">90%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Card END --> */}
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-8 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>Your Profile Views</h4>
                </div>
                <div className="widget-inner">
                  <canvas id="chart" width="100" height="45"></canvas>
                </div>
              </div>
            </div>
            {/* <!-- Your Profile Views Chart END--> */}
            <div className="col-lg-4 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>Notifications</h4>
                </div>
                <div className="widget-inner">
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
                          <Link to="/" className="fa fa-close"></Link>
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
                          <Link to="/" className="fa fa-close"></Link>
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
                          <Link to="/" className="fa fa-close"></Link>
                          <span> 2 May</span>
                        </span>
                      </li>
                      <li>
                        <span className="notification-icon dashbg-green">
                          <i className="fa fa-comments-o"></i>
                        </span>
                        <span className="notification-text">
                          <Link to="/">Sneha Jogi</Link> sent you a message.
                        </span>
                        <span className="notification-time">
                          <Link to="/" className="fa fa-close"></Link>
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
                          <Link to="/" className="fa fa-close"></Link>
                          <span> 15 Min</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>New Users</h4>
                </div>
                <div className="widget-inner">
                  <div className="new-user-list">
                    <ul>
                      <li>
                        <span className="new-users-pic">
                          <img src="assets/images/testimonials/pic1.jpg" alt="" />
                        </span>
                        <span className="new-users-text">
                          <Link to="/" className="new-users-name">
                            Anna Strong{' '}
                          </Link>
                          <span className="new-users-info">Visual Designer,Google Inc </span>
                        </span>
                        <span className="new-users-btn">
                          <Link to="/" className="btn button-sm outline">
                            Follow
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="new-users-pic">
                          <img src="assets/images/testimonials/pic2.jpg" alt="" />
                        </span>
                        <span className="new-users-text">
                          <Link to="/" className="new-users-name">
                            {' '}
                            Milano Esco{' '}
                          </Link>
                          <span className="new-users-info">Product Designer, Apple Inc </span>
                        </span>
                        <span className="new-users-btn">
                          <Link to="/" className="btn button-sm outline">
                            Follow
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="new-users-pic">
                          <img src="assets/images/testimonials/pic1.jpg" alt="" />
                        </span>
                        <span className="new-users-text">
                          <Link to="/" className="new-users-name">
                            Nick Bold{' '}
                          </Link>
                          <span className="new-users-info">Web Developer, Facebook Inc </span>
                        </span>
                        <span className="new-users-btn">
                          <Link to="/" className="btn button-sm outline">
                            Follow
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="new-users-pic">
                          <img src="assets/images/testimonials/pic2.jpg" alt="" />
                        </span>
                        <span className="new-users-text">
                          <Link to="/" className="new-users-name">
                            Wiltor Delton{' '}
                          </Link>
                          <span className="new-users-info">Project Manager, Amazon Inc </span>
                        </span>
                        <span className="new-users-btn">
                          <Link to="/" className="btn button-sm outline">
                            Follow
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="new-users-pic">
                          <img src="assets/images/testimonials/pic3.jpg" alt="" />
                        </span>
                        <span className="new-users-text">
                          <Link to="/" className="new-users-name">
                            Nick Stone{' '}
                          </Link>
                          <span className="new-users-info">Project Manager, Amazon Inc </span>
                        </span>
                        <span className="new-users-btn">
                          <Link to="/" className="btn button-sm outline">
                            Follow
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>Orders</h4>
                </div>
                <div className="widget-inner">
                  <div className="orders-list">
                    <ul>
                      <li>
                        <span className="orders-title">
                          <Link to="/" className="orders-title-name">
                            Anna Strong{' '}
                          </Link>
                          <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                        </span>
                        <span className="orders-btn">
                          <Link to="/" className="btn button-sm red">
                            Unpaid
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="orders-title">
                          <Link to="/" className="orders-title-name">
                            Revenue
                          </Link>
                          <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                        </span>
                        <span className="orders-btn">
                          <Link to="/" className="btn button-sm red">
                            Unpaid
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="orders-title">
                          <Link to="/" className="orders-title-name">
                            Anna Strong{' '}
                          </Link>
                          <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                        </span>
                        <span className="orders-btn">
                          <Link to="/" className="btn button-sm green">
                            Paid
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="orders-title">
                          <Link to="/" className="orders-title-name">
                            Revenue
                          </Link>
                          <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                        </span>
                        <span className="orders-btn">
                          <Link to="/" className="btn button-sm green">
                            Paid
                          </Link>
                        </span>
                      </li>
                      <li>
                        <span className="orders-title">
                          <Link to="/" className="orders-title-name">
                            Anna Strong{' '}
                          </Link>
                          <span className="orders-info">Order #02357 | Date 12/08/2019</span>
                        </span>
                        <span className="orders-btn">
                          <Link to="/" className="btn button-sm green">
                            Paid
                          </Link>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>Basic Calendar</h4>
                </div>
                <div className="widget-inner">
                  <div id="calendar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  )
}

export default Dashboard
