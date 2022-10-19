import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { CContainer, CRow, CCol, CButton } from '@coreui/react'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import ErrorMsg from '~/components/Common/ErrorMsg'
import { useSelector } from 'react-redux'

const AdminChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [error, setError] = useState('')

  const currentAccessToken = useSelector((state) => state.auth.token)

  const handleReset = () => {
    setOldPassword('')
    setNewPassword('')
    setConfirmNewPassword('')
    setError('')
  }

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New Password and Verify New Password must same')
      return
    }
    if (oldPassword.length === 0 || newPassword.length === 0 || confirmNewPassword.length === 0) {
      setError('Password must not empty')
      return
    }
    if (newPassword.length < 6 || confirmNewPassword.length < 6) {
      setError('Password length must longer than 6 characters')
      return
    }
    const accessToken = currentAccessToken
    try {
      const data = {
        oldPassword,
        newPassword,
      }
      const response = await axios.put('https://lms-app-1.herokuapp.com/user/update-pass', data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      if (response.status === 200) {
        setError('You have successfully changed your password')
        return
      }
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        setError('Check your password again please')
        return
      }
    }
  }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer>
            <CRow>
              <CCol sm="12">
                <div className="row">
                  <div className="col-lg-12 m-b30">
                    <div className="widget-box">
                      <div className="wc-title">
                        <h4>Change Password</h4>
                      </div>
                      <div className="widget-inner">
                        <div className="row col-12 w-100">
                          <div className="row col-6">
                            <div className="form-group col-12">
                              <label className="col-form-label">Current Password</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="password"
                                  onChange={(e) => setOldPassword(e.target.value)}
                                  value={oldPassword}
                                />
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label className="col-form-label">New Password</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="password"
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  value={newPassword}
                                />
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label className="col-form-label">Verify</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="password"
                                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                                  value={confirmNewPassword}
                                />
                              </div>
                            </div>
                            <ErrorMsg
                              errorMsg={error}
                              isError={error === 'You have successfully changed your password' ? false : true}
                            />
                            <div className="d-flex justify-content-start">
                              <CButton size="md" color="warning" onClick={handleSubmit} className="mr-3">
                                Submit
                              </CButton>
                              <CButton size="md" color="warning" onClick={handleReset}>
                                Reset
                              </CButton>
                            </div>
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
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminChangePassword
