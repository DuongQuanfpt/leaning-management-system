import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Breadcrumb, Modal, Radio } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import classSettingListApi from '~/api/classSettingListApi'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import ErrorMsg from '~/components/Common/ErrorMsg'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const ClassSettingDetail = () => {
  const { id } = useParams()
  const { roles } = useSelector((state) => state.profile)

  const [classSettingDetail, setClassSettingDetail] = useState({})
  const [filter, setFilter] = useState({
    issueStatus: [],
    issueType: [],
  })

  const [detail, setDetail] = useState({
    classCode: '',
    typeName: {
      title: '',
      value: '',
    },
    settingTitle: '',
    settingValue: '',
    status: 0,
    displayOrder: 0,
    description: '',
  })
  // eslint-disable-next-line no-unused-vars
  const [role, setRole] = useState({
    isSupporter: false,
    isTrainer: false,
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    loadData()
    if (roles.includes('supporter')) {
      setRole((prev) => ({ ...prev, isSupporter: true }))
    }
    if (roles.includes('trainer')) {
      setRole((prev) => ({ ...prev, isTrainer: true }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await classSettingListApi
      .getDetail(id)
      .then((response) => {
        setClassSettingDetail(response)
        setDetail((prev) => ({
          ...prev,
          classCode: response.classCode,
          typeName: response.typeName,
          settingTitle: response.settingTitle,
          settingValue: response.settingValue,
          status: response.status === 'Active' ? 1 : 0,
          displayOrder: response.displayOrder,
          description: response.description,
        }))
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })

    await classSettingListApi
      .getFilter()
      .then((response) => {
        setFilter(response)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
  }

  const handleCancel = () => {
    setDetail((prev) => ({
      ...prev,
      classCode: classSettingDetail.classCode,
      typeName: classSettingDetail.typeName,
      settingTitle: classSettingDetail.settingTitle,
      settingValue: classSettingDetail.settingValue,
      status: classSettingDetail.status === 'Active' ? 1 : 0,
      displayOrder: classSettingDetail.displayOrder,
      description: classSettingDetail.description,
    }))
    setError('')
    setIsEditMode(false)
  }
  const handleSave = async () => {
    if (detail.settingTitle.trim() === '') {
      setError('Class setting title must not empty')
      return
    }
    if (detail.displayOrder.length === 0) {
      setError('Display Order must not empty')
      return
    }
    if (detail.description.trim() === '') {
      setError('Desription must not empty')
      return
    }
    const params = {
      settingTitle: detail.settingTitle,
      settingValue: detail.settingValue,
      status: detail.status,
      description: detail.description,
      displayOrdeR: detail.displayOrder,
    }
    await classSettingListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your class setting detail')
      })
      .catch((error) => {
        console.log(error)
        setError(error)
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
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-12 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to="/class-setting-list">Class Setting List</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Class Setting Detail</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex ">
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="widget-inner">
                  <div className="row">
                    <div className="form-group col-6">
                      <label className="col-form-label">Code</label>
                      <div>
                        <input className="form-control" type="text" value={detail.classCode} disabled={true} />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Type</label>
                      <div>
                        <input className="form-control" type="text" value={detail.typeName.title} disabled={true} />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Title</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={detail.settingTitle}
                          onChange={(e) => setDetail((prev) => ({ ...prev, settingTitle: e.target.value }))}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Value</label>

                      {detail.typeName.title === 'Issue status' && (
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail.settingValue}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter.issueStatus.map((status) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, settingValue: status }))}>
                                {status}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      )}

                      {detail.typeName.title === 'Issue type' && (
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail.settingValue}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter.issueType.map((type) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, settingValue: type }))}>
                                {type}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      )}
                      {detail.typeName.title !== 'Issue status' && detail.typeName.title !== 'Issue type' && (
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={detail.settingValue}
                            onChange={(e) => setDetail((prev) => ({ ...prev, settingValue: e.target.value }))}
                            disabled={!isEditMode}
                          />
                        </div>
                      )}
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Status</label>
                      <div>
                        <Radio.Group
                          value={detail.status}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, status: e.target.value }))}
                        >
                          <Radio value={1}>Active</Radio>
                          <Radio value={0}>Inactive</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Display Order</label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          value={detail.displayOrder}
                          onChange={(e) => setDetail((prev) => ({ ...prev, displayOrder: e.target.value }))}
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
                          value={detail.description}
                          onChange={(e) => setDetail((prev) => ({ ...prev, description: e.target.value }))}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully changed your class setting detail' ? false : true}
                    />
                    {role.isTrainer && (
                      <div className="d-flex">
                        {isEditMode ? (
                          <>
                            <CButton className="mr-3" size="md" color="warning" onClick={modalConfirm}>
                              Save
                            </CButton>
                            <CButton className="mr-3" size="md" color="warning" onClick={handleCancel}>
                              Cancel
                            </CButton>
                          </>
                        ) : (
                          <>
                            <CButton
                              size="md"
                              color="warning"
                              onClick={() => {
                                setIsEditMode(true)
                                setError('')
                              }}
                            >
                              Edit
                            </CButton>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  )
}

export default ClassSettingDetail
