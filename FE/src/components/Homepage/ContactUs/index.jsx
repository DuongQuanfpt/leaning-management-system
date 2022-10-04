import { CButton } from '@coreui/react'
import React from 'react'

const ContactUs = () => {
  return (
    <>
      <div className="section-area section-sp1">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center pt-10">
            <div className="col-lg-7 col-md-7">
              <form
                className="contact-bx ajax-form"
                action="http://educhamp.themetrades.com/demo/assets/script/contact.php"
              >
                <div className="ajax-message"></div>
                <div className="heading-bx left">
                  <h2 className="title-head">
                    Contact <span>Us</span>
                  </h2>
                  <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                  </p>
                </div>
                <div className="row placeani">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="name"
                          type="text"
                          placeholder="Your name"
                          required
                          className="form-control valid-character"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input name="email" type="email" placeholder="Your email" className="form-control" required />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="phone"
                          type="text"
                          placeholder="Your phone number"
                          required
                          className="form-control int-value"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <div className="input-group">
                        <input
                          name="subject"
                          type="text"
                          placeholder="Your subject"
                          required
                          className="form-control"
                        />
                      </div>
                    </div>
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
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <CButton name="submit" type="submit" value="Submit" className="btn button-md m-t15" color="warning">
                      Send Message
                    </CButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
