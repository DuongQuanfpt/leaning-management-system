import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

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
import { Breadcrumb, Radio } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import subjectListApi from '~/api/subjectListApi'
import { useSelector } from 'react-redux'

const SubjectDetail = () => {
  const { id } = useParams()

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

  const { roles } = useSelector((state) => state.profile)

  useEffect(() => {
    loadData()
    if (roles.includes('admin')) {
      setIsAdmin(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    subjectListApi
      .getFilter()
      .then((response) => {
        setListManager(response.managerFilter)
        setListExpert(response.expertFilter)
      })
      .catch((error) => setError('Something went wrong, please try again'))

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
  }

  const handleSave = async () => {
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
    setError('')
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setError('')
    setIsEditMode(true)
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
                          <div className="row">
                            <div className="form-group col-6">
                              <label className="col-form-label">Code</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  disabled={isAdmin ? !isEditMode : true}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Name</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  disabled={isAdmin ? !isEditMode : true}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Manager</label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning" disabled={isAdmin ? !isEditMode : true}>
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
                              <label className="col-form-label">Expert</label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning" disabled={!isEditMode}>
                                  {expert}
                                </CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {listExpert.map((expert) => (
                                    <CDropdownItem onClick={() => setExpert(expert)}>{expert}</CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Status</label>
                              <div>
                                <Radio.Group onChange={handleChangeStatus} value={status} disabled={!isEditMode}>
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
                                  disabled={!isEditMode}
                                />
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
