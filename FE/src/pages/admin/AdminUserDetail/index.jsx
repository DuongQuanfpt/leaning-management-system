import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import { Breadcrumb } from 'antd'

import Multiselect from 'multiselect-react-dropdown'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import ErrorMsg from '~/components/Common/ErrorMsg'

import userListApi from '~/api/userListApi'

import avatar from '~/assets/images/profile/pic1.jpg'

const AdminUserDetail = () => {
  const { id } = useParams()

  const [userDetail, setUserDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [roles, setRoles] = useState([])
  const [allRoles, setAllRoles] = useState([])
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    userListApi.getDetail(id).then((response) => {
      setUserDetail(response)
      setRoles(response.roles)
      setNote(response.note)
    })
    userListApi.getFilter().then((response) => {
      setAllRoles(response.roleFilter)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (note?.length === 0 || roles?.length === 0) {
      setError('Roles and Note must not empty!')
      return
    }
    try {
      const rolesData = roles.map((role) => role.value)
      const data = {
        roles: rolesData,
        note,
      }
      await userListApi.changeDetail(id, data).then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your user detail')
      })
    } catch (error) {
      setError('Something went wrong, please try again')
    }
  }

  const handleCancel = () => {
    setRoles(userDetail.roles)
    setNote(userDetail.note == null ? '' : userDetail.note)
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
                      <Breadcrumb>
                        <Breadcrumb.Item>
                          <Link to="/">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                          <Link to="/user-list">User List</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>User Detail</Breadcrumb.Item>
                      </Breadcrumb>
                    </div>
                    <div className="col-lg-12 m-b30">
                      <div className="widget-box">
                        <div className="widget-inner">
                          <div className="row col-12 w-100">
                            <div className="row col-3 h-100">
                              <label className="col-form-label align-middle">Avatar</label>
                              <div>
                                <img src={userDetail.avatar_url ?? avatar} alt="" />
                              </div>
                            </div>
                            <div className="row col-9">
                              <div className="form-group col-6">
                                <label className="col-form-label">ID</label>
                                <div>
                                  <input className="form-control" type="text" value={userDetail.userId} disabled />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Full name</label>
                                <div>
                                  <input className="form-control" type="text" value={userDetail.fullName} disabled />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Email</label>
                                <div>
                                  <input className="form-control" type="text" value={userDetail.email} disabled />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Mobile</label>
                                <div>
                                  <input className="form-control" type="text" value={userDetail.mobile} disabled />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Role</label>
                                <div>
                                  <Multiselect
                                    displayValue="title"
                                    isObject={true}
                                    options={allRoles}
                                    placeholder={''}
                                    emptyRecordMsg={'No role available'}
                                    avoidHighlightFirstOption={true}
                                    showArrow={true}
                                    selectedValues={roles}
                                    onSelect={(e) => setRoles(e)}
                                    onRemove={(e) => setRoles(e)}
                                    showCheckbox
                                    disable={!isEditMode}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">Status</label>
                                <div>
                                  <input className="form-control" type="text" value={userDetail.status} disabled />
                                </div>
                              </div>
                              <div className="form-group col-12">
                                <label className="col-form-label">Note</label>
                                <div>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    disabled={!isEditMode}
                                  />
                                </div>
                              </div>
                              <ErrorMsg errorMsg={error} />
                              <div className="d-flex justify-content-evenly">
                                {isEditMode ? (
                                  <>
                                    <CButton size="md" color="warning" onClick={handleSave}>
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

export default AdminUserDetail
