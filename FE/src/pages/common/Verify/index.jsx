import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { CButton } from '@coreui/react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const Verify = () => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token')

  const [verifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = axios
        .get('https://lms-app-1.herokuapp.com/auth/verify', {
          params: {
            token: token,
          },
        })
        .then((res) => setVerifySuccess(true))
    } catch (error) {
      setVerifySuccess(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
              <h2 className="m-b15">{verifySuccess ? 'Verify Account Successfully' : 'Verify Account Fail'}</h2>
              <p className="m-b30">
                {verifySuccess
                  ? 'Your account now is actived and already to login!'
                  : 'This account maybe is verified or not available, try again!'}
              </p>
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
      </div>
    </>
  )
}

export default Verify
