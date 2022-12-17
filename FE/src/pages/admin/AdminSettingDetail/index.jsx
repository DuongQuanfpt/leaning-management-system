/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import { Breadcrumb, Radio, Skeleton, Typography } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import settingListApi from '~/api/settingListApi'

const AdminSettingDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  const [settingDetail, setSettingDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState(0)
  const [order, setOrder] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    document.title = 'LMS - Setting Detail'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    settingListApi
      .getDetail(id)
      .then((response) => {
        setSettingDetail(response)
        setType(response.typeName)
        setTitle(response.settingTitle)
        setValue(response.settingValue)
        setStatus(response.status === 'Active' ? 1 : 0)
        setOrder(response.displayOrder)
        setDescription(response.description)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleSave = async () => {
    if (title.trim() === '') {
      setError('Title must not empty')
      return
    }
    if (value.trim() === '') {
      setError('Value must not empty')
      return
    }
    if (order === '') {
      setError('Display Order must not empty')
      return
    }
    if (Number(order) < 0) {
      setError('Display Order must be positive')
      return
    }
    if (description.trim() === '') {
      setError('Description must not empty')
      return
    }
    const params = {
      settingTitle: title.trim(),
      settingValue: value.trim(),
      status: status,
      description: description.trim(),
      displayOrder: order,
    }

    await settingListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your setting detail')
      })
      .catch((error) => {
        if (error.response.data.message === 'Setting Value already exist') {
          setError('Setting Value already existed')
          return
        }
        setError('Something went wrong, please try again')
      })
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
                <Link to="/setting-list">Setting List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Setting Detail</Breadcrumb.Item>
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
                                <label className="col-form-label h4">Type</label>
                                <div>
                                  <input className="form-control" type="text" value={type} disabled={true} />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label h4">
                                  Title
                                  <Typography.Text type="danger">*</Typography.Text>
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
                                <label className="col-form-label h4">
                                  Value
                                  <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-6">
                                <label className="col-form-label h4">
                                  Status
                                  <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <Radio.Group onChange={handleChangeStatus} value={status}>
                                    <Radio value={1}>Active</Radio>
                                    <Radio value={0}>Inactive</Radio>
                                  </Radio.Group>
                                </div>
                              </div>
                              <div className="form-group col-12">
                                <label className="col-form-label h4">
                                  Display Order
                                  <Typography.Text type="danger">*</Typography.Text>
                                </label>
                                <div>
                                  <input
                                    className="form-control"
                                    type="number"
                                    value={order}
                                    onChange={(e) => setOrder(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="form-group col-12">
                                <label className="col-form-label h4">
                                  Description<Typography.Text type="danger">*</Typography.Text>
                                </label>
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
                                isError={error === 'You have successfully changed your setting detail' ? false : true}
                              />
                              <div className="d-flex">
                                <CButton size="md" className="mr-5" color="warning" onClick={handleSave}>
                                  Save
                                </CButton>
                                <CButton size="md" color="warning" onClick={() => navigateTo('/setting-list')}>
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

export default AdminSettingDetail
