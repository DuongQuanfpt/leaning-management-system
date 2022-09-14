import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorMsg from '~/components/ErrorMsg'

// Images
import logoWhite2 from '~/assets/images/logo-white-2.png'
import bannerImg from '~/assets/images/background/bg2.jpg'

const Login = () => {
  const schema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  // const navigate = useNavigate()

  const submitForm = (data) => {
    console.log(data)
    if (!isValid) return
    // navigate('/')
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
                        name="password"
                        type="password"
                        required=""
                        placeholder="Your Password"
                        className="form-control"
                        autoComplete="false"
                        {...register('password')}
                      />
                    </div>
                    {errors.password?.type === 'required' && <ErrorMsg errorMsg="Password is required" />}
                    {errors.password?.type === 'min' && (
                      <ErrorMsg errorMsg="Password length must be at least 8 characters" />
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
                <div className="col-lg-12 m-b30">
                  <button name="submit" type="submit" value="Submit" className="btn button-md">
                    Login
                  </button>
                </div>
                <div className="col-lg-12">
                  <h6 className="m-b15">Login with Social media</h6>
                  <Link className="btn flex-fill m-r10 facebook" to="#">
                    <i className="fa fa-facebook"></i>Facebook
                  </Link>
                  <Link className="btn flex-fill m-l5 google-plus" to="#">
                    <i className="fa fa-google-plus"></i>Google Plus
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
