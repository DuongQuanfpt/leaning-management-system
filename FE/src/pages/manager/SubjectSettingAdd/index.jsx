import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Modal, Radio, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import {
  CRow,
  CCol,
  CButton,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

import subjectSettingListApi from '~/api/subjectSettingListApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const SubjectSettingAdd = () => {
  const [listFilter, setListFilter] = useState({
    subjectFilter: [],
    typeFilter: [],
    complexity: [],
    quality: [],
  })
  const [error, setError] = useState('')

  const [result, setResult] = useState({
    subjectCode: 'Select Subject Code',
    typeName: {
      title: 'Select Type',
      value: '',
    },
    settingTitle: '',
    settingValue: '',
    status: 0,
    displayOrder: '',
    description: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    setError('')
  }, [result])

  useEffect(() => {
    document.title = 'LMS - Subject Setting Add'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    subjectSettingListApi
      .getFilter()
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        setError('error')
        console.log(error)
      })
  }

  const handleSave = async () => {
    const params = {
      subjectCode: result.subjectCode,
      typeValue: result.typeName.value,
      settingTitle: result.settingTitle,
      settingValue: result.settingValue,
      status: result.status,
      displayOrder: result.displayOrder,
      description: result.description,
    }

    if (result.subjectCode === 'Select Subject Code') {
      setError('You must choose one Subject Code')
      return
    }

    if (result.typeName.value === '') {
      setError('Setting Type must not empty')
      return
    }

    if (result.settingTitle.trim() === '') {
      setError('Setting Title must not empty')
      return
    }

    if (result.settingValue.trim() === '' || String(result.settingValue).trim() === '') {
      setError('Setting Value must not empty')
      return
    }

    if (result.displayOrder === '') {
      setError('Display Order must not empty')
      return
    }

    if (result.typeName.value === 'TYPE_COMPLEXITY' && Number(result.settingValue) > 100) {
      setError('Complexity value must between 0 and 100')
      return
    }

    if (result.typeName.value === 'TYPE_COMPLEXITY' && Number(result.settingValue) < 0) {
      setError('Complexity value must between 0 and 100')
      return
    }

    if (result.typeName.value === 'TYPE_QUALITY' && Number(result.settingValue) < 0) {
      setError('Quality value must higher than 0')
      return
    }

    await subjectSettingListApi
      .addSubject(params)
      .then((response) => {
        setError('You have successfully add new your subject setting detail')
      })
      .catch((error) => {
        console.log(error)
        setError('Something went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new Subject Setting Detail?`,
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
                            <label className="col-form-label">
                              Subject <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning">{result.subjectCode}</CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {listFilter.subjectFilter.map((subject) => (
                                  <CDropdownItem
                                    onClick={() => setResult((prev) => ({ ...prev, subjectCode: subject }))}
                                  >
                                    {subject}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">
                              Subject Setting Type <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning">{result.typeName.title}</CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {listFilter.typeFilter.map((type) => (
                                  <CDropdownItem onClick={() => setResult((prev) => ({ ...prev, typeName: type }))}>
                                    {type.title}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">
                              Subject Setting Title <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                value={result.settingTitle}
                                onChange={(e) => setResult((prev) => ({ ...prev, settingTitle: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">
                              Subject Setting Value <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            {result.typeName.title === 'Subject complexity' && (
                              <div>
                                <input
                                  className="form-control"
                                  type="number"
                                  value={result.settingValue}
                                  onChange={(e) => setResult((prev) => ({ ...prev, settingValue: e.target.value }))}
                                />
                              </div>
                            )}
                            {result.typeName.title === 'Subject quality' && (
                              <div>
                                <input
                                  className="form-control"
                                  type="number"
                                  value={result.settingValue}
                                  onChange={(e) => setResult((prev) => ({ ...prev, settingValue: e.target.value }))}
                                />
                              </div>
                            )}
                            {result.typeName.title !== 'Subject complexity' &&
                              result.typeName.title !== 'Subject quality' && (
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={result.settingValue}
                                    onChange={(e) => setResult((prev) => ({ ...prev, settingValue: e.target.value }))}
                                  />
                                </div>
                              )}
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">
                              Status <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            <div>
                              <Radio.Group
                                onChange={(e) => setResult((prev) => ({ ...prev, status: e.target.value }))}
                                value={result.status}
                              >
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Inactive</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">
                              Display Order <Typography.Text type="danger">*</Typography.Text>
                            </label>
                            <div>
                              <input
                                className="form-control"
                                type="number"
                                value={result.displayOrder}
                                onChange={(e) => setResult((prev) => ({ ...prev, displayOrder: e.target.value }))}
                              />
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="col-form-label">Subject Setting Description</label>
                            <div>
                              <textarea
                                className="form-control"
                                type="text"
                                value={result.description}
                                onChange={(e) => setResult((prev) => ({ ...prev, description: e.target.value }))}
                              />
                            </div>
                          </div>

                          <ErrorMsg
                            errorMsg={error}
                            isError={
                              error === 'You have successfully add new your subject setting detail' ? false : true
                            }
                          />
                          <div className="d-flex">
                            <CButton className="mr-3" size="md" color="warning" onClick={modalConfirm}>
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
