import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const MailboxRead = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Mail Read</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>Mail Read</li>
            </ul>
          </div>
          <div className="row">
            {/* <!-- Your Profile Views Chart --> */}
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="email-wrapper">
                  <div className="email-menu-bar">
                    <div className="compose-mail">
                      <a href="mailbox-compose.html" className="btn btn-block">
                        Compose
                      </a>
                    </div>
                    <div className="email-menu-bar-inner">
                      <ul>
                        <li className="active">
                          <a href="mailbox.html">
                            <i className="fa fa-envelope-o"></i>Inbox <span className="badge badge-success">8</span>
                          </a>
                        </li>
                        <li>
                          <a href="mailbox.html">
                            <i className="fa fa-send-o"></i>Sent
                          </a>
                        </li>
                        <li>
                          <a href="mailbox.html">
                            <i className="fa fa-file-text-o"></i>Drafts <span className="badge badge-warning">8</span>
                          </a>
                        </li>
                        <li>
                          <a href="mailbox.html">
                            <i className="fa fa-cloud-upload"></i>Outbox <span className="badge badge-danger">8</span>
                          </a>
                        </li>
                        <li>
                          <a href="mailbox.html">
                            <i className="fa fa-trash-o"></i>Trash
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mail-list-container">
                    <div className="mail-toolbar">
                      <div className="mail-search-bar">
                        <input type="text" className="form-control" placeholder="Search" />
                      </div>
                      <div className="dropdown all-msg-toolbar">
                        <span className="btn btn-info-icon" data-toggle="dropdown">
                          <i className="fa fa-ellipsis-v"></i>
                        </span>
                        <ul className="dropdown-menu">
                          <li>
                            <a href="#">
                              <i className="fa fa-trash-o"></i> Delete
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-arrow-down"></i> Archive
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-clock-o"></i> Snooze
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fa fa-envelope-open"></i> Mark as unread
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="next-prev-btn">
                        <a href="#">
                          <i className="fa fa-angle-left"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                    </div>
                    <div className="mailbox-view">
                      <div className="mailbox-view-title">
                        <h5 className="send-mail-title">Your message title goes here</h5>
                      </div>
                      <div className="send-mail-details">
                        <div className="d-flex">
                          <div className="send-mail-user">
                            <div className="send-mail-user-pic">
                              <img src="assets/images/testimonials/pic3.jpg" alt="" />
                            </div>
                            <div className="send-mail-user-info">
                              <h4>Pavan kumar</h4>
                              <h5>From: example@info.com</h5>
                            </div>
                          </div>
                          <div className="ml-auto send-mail-full-info">
                            <div className="time">
                              <span>10:25 PM</span>
                            </div>
                            <span className="btn btn-info-icon">Reply</span>
                            <div className="dropdown all-msg-toolbar ml-auto">
                              <span className="btn btn-info-icon" data-toggle="dropdown">
                                <i className="fa fa-ellipsis-v"></i>
                              </span>
                              <ul className="dropdown-menu dropdown-menu-right">
                                <li>
                                  <a href="#">
                                    <i className="fa fa-trash-o"></i> Delete
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-arrow-down"></i> Archive
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-clock-o"></i> Snooze
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fa fa-envelope-open"></i> Mark as unread
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="read-content-body">
                          <h5 className="read-content-title">Hi,Ingredia,</h5>
                          <p>
                            <strong>Ingredia Nutrisha,</strong> A collection of textile samples lay spread out on the
                            table - Samsa was a travelling salesman - and above it there hung a picture
                          </p>
                          <p>
                            Even the all-powerful Pointing has no control about the blind texts it is an almost
                            unorthographic life One day however a small line of blind text by the name of Lorem Ipsum
                            decided to leave for the far World of Grammar. Aenean vulputate eleifend tellus. Aenean leo
                            ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in,
                            viverra quis, feugiat a, tellus.
                          </p>
                          <p>
                            Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                            ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                            nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                            augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
                            tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed
                            ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                          </p>

                          <h5 className="read-content-title">Kind Regards</h5>
                          <p className="read-content-name">Mr Smith</p>
                          <hr />
                          <h6>
                            {' '}
                            <i className="fa fa-download m-r5"></i> Attachments <span>(3)</span>
                          </h6>
                          <div className="mailbox-download-file">
                            <a href="#">
                              <i className="fa fa-file-image-o"></i> photo.png
                            </a>
                            <a href="#">
                              <i className="fa fa-file-text-o"></i> dec.text
                            </a>
                            <a href="#">
                              <i className="fa fa-file"></i> video.mkv
                            </a>
                          </div>
                          <hr />
                          <div className="form-group">
                            <h6>Reply Message</h6>
                            <div className="m-b15">
                              <textarea className="form-control"> </textarea>
                            </div>
                            <button className="btn">Reply Now</button>
                          </div>
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

export default MailboxRead
