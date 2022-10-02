import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfile } from '~/redux/ProfileSlice/profileSlice'
import Avatar from 'react-avatar-edit'
import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'

import userApi from '~/api/profileApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import avatar from '~/assets/images/profile/pic1.jpg'

const Profile = () => {
  const profileData = useSelector((state) => state.profile)

  const [isEditMode, setIsEditMode] = useState(false)
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')

  const [isAvatarMode, setIsAvatarMode] = useState(false)
  const [src, setSrc] = useState(null)
  const [preview, setPreview] = useState(null)

  const dispatch = useDispatch()
  const currentProfile = useSelector((state) => state.profile)

  useEffect(() => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAvatar = () => {
    setIsAvatarMode(true)
    setPreview(null)
  }

  const handleCropAvatar = (view) => {
    setPreview(view)
    console.log(preview)
  }

  const handleCloseAvatar = () => {
    setPreview(null)
  }

  const handleSaveAvatar = async () => {
    console.log(preview)
    try {
      const data = {
        avatar_url: preview,
      }
      await userApi.updateProfile(data).then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your avatar')
        dispatch(
          setProfile({
            ...currentProfile,
            ...data,
          }),
        )
      })
    } catch (error) {
      setError('Something went wrong, please try again')
      console.log(error)
    }
  }

  const handleBackAvatar = () => {
    setIsAvatarMode(false)
  }

  const handleSaveProfile = async () => {
    if (name?.length < 3) {
      setError('Your name must longer than 3 characters')
      return
    }
    if (mobile?.length < 9 || mobile?.length > 11) {
      setError('Your mobile number must 9-10 characters')
      return
    }
    try {
      const data = {
        fullName: name,
        mobile,
      }
      await userApi.updateProfile(data).then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your password')
        dispatch(
          setProfile({
            ...currentProfile,
            ...data,
          }),
        )
      })
    } catch (error) {
      setError('Something went wrong, please try again')
      console.log(error)
    }
  }

  const handleReset = () => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    setError('')
  }
  const handleCancel = () => {
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    setError('')
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }

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
                              {isAvatarMode ? (
                                <>
                                  {preview && <img src={preview} alt="" className="w-75 mb-5" />}
                                  <Avatar
                                    width={200}
                                    height={200}
                                    imageWidth={200}
                                    onCrop={handleCropAvatar}
                                    onClose={handleCloseAvatar}
                                    src={src}
                                  />
                                  <div className="d-flex pt-4">
                                    <CButton size="md" color="warning" onClick={handleSaveAvatar} className="mr-5">
                                      Save
                                    </CButton>
                                    <CButton size="md" color="warning" onClick={handleBackAvatar} className="mr-5">
                                      Back
                                    </CButton>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <img src={avatar} alt="" className="w-75" />
                                  </div>
                                  <div className="d-flex pt-4">
                                    <CButton size="md" color="warning" onClick={handleAvatar}>
                                      Edit Avatar
                                    </CButton>
                                  </div>
                                </>
                              )}
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
                                    onChange={(e) => setName(e.target.value)}
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
                                    onChange={(e) => setMobile(e.target.value)}
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
                              <ErrorMsg errorMsg={error} />
                              <div className="d-flex justify-content-evenly">
                                {isEditMode ? (
                                  <>
                                    <CButton size="md" color="warning" onClick={handleSaveProfile}>
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
