import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Radio } from 'antd'

import {
  CButton,
  CCol,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
} from '@coreui/react'

import subjectSettingListApi from '~/api/subjectSettingListApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectSettingDetail = () => {
  const { id } = useParams()

  const [subjectSettingDetail, setSubjectSettingDetail] = useState({})
  const [listFilter, setListFilter] = useState({
    typeFilter: [],
    statusFilter: [],
  })

  const [type, setType] = useState('')
  const [status, setStatus] = useState({})
  const [description, setDescription] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    subjectSettingListApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({
          ...prev,
          typeFilter: response.typeFilter,
        }))
      })
      .catch((error) => {
        setError(error)
        console.log(error)
      })
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await subjectSettingListApi
      .getDetail(id)
      .then((response) => {
        console.log(response)
        setSubjectSettingDetail(response)
        setType(response.typeName)
        setStatus(response.status === 'Active' ? 1 : 0)
        setDescription(response.description)
      })
      .catch((error) => {
        setError(error)
      })
  }

  const handleChangeStatus = (status) => {
    setStatus((prev) => ({ ...prev, status }))
  }

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="col-lg-12 m-b30">
          <div className="row">
            <div className="col-12 d-flex align-items-center">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/dashboard">Dashboard</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/subject-setting-list">Subject Setting List</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Subject Setting Detail</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
        <div className="col-lg-12 m-b30">
          <h1>{id}</h1>
          <CContainer>
            <CRow>
              <CCol sm="12">
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
                                value={subjectSettingDetail.subjectCode}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Title</label>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                value={subjectSettingDetail.settingTitle}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Value</label>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                value={subjectSettingDetail.settingValue}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Type</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning">{type.title}</CDropdownToggle>
                              <CDropdownMenu className="w-100">
                                {listFilter.typeFilter.map((type) => (
                                  <CDropdownItem onClick={() => setType(type)}>{type.title}</CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Status</label>
                            <div>
                              <Radio.Group onChange={handleChangeStatus} value={1} disabled={!isEditMode}>
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          <ErrorMsg errorMsg={error} />
                          <div className="d-flex">
                            {isEditMode ? (
                              <>
                                <CButton size="md" color="warning" onClick={() => console.log('')}>
                                  Save
                                </CButton>
                                <CButton size="md" color="warning" onClick={() => console.log('')}>
                                  Cancel
                                </CButton>
                              </>
                            ) : (
                              <>
                                <CButton size="md" color="warning" onClick={() => console.log('')}>
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
      <AdminFooter />
    </div>
  )
}

export default SubjectSettingDetail
