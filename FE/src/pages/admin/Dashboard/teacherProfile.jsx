import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const TeacherProfile = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Teacher Profile</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>Teacher Profile</li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="wc-title">
                  <h4>Teacher Profile</h4>
                </div>
                <div className="widget-inner">
                  <form className="edit-profile m-b30">
                    <div className="row">
                      <div className="col-12">
                        <div className="ml-auto">
                          <h3>1. Personal Details</h3>
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Full Name</label>
                        <div>
                          <input className="form-control" type="text" value="Mark Andre" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Occupation</label>
                        <div>
                          <input className="form-control" type="text" value="CTO" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Company Name</label>
                        <div>
                          <input className="form-control" type="text" value="EduChamp" />
                          <span className="help">
                            If you want your invoices addressed to a company. Leave blank to use your full name.
                          </span>
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Phone No.</label>
                        <div>
                          <input className="form-control" type="text" value="+120 012345 6789" />
                        </div>
                      </div>

                      <div className="seperator"></div>

                      <div className="col-12 m-t20">
                        <div className="ml-auto m-b5">
                          <h3>2. Address</h3>
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Address</label>
                        <div>
                          <input className="form-control" type="text" value="5-S2-20 Dummy City, UK" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">City</label>
                        <div>
                          <input className="form-control" type="text" value="US" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">State</label>
                        <div>
                          <input className="form-control" type="text" value="California" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Postcode</label>
                        <div>
                          <input className="form-control" type="text" value="000702" />
                        </div>
                      </div>

                      <div className="m-form__seperator m-form__seperator--dashed m-form__seperator--space-2x"></div>

                      <div className="col-12 m-t20">
                        <div className="ml-auto">
                          <h3 className="m-form__section">3. Social Links</h3>
                        </div>
                      </div>

                      <div className="form-group col-6">
                        <label className="col-form-label">Linkedin</label>
                        <div>
                          <input className="form-control" type="text" value="www.linkedin.com" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Facebook</label>
                        <div>
                          <input className="form-control" type="text" value="www.facebook.com" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Twitter</label>
                        <div>
                          <input className="form-control" type="text" value="www.twitter.com" />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Instagram</label>
                        <div>
                          <input className="form-control" type="text" value="www.instagram.com" />
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="reset" className="btn">
                          Save changes
                        </button>
                        <button type="reset" className="btn-secondry">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                  <form className="edit-profile">
                    <div className="row">
                      <div className="col-12 m-t20">
                        <div className="ml-auto">
                          <h3 className="m-form__section">4. Add Item</h3>
                        </div>
                      </div>
                      <div className="col-12">
                        <table id="item-add" style="width:100%;">
                          <tr className="list-item">
                            <td>
                              <div className="row">
                                <div className="col-md-4">
                                  <label className="col-form-label">Course Name</label>
                                  <div>
                                    <input className="form-control" type="text" value="" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <label className="col-form-label">Course Category</label>
                                  <div>
                                    <input className="form-control" type="text" value="" />
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <label className="col-form-label">Course Category</label>
                                  <div>
                                    <input className="form-control" type="text" value="" />
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <label className="col-form-label">Close</label>
                                  <div className="form-group">
                                    <a className="delete" href="#">
                                      <i className="fa fa-close"></i>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="col-12">
                        <button type="button" className="btn-secondry add-item m-r5">
                          <i className="fa fa-fw fa-plus-circle"></i>Add Item
                        </button>
                        <button type="reset" className="btn">
                          Save changes
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

export default TeacherProfile
