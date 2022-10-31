import React from 'react'
import { Link } from 'react-router-dom'
import { CButton } from '@coreui/react'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { useState } from 'react'
import ErrorMsg from '~/components/Common/ErrorMsg'
import forgetPasswordApi from '~/api/forgetPasswordApi'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const data = {
      email,
      link: 'http://localhost:3000/forget-password-processed?token=',
    }

    await forgetPasswordApi
      .resetPassword(data)
      .then(() => {
        setError('Password reset link has been sent to your email')
      })
      .catch((error) => {
        console.log(error)
        setError('This account is not available or unverified, please try again')
      })
  }
  return (
    <>
      <div className="account-form">
        <div className="account-head" style={{ backgroundImage: 'url(' + bannerImg + ')' }}>
          <Link to="/">
            <img src={logoWhite2} alt="" />
          </Link>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Forgot <span>Password</span>
              </h2>
              <p>
                Login Your Account <Link to="/login">Click here</Link>
              </p>
            </div>
            <div className="row placeani">
              <div className="col-lg-12">
                <div className="form-group">
                  <div className="input-group">
                    <input
                      name="name"
                      type="email"
                      placeholder="Your Email Address"
                      required=""
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <CButton
                  name="submit"
                  type="submit"
                  value="Submit"
                  className="btn button-md"
                  color="warning"
                  onClick={handleSubmit}
                >
                  Submit
                </CButton>
              </div>
              <ErrorMsg
                errorMsg={error}
                isError={error === 'Password reset link has been sent to your email' ? false : true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
