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

const SubjectSettingAdd = () => {
  const [error, setError] = useState('')
  const [listFilter, setListFilter] = useState({})

  const [result, setResult] = useState({
    subjectCode: '',
    settingTitle: '',
    settingValue: '',
    typeName: '',
    status: '',
    displayOrder: '',
    description: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    subjectSettingListApi
      .getFilter()
      .then((response) => {
        setListFilter(response)
        console.log(response)
      })
      .catch((error) => {
        setError('error')
        console.log(error)
      })
  }

  const handleChangeStatus = () => {}

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
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Title</label>
                            <div>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Value</label>
                            <div>
                              <input className="form-control" type="text" />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Type</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning">{'a'}</CDropdownToggle>
                              <CDropdownMenu className="w-100"></CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Status</label>
                            <div>
                              <Radio.Group onChange={handleChangeStatus} value={1}>
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Inactive</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Display Order</label>
                            <div>
                              <input className="form-control" type="number" />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="col-form-label">Description</label>
                            <div>
                              <textarea className="form-control" type="text" />
                            </div>
                          </div>
                          <ErrorMsg errorMsg={error} />
                          <div className="d-flex">
                            <CButton size="md" color="warning" onClick={() => console.log('')}>
                              Add
                            </CButton>
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

export default SubjectSettingAdd
