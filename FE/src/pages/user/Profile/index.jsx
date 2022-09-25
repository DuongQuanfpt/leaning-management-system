import React from 'react'
import { useSelector } from 'react-redux'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import avatar from '~/assets/images/profile/pic1.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {
  const profileData = useSelector((state) => state.profile)

  const [isEditMode, setIsEditMode] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')

  useEffect(() => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAvatar = () => {}
  const handleSave = () => {}
  const handleReset = () => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
  }
  const handleCancel = () => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setIsEditMode(true)
  }
  console.log(profileData)
  return (
    <>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <div className="row">
                    <div className="col-lg-12 m-b30">
                      <div className="widget-box">
                        <div className="wc-title">
                          <h4>Profile</h4>
                        </div>
                        <div className="widget-inner">
                          <div className="row col-12 w-100">
                            <div className="row col-3 h-100">
                              <label className="col-form-label align-middle">Avatar</label>
                              <div>
                                <img src={profileData.avatar_url === '' ? avatar : profileData.avatar_url} alt="" />
                              </div>
                              <div className="d-flex pt-4">
                                <CButton size="md" color="warning" onClick={handleAvatar}>
                                  Edit Avatar
                                </CButton>
                              </div>
                            </div>
                            <div className="row col-9">
                              <div className="form-group col-6">
                                <label className="col-form-label">ID</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={profileData.userId}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Full name</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    disabled={!isEditMode}
                                    onEdit={(e) => setName(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Email</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={profileData.email}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Mobile</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={mobile}
                                    disabled={!isEditMode}
                                    onEdit={(e) => setMobile(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Role</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={profileData.roles.join(' / ')}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Status</label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={profileData.status}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-12">
                                <label className="col-form-label">Note</label>
                                <div>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    value={profileData.note}
                                    disabled={true}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-evenly">
                                {isEditMode ? (
                                  <>
                                    <CButton size="md" color="warning" onClick={handleSave}>
                                      Save
                                    </CButton>
                                    <CButton size="md" color="warning" onClick={handleReset}>
                                      Reset
                                    </CButton>
                                    <CButton size="md" color="warning" onClick={handleCancel}>
                                      Cancel
                                    </CButton>
                                  </>
                                ) : (
                                  <>
                                    <CButton size="md" color="warning" onClick={handleEdit}>
                                      Edit profile
                                    </CButton>
                                    <Link to="/change-password">
                                      <CButton size="md" color="danger">
                                        Change Password
                                      </CButton>
                                    </Link>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    </>
  )
}

export default Profile
