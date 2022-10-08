import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import { CContainer, CRow, CCol, CForm, CButton } from '@coreui/react'
import { Breadcrumb } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import settingListApi from '~/api/settingListApi'

const AdminSettingDetail = () => {
  const { id } = useParams()

  const [settingDetail, setSettingDetail] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [order, setOrder] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    settingListApi.getDetail(id).then((response) => {
      console.log(response)
      setSettingDetail(response)
      setTitle(response.settingTitle)
      setOrder(response.displayOrder)
      setDescription(response.description)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave = async () => {
    if (title.length === 0 || order.length === 0) {
      setError('Title and Display Order must not empty!')
      return
    }
    try {
      const data = {
        settingTitle: title,
        displayOrder: order,
        description: description,
      }
      await settingListApi.changeDetail(id, data).then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your setting detail')
      })
    } catch (error) {
      setError('Something went wrong, please try again')
    }
  }

  const handleCancel = () => {
    setTitle(settingDetail.settingTitle)
    setOrder(settingDetail.displayOrder)
    setDescription(settingDetail.description)
    setError('')
    setIsEditMode(false)
  }
  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
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
                        <div className="wc-title">
                          <h4>Setting Detail</h4>
                        </div>
                        <div className="widget-inner">
                          <div className="row">
                            <div className="form-group col-6">
                              <label className="col-form-label">Type</label>
                              <div>
                                <input className="form-control" type="text" value={settingDetail.typeName} disabled />
                              </div>
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
                                  value={settingDetail.settingValue}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Status</label>
                              <div>
                                <input className="form-control" type="text" value={settingDetail.status} disabled />
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
                            <div className="d-flex justify-content-evenly">
                              {isEditMode ? (
                                <>
                                  <CButton size="md" color="warning" onClick={handleSave}>
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
