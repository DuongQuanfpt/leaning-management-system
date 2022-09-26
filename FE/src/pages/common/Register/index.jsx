import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMsg from '~/components/Common/ErrorMsg'
import ReCAPTCHA from 'react-google-recaptcha'
import { CButton } from '@coreui/react'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'
import axios from 'axios'

const Register = () => {
  const navigateTo = useNavigate()

  const [isEmailAvailable, setIsEmailAvailable] = useState(false)
  const [verified, setVerified] = useState(false)

  const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    email: Yup.string().required().email(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  const submitForm = async (data) => {
    data = {
      ...data,
      link: 'http://localhost:3000/verify?token=',
    }
    if (!isValid) return
    try {
      const response = await axios.post('https://lms-app-1.herokuapp.com/auth/register', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(data)
      console.log(response)
      navigateTo('/register-successed')
    } catch (error) {
      setIsEmailAvailable(true)
    }
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
                Login Your Account <Link to="/login">Click here</Link>
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
                        placeholder="Your Email Address"
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
                <div className="col-lg-12 mb-10">
                  <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaOnChange} />
                </div>
                <div className="col-lg-12 m-b30 m-t15">
                  {isEmailAvailable ? <ErrorMsg errorMsg="Email is available" /> : <Fragment />}
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

export default Register
