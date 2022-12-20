/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { Breadcrumb, Radio, Skeleton, Typography } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import subjectListApi from '~/api/subjectListApi'
import { useSelector } from 'react-redux'

const SubjectDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  // eslint-disable-next-line no-unused-vars
  const [subjectDetail, setSubjectDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const [listManager, setListManager] = useState([])
  const [listExpert, setListExpert] = useState([])

  const [manager, setManager] = useState('Select Manager')
  const [expert, setExpert] = useState('Select Expert')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(0)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { roles } = useSelector((state) => state.profile)

  useEffect(() => {
    loadData()
    if (roles.includes('admin')) {
      setIsAdmin(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    document.title = 'LMS - Subject Detail'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    subjectListApi
      .getFilter()
      .then((response) => {
        setListManager(response.managerFilter)
        setListExpert(response.expertFilter)
      })
      .catch((error) => setError('Something went wrong, please try again'))
      .finally(() => setLoading(false))

    subjectListApi
      .getDetail(id)
      .then((response) => {
        setSubjectDetail(response)
        setCode(response.subjectCode)
        setName(response.subjectName)
        setStatus(response.status === 'Active' ? 1 : 0)
        setManager(response.managerUsername)
        setExpert(response.expertUsername)
        setBody(response.body)
      })
      .catch((error) => setError('Something went wrong, please try again'))
      .finally(() => setLoading(false))
  }

  const handleSave = async () => {
    if (code.trim() === '') {
      setError('Subject Code must not empty')
      return
    }
    if (name.trim() === '') {
      setError('Subject Name must not empty')
      return
    }
    if (manager === 'Select Manager') {
      setError('You must select one Manager')
      return
    }
    if (expert === 'Select Expert') {
      setError('You must select one Expert')
      return
    }
    const params = {
      subjectCode: code,
      subjectName: name,
      managerUsername: manager,
      expertUsername: expert,
      subjectStatus: status,
      body: body,
    }

    await subjectListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your subject detail')
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }

  const handleCancel = () => {
    navigateTo('/subject-list')
  }
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
                <Link to="/dashboard">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/subject-list">Subject List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Subject Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <div className="row">
                    <div className="col-lg-12 m-b30">
                      <div className="widget-box">
                        <div className="widget-inner">
                          <Skeleton loading={loading}>
                            <div className="row">
                              <div className="form-group col-6">
                                <label className="col-form-label">
                                  Code <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    disabled={isAdmin ? false : true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">
                                  Name <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isAdmin ? false : true}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">
                                  Manager <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <CDropdown className="w-100">
                                  <CDropdownToggle color="warning" disabled={isAdmin ? false : true}>
                                    {manager}
                                  </CDropdownToggle>
                                  <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                    {listManager.map((manager) => (
                                      <CDropdownItem onClick={() => setManager(manager)}>{manager}</CDropdownItem>
                                    ))}
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">
                                  Expert <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <CDropdown className="w-100">
                                  <CDropdownToggle color="warning">{expert}</CDropdownToggle>
                                  <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                    {listExpert.map((expert) => (
                                      <CDropdownItem onClick={() => setExpert(expert)}>{expert}</CDropdownItem>
                                    ))}
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label">
                                  Status <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <Radio.Group onChange={handleChangeStatus} value={status}>
                                    <Radio value={1}>Active</Radio>
                                    <Radio value={0}>Inactive</Radio>
                                  </Radio.Group>
                                </div>
                              </div>
                              <div className="form-group col-12">
                                <label className="col-form-label">Description</label>
                                <div>
                                  <textarea
                                    className="form-control"
                                    type="text"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                  />
                                </div>
                              </div>
                              <ErrorMsg
                                errorMsg={error}
                                isError={error !== 'You have successfully changed your subject detail'}
                              />
                              <div className="d-flex">
                                <CButton size="md" className="mr-5" color="warning" onClick={handleSave}>
                                  Save
                                </CButton>
                                <CButton size="md" color="warning" onClick={handleCancel}>
                                  Cancel
                                </CButton>
                              </div>
                            </div>
                          </Skeleton>
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

export default SubjectDetail
