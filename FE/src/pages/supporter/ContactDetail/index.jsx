import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { Breadcrumb, Radio } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import settingListApi from '~/api/settingListApi'
import webContactApi from '~/api/webContactApi'

const ContactDetail = () => {
  const { id } = useParams()

  const [contactDetail, setContactDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  const [listSupporter, setListSupporter] = useState([])

  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState(0)
  const [message, setMessage] = useState('')
  const [supporter, setSupporter] = useState('')
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    webContactApi.getDetail(id).then((response) => {
      console.log(response)
      setContactDetail(response)
      setCategory(response.categoryName)
      setName(response.fullName)
      setEmail(response.email)
      setMobile(response.mobile)
      setMessage(response.message)
      setSupporter(response.staffName)
      setStatus(response.status === 'OPEN' ? 1 : 0)
      setResponse(response.response)
    })
  }

  const handleSave = async () => {
    const params = {}

    console.log(params)

    await settingListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your setting detail')
      })
      .catch((error) => {
        if (error.response.data.message === 'Setting Value already exist') {
          setError('Setting Value already existed')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const handleCancel = () => {
    setCategory(contactDetail.categoryName)
    setName(contactDetail.fullName)
    setEmail(contactDetail.email)
    setMobile(contactDetail.mobile)
    setMessage(contactDetail.message)
    setSupporter(contactDetail.staffName)
    setStatus(contactDetail.status)
    setResponse(contactDetail.response)
    setError('')
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }

  const handleChangeSupporter = () => {}

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  return (
    <>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/contact-list">Contact List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Contact Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <div className="row">
                  <div className="col-lg-12 m-b30">
                    <div className="widget-box">
                      <div className="widget-inner">
                        <div className="row">
                          <div className="form-group col-3">
                            <label className="col-form-label">Category</label>
                            <input className="form-control" type="text" value={category} disabled={true} />
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Fullname</label>
                            <div>
                              <input className="form-control" type="text" value={name} disabled={true} />
                            </div>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Email</label>
                            <div>
                              <input className="form-control" type="text" value={email} disabled={true} />
                            </div>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Mobile</label>
                            <div>
                              <input className="form-control" type="text" value={mobile} disabled={true} />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="col-form-label">Message</label>
                            <div>
                              <textarea className="form-control" type="text" value={message} disabled={true} />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Supporter</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning" disabled={!isEditMode}>
                                {supporter}
                              </CDropdownToggle>
                              <CDropdownMenu className="w-100">
                                {/* {listSupporter.map((supporter) => (
                                  <CDropdownItem onClick={() => handleChangeSupporter(supporter)}>
                                    {supporter.title}
                                  </CDropdownItem>
                                ))} */}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Status</label>
                            <div>
                              <Radio.Group onChange={handleChangeStatus} value={status} disabled={!isEditMode}>
                                <Radio value={1}>Open</Radio>
                                <Radio value={0}>Close</Radio>
                              </Radio.Group>
                            </div>
                          </div>

                          <div className="form-group col-12">
                            <label className="col-form-label">Response</label>
                            <div>
                              <textarea className="form-control" type="text" value={response} disabled={!isEditMode} />
                            </div>
                          </div>
                          <ErrorMsg errorMsg={error} />
                          <div className="d-flex">
                            {isEditMode ? (
                              <>
                                <CButton size="md" className="mr-5" color="warning" onClick={handleSave}>
                                  Save
                                </CButton>
                                <CButton size="md" color="warning" onClick={handleCancel}>
                                  Cancel
                                </CButton>
                              </>
                            ) : (
                              <>
                                <CButton size="md" color="warning" onClick={handleEdit}>
                                  Edit
                                </CButton>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    </>
  )
}

export default ContactDetail
