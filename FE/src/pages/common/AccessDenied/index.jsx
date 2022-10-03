import React from 'react'
import { Link } from 'react-router-dom'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { CButton } from '@coreui/react'

const AccessDenied = () => {
  return (
    <>
      <div className="account-form">
        <div className="account-head" style={{ backgroundImage: `url(${bannerImg})` }}>
          <Link to="/">
            <img src={logoWhite2} alt="" />
          </Link>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="error-page">
              <h2 className="m-b15">Access Denied</h2>
              <p className="m-b30">
                You may not be logged in or your account does not have permission to access this page
              </p>
              <div className="">
                <Link to="/">
                  <CButton name="submit" type="submit" value="Submit" className="btn button-md m-t15" color="warning">
                    Go to Homepage
                  </CButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccessDenied
