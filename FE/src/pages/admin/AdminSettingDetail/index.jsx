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
import settingListApi from '~/api/settingListApi'

const AdminSettingDetail = () => {
  const { id } = useParams()

  const [settingDetail, setSettingDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  const [listType, setListType] = useState([])

  const [type, setType] = useState({ title: 'Choose Type', value: '' })
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState(0)
  const [order, setOrder] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    settingListApi.getDetail(id).then((response) => {
      console.log(response)
      setSettingDetail(response)
      setTitle(response.settingTitle)
      setValue(response.settingValue)
      setStatus(response.status === 'Active' ? 1 : 0)
      setOrder(response.displayOrder)
      setDescription(response.description)
    })
    settingListApi.getFilter().then((response) => {
      setListType(response.typeFilter)
    })
  }

  const handleSave = async () => {
    if (type.title === 'Choose Type') {
      setError('You must choose one of any type')
      return
    }
    if (title === '') {
      setError('Title must not empty')
      return
    }
    if (value === '') {
      setError('Value must not empty')
      return
    }
    if (order === '') {
      setError('Display Order must not empty')
      return
    }
    if (description === '') {
      setError('Description must not empty')
      return
    }
    const params = {
      settingTitle: title,
      settingValue: value,
      status: status,
      description: description,
      displayOrder: order,
      typeValue: type.value,
    }

    await settingListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your setting detail')
      })
      .catch((error) => setError('Something went wrong, please try again'))
  }

  const handleCancel = () => {
    setTitle(settingDetail.settingTitle)
    setValue(settingDetail.settingValue)
    setStatus(settingDetail.status === 'Active' ? 1 : 0)
    setOrder(settingDetail.displayOrder)
    setDescription(settingDetail.description)
    setError('')
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }

  const handleChangeType = (type) => {
    setType(type)
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
                <Link to="/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/setting-list">Setting List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Setting Add</Breadcrumb.Item>
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
                              <label className="col-form-label">Type</label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning" disabled={!isEditMode}>
                                  {type.title}
                                </CDropdownToggle>
                                <CDropdownMenu className="w-100">
                                  {listType.map((type) => (
                                    <CDropdownItem onClick={() => handleChangeType(type)}>{type.title}</CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Title</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  disabled={!isEditMode}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Value</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={value}
                                  onChange={(e) => setValue(e.target.value)}
                                  disabled={!isEditMode}
                                />
                              </div>
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
                              <label className="col-form-label">Display Order</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="number"
                                  value={order}
                                  onChange={(e) => setOrder(e.target.value)}
                                  disabled={!isEditMode}
                                />
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

export default AdminSettingDetail
