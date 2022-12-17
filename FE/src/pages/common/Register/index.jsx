import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import GoogleLogin from 'react-google-login'

import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { CButton } from '@coreui/react'

import authApi from '~/api/authApi'
import userApi from '~/api/profileApi'
import { setProfile } from '~/redux/ProfileSlice/profileSlice'
import { setToken } from '~/redux/AuthSlice/authSlice'

import registerApi from '~/api/registerApi'
import ErrorMsg from '~/components/Common/ErrorMsg'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'

const Register = () => {
  const clientId = process.env.REACT_APP_LMS_GOOGLE_CLIENT_ID
  const captchaKey = process.env.REACT_APP_LMS_RECAPTCHA_KEY

  const navigateTo = useNavigate()

  const dispatch = useDispatch()

  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(6),
    confirmPassword: Yup.string().required().min(6),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  useEffect(() => {
    document.title = 'LMS - Register'
    window.scrollTo(0, 0)
  }, [])

  const submitForm = async (data) => {
    setError('')
    if (!isValid) return
    if (data.password !== data.confirmPassword) {
      setError('Your password and confirm password is not matched')
      return
    }
    const urlFE = process.env.REACT_APP_LMS_FE_URL

    data = {
      fullName: data.name.trim(),
      email: data.email.trim(),
      password: data.password,
      link: `${urlFE}/verify?token=`,
    }

    await registerApi
      .register(data)
      .then(() => navigateTo('/register-processed'))
      .catch((error) => {
        setError('Email is available')
        console.log(error)
      })
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
          navigateTo('/')
        })
      })
      .catch(() => {
        setError('Something went wrong, please try again later!')
      })
  }

  const onFailure = (res) => {
    setError('Something went wrong, please try again later!')
  }

  const handleCaptchaOnChange = (value) => {
    setVerified(true)
  }

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
            <div className="heading-bx left">
              <h2 className="title-head">
                Sign Up <span>Now</span>
              </h2>
              <p>
                Login Your Account{' '}
                <Link to="/login" className="link-decoration">
                  Click here
                </Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit(submitForm)}>
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        required=""
                        className="form-control"
                        autoComplete="false"
                        {...register('name')}
                      />
                    </div>
                    {errors.name?.type === 'required' && <ErrorMsg errorMsg="Name is required" />}
                    {errors.name?.type === 'min' && (
                      <ErrorMsg errorMsg="Your name length must be at least 3 characters" />
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        required=""
                        className="form-control"
                        autoComplete="false"
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
                        type="password"
                        placeholder="Your Password"
                        required=""
                        className="form-control"
                        autoComplete="false"
                        {...register('password')}
                      />
                    </div>
                    {errors.password?.type === 'required' && <ErrorMsg errorMsg="Password is required" />}
                    {errors.password?.type === 'min' && (
                      <ErrorMsg errorMsg="Your password length must be at least 6 characters" />
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        type="password"
                        placeholder="Confirm your Password"
                        required=""
                        className="form-control"
                        autoComplete="false"
                        {...register('confirmPassword')}
                      />
                    </div>
                    {errors.confirmPassword?.type === 'required' && <ErrorMsg errorMsg="Password is required" />}
                    {errors.confirmPassword?.type === 'min' && (
                      <ErrorMsg errorMsg="Your confirm password length must be at least 6 characters" />
                    )}
                  </div>
                </div>
                <div className="col-lg-12 mb-10">
                  <ReCAPTCHA sitekey={captchaKey} onChange={handleCaptchaOnChange} />
                </div>
                <div className="col-lg-12 m-b30 m-t15">
                  <ErrorMsg errorMsg={error} />
                  <CButton
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md m-t15"
                    disabled={!verified}
                    color="warning"
                  >
                    {isSubmitting ? `Registering....` : `Register`}
                  </CButton>
                </div>
                <div className="col-lg-12">
                  <h6 className="m-b15">Sign Up with Social media</h6>
                  <GoogleLogin
                    className="bg-danger text-light"
                    clientId={clientId}
                    buttonText="Sign Up with Google"
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

export default Register
