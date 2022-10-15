import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { CButton } from '@coreui/react'
import ErrorMsg from '~/components/Common/ErrorMsg'

const ForgetPasswordProcessed = () => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isResetSuccess, setIsResetSuccess] = useState(false)

  const handleSubmit = async () => {
    if (password.length < 6 || confirmPassword.length < 6) {
      setError('Password must longer than 6 characters')
      return
    }
    if (password !== confirmPassword) {
      setError('Password and confirm password must same')
      return
    }

    const data = {
      newPassword: password,
    }
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios
        .put(`https://lms-app-1.herokuapp.com/user/forgot-processing?token=${token}`, data, {
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        })
        .then((response) => {
          setIsResetSuccess(true)
        })
    } catch (error) {
      setError('Something went wrong, please try again later')
    }
  }

  return (
    <>
      <div className="account-form">
        <div className="account-head" style={{ backgroundImage: `url(${bannerImg})` }}>
          <Link to="/">
            <img src={logoWhite2} alt="" />
          </Link>
        </div>
        {isResetSuccess ? (
          <div className="account-form-inner">
            <div className="account-container">
              <div className="error-page">
                <h2 className="m-b15">Reset password successfully!</h2>
                <p className="m-b30">Your account password now is reset and already to login!</p>
                <div className="">
                  <Link to="/login">
                    <CButton name="submit" type="submit" value="Submit" className="btn button-md m-t15" color="warning">
                      Go to Login
                    </CButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="account-form-inner">
            <div className="account-container">
              <div className="heading-bx left">
                <h2 className="title-head">Ready to set your new password</h2>
              </div>
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="password"
                        placeholder="Your new password"
                        required=""
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        type="password"
                        placeholder="Confirm your new password"
                        required=""
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <ErrorMsg errorMsg={error} />

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
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ForgetPasswordProcessed
