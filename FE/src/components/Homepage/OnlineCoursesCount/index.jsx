import React from 'react'

import CounterUp from '~/components/Common/CounterUp'
import { CButton } from '@coreui/react'

// Images
import bg1 from '~/assets/images/background/bg1.jpg'

const OnlineCoursesCount = () => {
  return (
    <>
      <div
        className="section-area section-sp1 ovpr-dark bg-fix online-cours"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center text-white">
              <h2>Online Courses To Learn</h2>
              <h5>Own Your Feature Learning New Skills Online</h5>
              <form className="cours-search">
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="What do you want to learn today?" />
                  <div className="input-group-append">
                    <CButton type="submit" color="warning">
                      Search
                    </CButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="mw800 m-auto">
            <div className="row">
              <div className="col-md-4 col-sm-6 col-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3>
                      <i className="ti-user"></i>
                      <CounterUp counter={5} />M
                    </h3>
                  </div>
                  <span className="cours-search-text">Over 5 million student</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-6">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3>
                      <i className="ti-layout-list-post"></i>
                      <CounterUp counter={20} />K
                    </h3>
                  </div>
                  <span className="cours-search-text">Learn Anythink Online.</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-12 col-12">
                <div className="cours-search-bx m-b30">
                  <div className="icon-box">
                    <h3>
                      <i className="ti-book"></i>
                      <CounterUp counter={30} />K
                    </h3>
                  </div>
                  <span className="cours-search-text">30,000 Courses.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OnlineCoursesCount
