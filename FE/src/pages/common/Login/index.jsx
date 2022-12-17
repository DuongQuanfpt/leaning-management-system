import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { GoogleLogin } from 'react-google-login'

import userApi from '~/api/profileApi'
import authApi from '~/api/authApi'

import { setToken } from '~/redux/AuthSlice/authSlice'
import { setCurrentClass, setProfile } from '~/redux/ProfileSlice/profileSlice'
import { CButton } from '@coreui/react'

import ErrorMsg from '~/components/Common/ErrorMsg'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import { Typography } from 'antd'

const Login = () => {
  const clientId = process.env.REACT_APP_LMS_GOOGLE_CLIENT_ID
  const captchaKey = process.env.REACT_APP_LMS_RECAPTCHA_KEY

  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })
  const watchAllFields = watch()

  const navigateTo = useNavigate()

  const [logged, setLogged] = useState(false)
  const [error, setError] = useState('')
  const [verified, setVerified] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'LMS - Login'
    window.scrollTo(0, 0)
  }, [])

  const submitForm = async (data) => {
    setError('')
    //Get user token
    await authApi
      .getAuthToken(data)
      .then((response) => {
        const token = response.accessToken
        dispatch(setToken(token))
        return token
      })
      .then((token) => {
        //Get profile data
        userApi
          .getProfile(token)
          .then((response) => {
            dispatch(setProfile(response))
            dispatch(setCurrentClass(response.classCodes[0]))
            setLogged(true)
            navigateTo('/dashboard')
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        setLogged(false)
        const { message } = error.response.data
        if (message === 'User doesnt exist') {
          setError('This account is does not exist')
          return
        }
        if (message === 'This account is unverified') {
          setError('This account is unverified')
          return
        }
        if (message === 'Incorect credentials') {
          setError('Your email or password is incorrect')
          return
        }
        if (message === 'cant login to this user') {
          setError('This account is inactivated')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const handleCaptchaOnChange = (value) => {
    setVerified(true)
  }

  const onSuccess = async (res) => {
    const data = {
      idToken: res.tokenId,
      clientId: clientId,
    }

    //Get google account token
    await authApi
      .getLoginGoogle(data)
      .then((response) => {
        const token = response.accessToken
        dispatch(setToken(token))
        return token
      })
      .then((token) => {
        //Get profile data
        userApi.getProfile(token).then((response) => {
          dispatch(setProfile(response))
          dispatch(setCurrentClass(response.classCodes[0]))
          setLogged(true)
          navigateTo('/dashboard')
        })
      })
      .catch(() => {
        setError('Something went wrong, please try again later!')
      })
  }

  const onFailure = (res) => {
    if (res.error !== 'popup_closed_by_user') {
      setError('Something went wrong, please try again later!')
    }
  }

  const handleResend = async () => {
    const urlFE = process.env.REACT_APP_LMS_FE_URL
    const params = {
      email: watchAllFields.email.trim(),
      link: `${urlFE}/verify?token=`,
    }

    await authApi
      .resendVerifyMail(params)
      .then((response) => {
        console.log(response)
        setError('Resend verify mail successfully')
      })
      .catch((error) => {
        setError('Resend verify mail failed, try again later')
        console.log(error)
      })
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
                Don't have an account?{' '}
                <Link to="/register" className="link-decoration text-primary">
                  Create one here
                </Link>
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
                    <Link to="/forget-password" className="ml-auto text-primary link-decoration">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <div className="col-lg-12 mb-10">
                  <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptchaOnChange} />
                </div>
                <div className="col-lg-12 mb-10 mt-3">
                  {logged ? <ErrorMsg errorMsg="Your email or password is not available" /> : <Fragment />}
                  {error !== '' ? (
                    <ErrorMsg errorMsg={error} isError={error !== 'Resend verify mail successfully'} />
                  ) : (
                    <Fragment />
                  )}
                  {error === 'This account is unverified' ? (
                    <p className="h6 text-danger">
                      Click <Typography.Link onClick={handleResend}>here</Typography.Link> to resend verify mail
                    </p>
                  ) : (
                    <Fragment />
                  )}
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
                  <GoogleLogin
                    className="bg-danger text-light"
                    clientId={clientId}
                    buttonText="Sign In with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                  />
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
