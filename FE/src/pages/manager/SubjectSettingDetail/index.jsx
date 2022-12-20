/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Breadcrumb, Modal, Radio, Skeleton, Typography } from 'antd'

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
import { ExclamationCircleOutlined } from '@ant-design/icons'

const SubjectSettingDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  const [subjectSettingDetail, setSubjectSettingDetail] = useState({})
  const [listFilter, setListFilter] = useState({
    typeFilter: [],
    complexity: [],
    quality: [],
  })

  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState({})
  const [description, setDescription] = useState('')

  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    subjectSettingListApi
      .getFilter()
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        setError(error)
        console.log(error)
      })
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - Subject Setting Detail'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    await subjectSettingListApi
      .getDetail(id)
      .then((response) => {
        console.log(response)
        setSubjectSettingDetail(response)
        setType(response.typeName)
        setTitle(response.settingTitle)
        setValue(response.settingValue)
        setStatus(response.status === 'Active' ? 1 : 0)
        setDescription(response.description)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setLoading(false))
  }

  const handleSave = async () => {
    const params = {
      subjectCode: subjectSettingDetail.subjectCode,
      typeName: subjectSettingDetail.typeName.value,
      settingTitle: title,
      settingValue: value,
      status: status,
      description: description,
    }

    if (title.trim() === '') {
      setError('Setting Title must not empty')
      return
    }

    if (value.trim() === '' || String(value).trim() === '') {
      setError('Setting Value must not empty')
      return
    }

    if (subjectSettingDetail.typeName.value === 'TYPE_COMPLEXITY' && Number(value) > 100) {
      setError('Complexity value must between 0 and 100')
      return
    }

    if (subjectSettingDetail.typeName.value === 'TYPE_COMPLEXITY' && Number(value) < 0) {
      setError('Complexity value must between 0 and 100')
      return
    }

    if (subjectSettingDetail.typeName.value === 'TYPE_QUALITY' && Number(value) < 0) {
      setError('Quality value must higher than 0')
      return
    }

    await subjectSettingListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your subject setting detail')
      })
      .catch((error) => {
        console.log(error)
        setError('Something went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to edit this Subject Setting Detail?`,
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
                        <Skeleton loading={loading}>
                          <div className="row">
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Subject <Typography.Text type="danger">*</Typography.Text>
                              </label>
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
                              <label className="col-form-label">
                                Subject Setting Type <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning" disabled>
                                  {type.title}
                                </CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {listFilter.typeFilter.map((type) => (
                                    <CDropdownItem onClick={() => setType(type)}>{type.title}</CDropdownItem>
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
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Subject Setting Value <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              {type.title === 'Subject complexity' && (
                                <input
                                  className="form-control"
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(e.target.value)}
                                />
                              )}
                              {type.title === 'Subject quality' && (
                                <input
                                  className="form-control"
                                  type="number"
                                  value={value}
                                  onChange={(e) => setValue(e.target.value)}
                                />
                              )}
                              {type.title !== 'Subject complexity' && type.title !== 'Subject quality' && (
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                  />
                                </div>
                              )}
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Status <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <Radio.Group onChange={(e) => setStatus(e.target.value)} value={status}>
                                  <Radio value={1}>Active</Radio>
                                  <Radio value={0}>Inactive</Radio>
                                </Radio.Group>
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label className="col-form-label">Subject Setting Description </label>
                              <div>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                              </div>
                            </div>
                            <ErrorMsg
                              errorMsg={error}
                              isError={
                                error === 'You have successfully changed your subject setting detail' ? false : true
                              }
                            />
                            <div className="d-flex">
                              <CButton className="mr-3" size="md" color="warning" onClick={modalConfirm}>
                                Save
                              </CButton>
                              <CButton
                                className="mr-3"
                                size="md"
                                color="warning"
                                onClick={() => navigateTo('/subject-setting-list')}
                              >
                                Cancel
                              </CButton>
                            </div>
                          </div>
                        </Skeleton>
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
