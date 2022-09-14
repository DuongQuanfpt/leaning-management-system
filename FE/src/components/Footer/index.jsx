import React from 'react'
import { Link } from 'react-router-dom'

// Images
import logo from '~/assets/images/logo-white.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="pt-exebar">
            <div className="container">
              <div className="d-flex align-items-stretch">
                <div className="pt-logo mr-auto">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
                <div className="pt-social-link">
                  <ul className="list-inline m-a0">
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-linkedin"></i>
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="btn-link">
                        <i className="fa fa-google-plus"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="pt-btn-join">
                  <Link to="/contact-1" className="btn">
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 footer-col-4">
                <div className="widget">
                  <h6 className="footer-title">Sign Up For A Newsletter</h6>
                  <p className="text-capitalize m-b20">
                    Weekly Breaking news analysis and cutting edge advices on job searching.
                  </p>
                  <div className="subscribe-form m-b20">
                    <form className="subscription-form">
                      <div className="ajax-message"></div>
                      <div className="input-group">
                        <input
                          name="email"
                          required="required"
                          className="form-control"
                          placeholder="Your Email Address"
                          type="email"
                        />
                        <span className="input-group-btn">
                          <button name="submit" value="Submit" type="submit" className="btn">
                            <i className="fa fa-arrow-right"></i>
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-5 col-md-7 col-sm-12">
                <div className="row">
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h6 className="footer-title">Company</h6>
                      <ul>
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <Link to="/about-1">About</Link>
                        </li>
                        <li>
                          <Link to="/faq-1">FAQs</Link>
                        </li>
                        <li>
                          <Link to="/contact-1">Contact</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h6 className="footer-title">Get In Touch</h6>
                      <ul>
                        <li>
                          <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/blog-classic-grid">Blog</Link>
                        </li>
                        <li>
                          <Link to="/">Portfolio</Link>
                        </li>
                        <li>
                          <Link to="/event">Event</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="widget footer_widget">
                      <h6 className="footer-title">Courses</h6>
                      <ul>
                        <li>
                          <Link to="/courses">Courses</Link>
                        </li>
                        <li>
                          <Link to="/courses-details">Details</Link>
                        </li>
                        <li>
                          <Link to="/">Membership</Link>
                        </li>
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
