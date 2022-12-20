import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { CContainer, CRow, CCol, CButton } from '@coreui/react'
import { Breadcrumb, Radio, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import Multiselect from 'multiselect-react-dropdown'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import ErrorMsg from '~/components/Common/ErrorMsg'

import userListApi from '~/api/userListApi'

const AdminUserAdd = () => {
  const [allRoles, setAllRoles] = useState([])

  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState(1)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars

    userListApi.getFilter().then((response) => {
      setAllRoles(response.roleFilter)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    document.title = 'LMS - User Add'
    window.scrollTo(0, 0)
  }, [])

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new User?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleAdd()
      },
      onCancel() {},
    })
  }

  const handleAdd = async () => {
    if (userName.trim() === '') {
      setError('Username must not empty!')
      return
    }
    if (fullName.trim() === '') {
      setError('Fullname must not empty!')
      return
    }
    if (email.trim() === '') {
      setError('Email must not empty!')
      return
    }
    if (
      !email
        .trim()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setError('Email is invalid!')
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
    const rolesData = roles.map((role) => role.value)
    const data = {
      username: userName.trim(),
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      roles: rolesData,
      status: status,
      note: note,
    }
    await userListApi
      .addUser(data)
      .then((response) => {
        setError('You have successfully add new User')
      })
      .catch((error) => {
        if (error.response.data.message === 'Username already exist') {
          setError('Username already existed, please try again')
          return
        }
        if (error.response.data.message === 'Email already exist') {
          setError('Email already existed, please try again')
          return
        }
        setError('Something went wrong, please try again')
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
                <div className="row">
                  <div className="col-lg-12 m-b30">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/user-list">User List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>User Add</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-lg-12 m-b30">
                    <div className="widget-box">
                      <div className="widget-inner">
                        <div className="row col-12 w-100">
                          <div className="row col-12">
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
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Email <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <input
                                  className="form-control"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
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
                            <div className="form-group col-12">
                              <label className="col-form-label">
                                Note <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={note}
                                  onChange={(e) => setNote(e.target.value)}
                                />
                              </div>
                            </div>
                            <ErrorMsg
                              errorMsg={error}
                              isError={error === 'You have successfully add new User' ? false : true}
                            />
                            <div className="d-flex">
                              <CButton className="mr-5" size="md" color="warning" onClick={modalConfirm}>
                                Add
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
      </div>
    </>
  )
}

export default AdminUserAdd
