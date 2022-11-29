import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Modal, Radio } from 'antd'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import classSettingListApi from '~/api/classSettingListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import ErrorMsg from '~/components/Common/ErrorMsg'

const ClassSettingAdd = () => {
  const [filter, setFilter] = useState({
    classFilter: [],
    issueStatus: [],
    issueType: [],
    typeFilter: [],
  })

  const [detail, setDetail] = useState({
    classCode: 'Select Class',
    typeName: {
      title: 'Select Type',
      value: '',
    },
    settingTitle: '',
    settingValue: '',
    status: 0,
    displayOrder: 0,
    description: '',
  })

  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    if (detail.typeName.title === 'Issue type' || detail.typeName.title === 'Issue status') {
      setDetail((prev) => ({ ...prev, settingValue: 'Select Value' }))
    } else {
      setDetail((prev) => ({ ...prev, settingValue: '' }))
    }
  }, [detail.typeName.title])

  const loadData = async () => {
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

  const handleAdd = async () => {
    if (detail.classCode === 'Select Class') {
      setError('You must select one Class')
      return
    }
    if (detail.typeName.title === 'Select Type') {
      setError('You must select one Type')
      return
    }
    if (detail.settingTitle.trim() === '') {
      setError('Setting title must not empty')
      return
    }
    if (detail.settingValue === '' || detail.settingValue === 'Select Value') {
      setError('Setting value must not empty')
      return
    }
    if (detail.displayOrder === '') {
      setError('Display order must not empty')
      return
    }

    const params = {
      classCode: detail.classCode,
      typeValue: detail.typeName.value,
      settingTitle: detail.settingTitle.trim(),
      settingValue: detail.settingValue,
      status: detail.status,
      displayOrder: detail.displayOrder,
      description: detail.description.trim(),
    }

    await classSettingListApi
      .addClass(params)
      .then((response) => {
        setError('You have successfully add new your class setting detail')
      })
      .catch((error) => {
        console.log(error)
        setError('Somthing went wrong, please try again')
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
        handleAdd()
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
                  <Breadcrumb.Item>Class Setting Add</Breadcrumb.Item>
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
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning">{detail.classCode}</CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter.classFilter.map((classes) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, classCode: classes }))}>
                                {classes}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Type</label>
                      <div>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning">{detail.typeName.title}</CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter.typeFilter.map((type) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, typeName: type }))}>
                                {type.title}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
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
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Value</label>

                      {detail.typeName.title === 'Issue status' && (
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning">{detail.settingValue}</CDropdownToggle>
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
                          <CDropdownToggle color="warning">{detail.settingValue}</CDropdownToggle>
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
                          />
                        </div>
                      )}
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">Status</label>
                      <div>
                        <Radio.Group
                          value={detail.status}
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
                        />
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully add new your class setting detail' ? false : true}
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
        </div>
      </div>
      <AdminFooter />
    </div>
  )
}

export default ClassSettingAdd
