import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import React, { useState, useEffect } from 'react'
import contactUsApi from '~/api/contactUsApi'
import webContactApi from '~/api/webContactApi'
import ErrorMsg from '~/components/Common/ErrorMsg'
import ToastMessage from '~/components/Common/ToastMessage'

const ContactUs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState({ title: 'Choose your Category', value: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [listSubject, setListSubject] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    await contactUsApi.getSubject().then((response) => setListSubject(response))
  }

  const handleChangeSubject = (subject) => {
    setSubject(subject)
  }

  const handleSubmit = async () => {
    if (name === '') {
      ToastMessage('error', 'Your name must not empty', 9)
      return
    }
    if (email === '') {
      ToastMessage('error', 'Your email must not empty', 9)
      return
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      ToastMessage('error', 'Your is not valid', 9)
      return
    }
    if (phone === '') {
      ToastMessage('error', 'Your phone number must not empty', 9)
      return
    }
    if (phone.length < 9 || phone.length > 11) {
      ToastMessage('error', 'Your phone number must 9-10 characters', 9)
      return
    }
    if (subject.title === 'Choose your Category') {
      ToastMessage('error', 'Your must choose one category', 9)
      return
    }
    if (message === '') {
      ToastMessage('error', 'Your message must not empty', 9)
      return
    }
    const params = {
      fullName: name,
      categoryValue: subject.value,
      message: message,
      mobile: phone,
      email: email,
    }

    await webContactApi
      .addContact(params)
      .then((response) => ToastMessage('success', 'Your contact sent successfully', 9))
      .catch((error) => ToastMessage('error', 'Your contact sent failed, try again later', 9))
  }

  return (
    <>
      <div className="section-area section-sp1">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center pt-10">
            <div className="col-lg-7 col-md-7">
              <div className="ajax-message"></div>
              <div className="heading-bx left">
                <h2 className="title-head">
                  Contact <span>Us</span>
                </h2>
                <p>
                  Please select a category below related to your inquiry. If you don't find what you need, fill it our
                  contacts form
                </p>
              </div>
              <div className="row placeani">
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="name"
                        type="text"
                        placeholder="Your first name"
                        required
                        className="form-control valid-character"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          setError('')
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          setError('')
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="phone"
                        type="number"
                        placeholder="Your phone number"
                        required
                        className="form-control int-value"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value)
                          setError('')
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 mb-5">
                  <CDropdown className="w-100">
                    <CDropdownToggle color="warning">{subject.title}</CDropdownToggle>
                    <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                      {listSubject.map((subject) => (
                        <CDropdownItem onClick={() => handleChangeSubject(subject)}>{subject.title}</CDropdownItem>
                      ))}
                    </CDropdownMenu>
                  </CDropdown>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Your message"
                        className="form-control"
                        required
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value)
                          setError('')
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <ErrorMsg errorMsg={error} isError={error === 'Your contact added successfully' ? false : true} />
                  <CButton
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md m-t15"
                    color="warning"
                    onClick={handleSubmit}
                  >
                    Send Contact
                  </CButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
