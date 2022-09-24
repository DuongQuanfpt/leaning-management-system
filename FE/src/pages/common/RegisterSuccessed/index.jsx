import React from 'react'
import { Link } from 'react-router-dom'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'

const RegisterSuccessed = () => {
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
              <h2 className="m-b15">Sign Up Successfully</h2>
              <p className="m-b30">Password has been sent to your email and ready to login!</p>
              <div className="">
                <Link to="/login" className="btn m-r15">
                  Go To Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterSuccessed
