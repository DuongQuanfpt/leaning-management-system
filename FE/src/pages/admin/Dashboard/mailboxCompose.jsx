import HeaderDashboard from '~/components/Header/headerDashboard'
import Sidebar from '~/components/Header/sidebar'

const MailboxCompose = () => {
  return (
    <>
      <HeaderDashboard />
      <Sidebar />
      <div className="ttr-wrapper">
        <div className="container-fluid">
          <div className="db-breadcrumb">
            <h4 className="breadcrumb-title">Compose</h4>
            <ul className="db-breadcrumb-list">
              <li>
                <a href="#">
                  <i className="fa fa-home"></i>Home
                </a>
              </li>
              <li>Compose</li>
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
                    <form className="mail-compose">
                      <div className="form-group col-12">
                        <input className="form-control" type="email" placeholder="To" />
                      </div>
                      <div className="form-group col-12">
                        <input className="form-control" type="email" placeholder="CC" />
                      </div>
                      <div className="form-group col-12">
                        <input className="form-control" type="text" placeholder="Subject" />
                      </div>
                      <div className="form-group col-12">
                        <div className="summernote">
                          <p>Hello World</p>
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <input
                          type="file"
                          accept=".xlsx,.xls,image/*,.doc,audio/*,.docx,video/*,.ppt,.pptx,.txt,.pdf"
                          multiple
                        />
                      </div>
                      <div className="form-group col-12">
                        <button type="submit" className="btn btn-lg">
                          Send
                        </button>
                      </div>
                    </form>
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

export default MailboxCompose
