import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const UserProfile = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">User Profile</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>User Profile</li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>User Profile</h4>
                </div>
                <div className="widget-inner">
                  <form className="edit-profile m-b30">
                    <div className="">
                      <div className="form-group row">
                        <div className="col-sm-10  ml-auto">
                          <h3>1. Personal Details</h3>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Full Name</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="Mark Andre" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Occupation</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="CTO" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Company Name</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="EduChamp" />
                          <span className="help">
                            If you want your invoices addressed to a company. Leave blank to use your full name.
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Phone No.</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="+120 012345 6789" />
                        </div>
                      </div>

                      <div className="seperator"></div>

                      <div className="form-group row">
                        <div className="col-sm-10 ml-auto">
                          <h3>2. Address</h3>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Address</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="5-S2-20 Dummy City, UK" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">City</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="US" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">State</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="California" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Postcode</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="000702" />
                        </div>
                      </div>

                      <div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>

                      <div className="form-group row">
                        <div className="col-sm-10 ml-auto">
                          <h3 className="m-form__section">3. Social Links</h3>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Linkedin</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="www.linkedin.com" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Facebook</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="www.facebook.com" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Twitter</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="www.twitter.com" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Instagram</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="text" value="www.instagram.com" />
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="">
                        <div className="row">
                          <div className="col-sm-2"></div>
                          <div className="col-sm-7">
                            <button type="reset" className="btn">
                              Save changes
                            </button>
                            <button type="reset" className="btn-secondry">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <form className="edit-profile">
                    <div className="">
                      <div className="form-group row">
                        <div className="col-sm-10 ml-auto">
                          <h3>4. Password</h3>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Current Password</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="password" value="" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="password" value="" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Re Type Password</label>
                        <div className="col-sm-7">
                          <input className="form-control" type="password" value="" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-7">
                        <button type="reset" className="btn">
                          Save changes
                        </button>
                        <button type="reset" className="btn-secondry">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* <!-- Your Profile Views Chart END--> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
