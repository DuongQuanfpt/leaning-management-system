import React from 'react'
import { Link } from 'react-router-dom'

// Images
import logo from '~/assets/images/logo-white.png'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-top">
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
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
