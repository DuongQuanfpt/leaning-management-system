/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import { Breadcrumb, Radio, Modal, Typography, Skeleton } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import Multiselect from 'multiselect-react-dropdown'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import ErrorMsg from '~/components/Common/ErrorMsg'

import userListApi from '~/api/userListApi'

import avatar from '~/assets/images/profile/pic1.jpg'

const AdminUserDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  const [userDetail, setUserDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [roles, setRoles] = useState([])
  const [allRoles, setAllRoles] = useState([])
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'LMS - User Detail'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    setLoading(true)
    userListApi
      .getDetail(id)
      .then((response) => {
        setUserDetail(response)
        setUserName(response.username)
        setFullName(response.fullName == null ? '' : response.fullName)
        setMobile(response.mobile == null ? '' : response.mobile)
        setRoles(response.roles)
        setStatus(response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : -1)
        setNote(response.note)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
    userListApi
      .getFilter()
      .then((response) => {
        setAllRoles(response.roleFilter)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    const rolesData = roles.map((role) => role.value)
    if (userName === '') {
      setError('Username must not empty!')
      return
    }
    if (mobile === '') {
      setError('Mobile must not empty!')
      return
    }
    if (mobile.length < 9 || mobile.length > 11) {
      setError('Mobile length must 10-11 characters!')
      return
    }
    if (roles.length === 0) {
      setError('Role must not empty!')
      return
    }
    const data = {
      username: userName.trim(),
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      roles: rolesData,
      status: status,
      note,
    }
    await userListApi
      .changeDetail(id, data)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your user detail')
      })
      .catch((error) => {
        if (error.response.data.message === 'Username already exist') {
          setError('Username already existed')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new information?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleSave()
      },
      onCancel() {},
    })
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
                          <Link to="/dashboard">Dashboard</Link>
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
                                <img
                                  className="w-75 mb-2 rounded-circle"
                                  src={!!userDetail.avatar_url === true ? userDetail.avatar_url : avatar}
                                  alt=""
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null // prevents looping
                                    currentTarget.src = { avatar }
                                  }}
                                />
                              </div>
                            </div>
                            <div className="row col-9">
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">
                                    Username <Typography.Text type="danger">*</Typography.Text>
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={userName}
                                      onChange={(e) => setUserName(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">
                                    Full name <Typography.Text type="danger">*</Typography.Text>
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={fullName}
                                      onChange={(e) => setFullName(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">Email</label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={userDetail.email}
                                      disabled={true}
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">
                                    Mobile <Typography.Text type="danger">*</Typography.Text>
                                  </label>
                                  <div>
                                    <input
                                      className="form-control"
                                      type="number"
                                      value={mobile}
                                      onChange={(e) => setMobile(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">
                                    Role <Typography.Text type="danger">*</Typography.Text>
                                  </label>
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
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-6">
                                  <label className="col-form-label">
                                    Status <Typography.Text type="danger">*</Typography.Text>
                                  </label>
                                  <div>
                                    <Radio.Group onChange={handleChangeStatus} value={status}>
                                      <Radio value={1}>Active</Radio>
                                      <Radio value={0}>Inactive</Radio>
                                      <Radio value={-1}>Unverified</Radio>
                                    </Radio.Group>
                                  </div>
                                </div>
                              </Skeleton>
                              <Skeleton loading={loading}>
                                <div className="form-group col-12">
                                  <label className="col-form-label">Note </label>
                                  <div>
                                    <textarea
                                      className="form-control"
                                      type="text"
                                      value={note}
                                      onChange={(e) => setNote(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </Skeleton>
                              <ErrorMsg
                                errorMsg={error}
                                isError={error === 'You have successfully changed your user detail' ? false : true}
                              />

                              <div className="d-flex">
                                <CButton className="mr-5" size="md" color="warning" onClick={modalConfirm}>
                                  Save
                                </CButton>
                                <CButton size="md" color="warning" onClick={() => navigateTo('/user-list')}>
                                  Cancel
                                </CButton>
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
