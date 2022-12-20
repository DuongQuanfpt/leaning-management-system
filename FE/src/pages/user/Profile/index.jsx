import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from 'react-avatar-edit'
import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'

import userApi from '~/api/profileApi'
import { setProfile } from '~/redux/ProfileSlice/profileSlice'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import avatar from '~/assets/images/profile/pic1.jpg'
import { Modal } from 'antd'

const Profile = () => {
  const profileData = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  const [isEditMode, setIsEditMode] = useState(false)
  const [userName, setUserName] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  const [isAvatarMode, setIsAvatarMode] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [src, setSrc] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    setUserName(profileData.username)
    setName(profileData.fullName)
    setMobile(profileData.mobile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - User Profile'
    window.scrollTo(0, 0)
  }, [])

  const handleAvatar = () => {
    setOpen(true)
    return
  }

  const handleCropAvatar = (view) => {
    setPreview(view)
  }

  const handleCloseAvatar = () => {
    setPreview(null)
  }

  const handleSaveAvatar = async () => {
    setLoading(true)
    const params = {
      avatarBase64: preview,
    }
    await userApi
      .updateProfile(params, token)
      .then((response) => {
        console.log(response)
        setIsEditMode(false)
        dispatch(setProfile({ ...profileData, avatar_url: response.avatar_url }))
        setError('You have successfully changed your avatar, refresh page to see you changed!')
        window.location.reload(true)
      })
      .catch((error) => {
        console.log(error)
        setError('Change avatar failed, please try again')
      })
      .finally(() => {
        setLoading(false)
        setOpen(false)
      })
  }

  const handleBackAvatar = () => {
    setIsAvatarMode(false)
    setError('')
  }

  const handleSaveProfile = async () => {
    if (userName?.length < 3) {
      setError('Your user name must longer than 3 characters')
      return
    }
    if (name?.length < 3) {
      setError('Your full name must longer than 3 characters')
      return
    }
    if (mobile?.length < 9 || mobile?.length > 11) {
      setError('Your mobile number must 10-11 characters')
      return
    }
    const data = {
      username: userName,
      fullName: name,
      mobile,
    }
    await userApi
      .updateProfile(data, token)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your profile!')
        console.log(response)
        console.log(profileData)
        dispatch(
          setProfile({
            ...profileData,
            avatar_url: response.avatar_url,
            username: response.username,
            fullName: response.fullName,
            mobile: response.mobile,
          }),
        )
      })
      .catch((error) => {
        console.log(error)
        //Note
        if (error.response.data.messsage === 'User name already exist') {
          setError('Username already existed')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const handleReset = () => {
    console.log(profileData)
    setUserName(profileData.username)
    setName(profileData.fullName)
    setMobile(profileData.mobile ?? '')
    setError('')
  }

  const handleCancel = () => {
    handleReset()
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
                          <h4>User Profile</h4>
                        </div>
                        <div className="widget-inner">
                          <div className="row col-12 w-100">
                            <div className="row col-3 h-100">
                              <label className="col-form-label align-middle">Avatar</label>
                              <div>
                                {isAvatarMode ? (
                                  <>
                                    <img
                                      src={preview ?? profileData.avatar_url}
                                      alt=""
                                      className="w-75 mb-2 rounded-circle"
                                    />
                                    <div className="d-flex pt-4">
                                      <CButton size="md" color="warning" onClick={handleSaveAvatar} className="mr-5">
                                        Save
                                      </CButton>
                                      <CButton size="md" color="warning" onClick={handleBackAvatar} className="mr-5">
                                        Back
                                      </CButton>
                                    </div>
                                    <ErrorMsg errorMsg={error} />
                                  </>
                                ) : (
                                  <>
                                    <img
                                      src={!!profileData.avatar_url === true ? profileData.avatar_url : avatar}
                                      alt=""
                                      className="w-75 mb-2 rounded-circle"
                                    />
                                    <div className="d-flex pt-4">
                                      <CButton size="md" color="warning" onClick={handleAvatar}>
                                        Edit Avatar
                                      </CButton>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {isAvatarMode ? (
                              <div className="row col-9 justify-content-center">
                                <Avatar
                                  width="100%"
                                  height={400}
                                  imageWidth="100%"
                                  onCrop={handleCropAvatar}
                                  onClose={handleCloseAvatar}
                                  src={src}
                                />
                              </div>
                            ) : (
                              <div className="row col-9">
                                <div className="form-group col-6">
                                  <label className="col-form-label">Username</label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={userName}
                                      onChange={(e) => setUserName(e.target.value)}
                                      disabled={!isEditMode}
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-6">
                                  <label className="col-form-label">Fullname</label>
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
                                      type="number"
                                      value={mobile}
                                      disabled={!isEditMode}
                                      onChange={(e) => setMobile(e.target.value)}
                                    />
                                  </div>
                                </div>
                                <div className="form-group col-12">
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
                                <ErrorMsg
                                  errorMsg={error}
                                  isError={
                                    error !== 'You have successfully changed your profile!' &&
                                    error !==
                                      'You have successfully changed your avatar, refresh page to see you changed!'
                                  }
                                />
                                <div className="d-flex">
                                  {isEditMode ? (
                                    <>
                                      <CButton size="md" className="mr-3" color="warning" onClick={handleSaveProfile}>
                                        Save
                                      </CButton>
                                      <CButton size="md" className="mr-3" color="warning" onClick={handleReset}>
                                        Reset
                                      </CButton>
                                      <CButton size="md" className="mr-3" color="warning" onClick={handleCancel}>
                                        Cancel
                                      </CButton>
                                    </>
                                  ) : (
                                    <>
                                      <CButton size="md" className="mr-3" color="warning" onClick={handleEdit}>
                                        Edit profile
                                      </CButton>
                                      <Link to="/change-password">
                                        <CButton size="md" className="mr-3" color="danger">
                                          Change Password
                                        </CButton>
                                      </Link>
                                    </>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <Modal
                          title="Upload Avatar"
                          open={open}
                          onOk={() => {
                            handleSaveAvatar()
                            // setOpen(false)
                            // navigateTo(0)
                          }}
                          onCancel={() => {
                            setOpen(false)
                          }}
                          confirmLoading={loading}
                        >
                          <Avatar
                            width={'100%'}
                            height={400}
                            imageWidth={400}
                            onCrop={handleCropAvatar}
                            onClose={handleCloseAvatar}
                            src={src}
                          />
                        </Modal>
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
