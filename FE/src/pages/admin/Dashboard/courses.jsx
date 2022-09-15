import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const course = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div class="ttr-wrapper">
        <div class="container-fluid">
          <div class="db-breadcrumb">
            <h4 class="breadcrumb-title">Courses</h4>
            <ul class="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i class="fa fa-home"></i>Home
                </a>
              </li>
              <li>Courses</li>
            </ul>
          </div>
          <div class="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div class="col-lg-12 m-b30">
              <div class="widget-box">
                <div class="wc-title">
                  <h4>Your Courses</h4>
                </div>
                <div class="widget-inner">
                  <div class="card-courses-list admin-courses">
                    <div class="card-courses-media">
                      <img src="assets/images/courses/pic1.jpg" alt="" />
                    </div>
                    <div class="card-courses-full-dec">
                      <div class="card-courses-title">
                        <h4>Become a PHP Master and Make Money</h4>
                      </div>
                      <div class="card-courses-list-bx">
                        <ul class="card-courses-view">
                          <li class="card-courses-user">
                            <div class="card-courses-user-pic">
                              <img src="assets/images/testimonials/pic3.jpg" alt="" />
                            </div>
                            <div class="card-courses-user-info">
                              <h5>Teacher</h5>
                              <h4>Keny White</h4>
                            </div>
                          </li>
                          <li class="card-courses-categories">
                            <h5>3 Categories</h5>
                            <h4>Backend</h4>
                          </li>
                          <li class="card-courses-review">
                            <h5>3 Review</h5>
                            <ul class="cours-star">
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                            </ul>
                          </li>
                          <li class="card-courses-stats">
                            <a href="#" class="btn button-sm green radius-xl">
                              Pending
                            </a>
                          </li>
                          <li class="card-courses-price">
                            <del>$190</del>
                            <h5 class="text-primary">$120</h5>
                          </li>
                        </ul>
                      </div>
                      <div class="row card-courses-dec">
                        <div class="col-md-12">
                          <h6 class="m-b10">Course Description</h6>
                          <p>
                            Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro detracto disputando
                            reformidans at, ex vel suas eripuit. Vel alii zril maiorum ex, mea id sale eirmod epicurei.
                            Sit te possit senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret per. Te qui
                            doming doctus referrentur, usu debet tamquam et. Sea ut nullam aperiam, mei cu tollit
                            salutatus delicatissimi.{' '}
                          </p>
                        </div>
                        <div class="col-md-12">
                          <a href="#" class="btn green radius-xl outline">
                            Approve
                          </a>
                          <a href="#" class="btn red outline radius-xl ">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-courses-list admin-courses">
                    <div class="card-courses-media">
                      <img src="assets/images/courses/pic2.jpg" alt="" />
                    </div>
                    <div class="card-courses-full-dec">
                      <div class="card-courses-title">
                        <h4>Become a PHP Master and Make Money</h4>
                      </div>
                      <div class="card-courses-list-bx">
                        <ul class="card-courses-view">
                          <li class="card-courses-user">
                            <div class="card-courses-user-pic">
                              <img src="assets/images/testimonials/pic3.jpg" alt="" />
                            </div>
                            <div class="card-courses-user-info">
                              <h5>Teacher</h5>
                              <h4>Keny White</h4>
                            </div>
                          </li>
                          <li class="card-courses-categories">
                            <h5>3 Categories</h5>
                            <h4>Backend</h4>
                          </li>
                          <li class="card-courses-review">
                            <h5>3 Review</h5>
                            <ul class="cours-star">
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                            </ul>
                          </li>
                          <li class="card-courses-stats">
                            <a href="#" class="btn button-sm green radius-xl">
                              Pending
                            </a>
                          </li>
                          <li class="card-courses-price">
                            <del>$190</del>
                            <h5 class="text-primary">$120</h5>
                          </li>
                        </ul>
                      </div>
                      <div class="row card-courses-dec">
                        <div class="col-md-12">
                          <h6 class="m-b10">Course Description</h6>
                          <p>
                            Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro detracto disputando
                            reformidans at, ex vel suas eripuit. Vel alii zril maiorum ex, mea id sale eirmod epicurei.
                            Sit te possit senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret per. Te qui
                            doming doctus referrentur, usu debet tamquam et. Sea ut nullam aperiam, mei cu tollit
                            salutatus delicatissimi.{' '}
                          </p>
                        </div>
                        <div class="col-md-12">
                          <a href="#" class="btn green radius-xl outline">
                            Approve
                          </a>
                          <a href="#" class="btn red outline radius-xl ">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-courses-list admin-courses">
                    <div class="card-courses-media">
                      <img src="assets/images/courses/pic3.jpg" alt="" />
                    </div>
                    <div class="card-courses-full-dec">
                      <div class="card-courses-title">
                        <h4>Become a PHP Master and Make Money</h4>
                      </div>
                      <div class="card-courses-list-bx">
                        <ul class="card-courses-view">
                          <li class="card-courses-user">
                            <div class="card-courses-user-pic">
                              <img src="assets/images/testimonials/pic3.jpg" alt="" />
                            </div>
                            <div class="card-courses-user-info">
                              <h5>Teacher</h5>
                              <h4>Keny White</h4>
                            </div>
                          </li>
                          <li class="card-courses-categories">
                            <h5>3 Categories</h5>
                            <h4>Backend</h4>
                          </li>
                          <li class="card-courses-review">
                            <h5>3 Review</h5>
                            <ul class="cours-star">
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                            </ul>
                          </li>
                          <li class="card-courses-stats">
                            <a href="#" class="btn button-sm green radius-xl">
                              Pending
                            </a>
                          </li>
                          <li class="card-courses-price">
                            <del>$190</del>
                            <h5 class="text-primary">$120</h5>
                          </li>
                        </ul>
                      </div>
                      <div class="row card-courses-dec">
                        <div class="col-md-12">
                          <h6 class="m-b10">Course Description</h6>
                          <p>
                            Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro detracto disputando
                            reformidans at, ex vel suas eripuit. Vel alii zril maiorum ex, mea id sale eirmod epicurei.
                            Sit te possit senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret per. Te qui
                            doming doctus referrentur, usu debet tamquam et. Sea ut nullam aperiam, mei cu tollit
                            salutatus delicatissimi.{' '}
                          </p>
                        </div>
                        <div class="col-md-12">
                          <a href="#" class="btn green radius-xl outline">
                            Approve
                          </a>
                          <a href="#" class="btn red outline radius-xl ">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-courses-list admin-courses">
                    <div class="card-courses-media">
                      <img src="assets/images/courses/pic4.jpg" alt="" />
                    </div>
                    <div class="card-courses-full-dec">
                      <div class="card-courses-title">
                        <h4>Become a PHP Master and Make Money</h4>
                      </div>
                      <div class="card-courses-list-bx">
                        <ul class="card-courses-view">
                          <li class="card-courses-user">
                            <div class="card-courses-user-pic">
                              <img src="assets/images/testimonials/pic3.jpg" alt="" />
                            </div>
                            <div class="card-courses-user-info">
                              <h5>Teacher</h5>
                              <h4>Keny White</h4>
                            </div>
                          </li>
                          <li class="card-courses-categories">
                            <h5>3 Categories</h5>
                            <h4>Backend</h4>
                          </li>
                          <li class="card-courses-review">
                            <h5>3 Review</h5>
                            <ul class="cours-star">
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li class="active">
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                              <li>
                                <i class="fa fa-star"></i>
                              </li>
                            </ul>
                          </li>
                          <li class="card-courses-stats">
                            <a href="#" class="btn button-sm green radius-xl">
                              Pending
                            </a>
                          </li>
                          <li class="card-courses-price">
                            <del>$190</del>
                            <h5 class="text-primary">$120</h5>
                          </li>
                        </ul>
                      </div>
                      <div class="row card-courses-dec">
                        <div class="col-md-12">
                          <h6 class="m-b10">Course Description</h6>
                          <p>
                            Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro detracto disputando
                            reformidans at, ex vel suas eripuit. Vel alii zril maiorum ex, mea id sale eirmod epicurei.
                            Sit te possit senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret per. Te qui
                            doming doctus referrentur, usu debet tamquam et. Sea ut nullam aperiam, mei cu tollit
                            salutatus delicatissimi.{' '}
                          </p>
                        </div>
                        <div class="col-md-12">
                          <a href="#" class="btn green radius-xl outline">
                            Approve
                          </a>
                          <a href="#" class="btn red outline radius-xl ">
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default course
