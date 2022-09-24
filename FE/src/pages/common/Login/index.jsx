import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'
import { useDispatch } from 'react-redux'
import { setProfile } from '~/redux/ProfileSlice/profileSlice'

import ErrorMsg from '~/components/Common/ErrorMsg'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { useEffect } from 'react'
import { CButton } from '@coreui/react'

const Login = () => {
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  const navigateTo = useNavigate()

  const [logged, setLogged] = useState(false)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('LMS-User-Token')) {
      navigateTo('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()

  const submitForm = async (data) => {
    if (!isValid) return
    try {
      //Get user token
      const responseAuthLogin = await axios.post('https://lms-app-1.herokuapp.com/auth/login', data)
      const token = responseAuthLogin.data.accessToken
      localStorage.setItem('LMS-User-Token', token)
      //Get profile data
      const responseProfileData = await axios.get('https://lms-app-1.herokuapp.com/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const profileData = responseProfileData.data
      dispatch(setProfile(profileData))
      console.log(profileData)
      setLogged(true)
      navigateTo('/')
    } catch (error) {
      console.error('Failed to fetch token authenticated at Login', error)
      setLogged(false)
    }
  }

  const handleCaptchaOnChange = (value) => {
    setVerified(true)
  }

  return (
    <>
      <div className="account-form">
        <div className="account-head" style={{ backgroundImage: `url('${bannerImg}')` }}>
          <Link to="/">
            <img src={logoWhite2} alt="" />
          </Link>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Login to your <span>Account</span>
              </h2>
              <p>
                Don't have an account? <Link to="/register">Create one here</Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit(submitForm)}>
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email"
                        type="email"
                        required=""
                        placeholder="Email"
                        className="form-control"
                        autoComplete="true"
                        {...register('email')}
                      />
                    </div>
                    {errors.email?.type === 'required' && <ErrorMsg errorMsg="Email is required" />}
                    {errors.email?.type === 'email' && <ErrorMsg errorMsg="Email is not valid" />}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password"
                        type="password"
                        required=""
                        placeholder="Your Password"
                        className="form-control"
                        autoComplete="true"
                        {...register('password')}
                      />
                    </div>
                    {errors.password?.type === 'required' && <ErrorMsg errorMsg="Password is required" />}
                    {errors.password?.type === 'min' && (
                      <ErrorMsg errorMsg="Password length must be at least 6 characters" />
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                      <label className="custom-control-label" htmlFor="customControlAutosizing">
                        Remember me
                      </label>
                    </div>
                    <Link to="/forget-password" className="ml-auto">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 mb-10">
                  <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaOnChange} />
                </div>
                <div className="col-lg-12 mb-10">
                  {logged ? <ErrorMsg errorMsg="Your email or password is not available" /> : <Fragment />}
                  <CButton
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md m-t15"
                    color="warning"
                    disabled={!verified}
                  >
                    {isSubmitting ? `Logging....` : `Login`}
                  </CButton>

                  <h6 className="m-b15 m-t15">Login with Social media</h6>
                  <Link className="btn flex-fill m-l5 google-plus" to="#">
                    <i className="fa fa-google-plus"></i>Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
