import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { CButton } from '@coreui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import registerApi from '~/api/registerApi'

const Verify = () => {
  const { search } = useLocation()
  const token = new URLSearchParams(search).get('token')

  const [verifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    const params = {
      params: {
        token: token,
      },
    }

    registerApi
      .verify(params)
      .then(() => {
        setVerifySuccess(true)
      })
      .catch((error) => {
        console.log(error)
        setVerifySuccess(false)
      })

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
              <h2 className="m-b15">Verify Account {verifySuccess ? 'Successfully' : 'Failed'}</h2>
              <p className="m-b30">
                {verifySuccess
                  ? 'Your account now is activated and already to login!'
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
