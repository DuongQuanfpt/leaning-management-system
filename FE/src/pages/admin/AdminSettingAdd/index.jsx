import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Radio, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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
import { Breadcrumb } from 'antd'

import ErrorMsg from '~/components/Common/ErrorMsg'
import settingListApi from '~/api/settingListApi'

const AdminSettingAdd = () => {
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
  }, [])

  const loadData = async () => {
    settingListApi.getFilter().then((response) => {
      setListType(response.typeFilter)
    })
  }

  const handleChangeType = (type) => {
    setType(type)
  }

  const handleAdd = async () => {
    if (type.title === 'Choose Type') {
      setError('You must choose one of any type')
      return
    }
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
      typeValue: type.value,
    }

    await settingListApi
      .addSetting(params)
      .then((response) => {
        setError('Add new setting successfully')
      })
      .catch((error) => {
        if (error.response.data.message === 'Setting Value already exist') {
          setError('Setting Value already existed')
          return
        }
        setError('Something went wrong, please try again later')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new Setting?`,
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
                              <div>
                                <CDropdown className="w-100">
                                  <CDropdownToggle color="warning">{type.title}</CDropdownToggle>
                                  <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                    {listType.map((type) => (
                                      <CDropdownItem onClick={() => handleChangeType(type)}>{type.title}</CDropdownItem>
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
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
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
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Status</label>
                              <div>
                                <Radio.Group onChange={handleChangeStatus} value={status}>
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
                                />
                              </div>
                            </div>
                            <ErrorMsg
                              errorMsg={error}
                              isError={error === 'Add new setting successfully' ? false : true}
                            />
                            <div className="d-flex">
                              <CButton size="md" color="warning" onClick={modalConfirm}>
                                Add
                              </CButton>
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

export default AdminSettingAdd
