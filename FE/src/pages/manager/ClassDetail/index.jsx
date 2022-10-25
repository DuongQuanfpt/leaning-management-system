import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { Breadcrumb, Radio, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import ErrorMsg from '~/components/Common/ErrorMsg'

const ClassDetail = () => {
  const { id } = useParams()
  const { roles } = useSelector((state) => state.profile)

  const [defaultClass, setDefaultClass] = useState({})
  const [list, setList] = useState({
    term: [],
    branch: [],
    trainer: [],
    supporter: [],
    status: [],
  })

  const [object, setObject] = useState({
    classes: '',
    subject: '',
    term: {},
    branch: {},
    trainer: '',
    supporter: '',
    status: 0,
    description: '',
    error: '',
  })

  const [role, setRole] = useState({
    isManager: false,
    isSupporter: false,
    isTrainer: false,
  })
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    loadData()

    if (roles.includes('manager')) {
      setRole((prev) => ({ ...prev, isManager: true }))
      return
    }
    if (roles.includes('supporter')) {
      setRole((prev) => ({ ...prev, isSupporter: true }))
      return
    }
    if (roles.includes('trainer')) {
      setRole((prev) => ({ ...prev, isTrainer: true }))
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    classListApi
      .getFilter()
      .then((response) => {
        setList((prev) => ({
          ...prev,
          term: response.terms,
          branch: response.branches,
          trainer: response.trainerFilter,
          supporter: response.supporterFilter,
          status: response.statusFilter,
        }))
      })
      .catch((error) => setObject({ ...object, error: 'Something went wrong when fetch filter, please try again' }))

    classListApi
      .getDetail(id)
      .then((response) => {
        setDefaultClass(response)
        setObject((prev) => ({
          ...prev,
          classes: response.code,
          subject: response.subjectCode,
          term: response.term,
          branch: response.branch,
          trainer: response.trainer,
          supporter: response.supporter,
          status: response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : -1,
          description: response.description,
        }))
      })
      .catch((error) => setObject({ ...object, error: 'Something went wrong when fetch detail, please try again' }))
  }

  const handleSave = async () => {
    if (object.classes === '') {
      setObject((prev) => ({ ...prev, error: 'Class code must not empty' }))
      return
    }
    const params = {
      code: object.classes,
      term: object.term.value,
      branch: object.branch.value,
      supporter: object.supporter,
      trainer: object.trainer,
      status: object.status,
      description: object.description,
    }

    console.log(params)

    await classListApi
      .changeDetail(id, params)
      .then((response) => {
        setIsEditMode(false)
        setObject((prev) => ({ ...prev, error: 'You have successfully changed your class detail' }))
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message === 'Class name already exist') {
          setObject((prev) => ({ ...prev, error: 'Class name already existed' }))
          return
        }
        setObject((prev) => ({ ...prev, error: 'Something went wrong, please try again' }))
      })
  }

  const handleCancel = () => {
    setObject((prev) => ({
      ...prev,
      classes: defaultClass.code,
      subject: defaultClass.subjectCode,
      term: defaultClass.term,
      branch: defaultClass.branch,
      trainer: defaultClass.trainer,
      supporter: defaultClass.supporter,
      status: defaultClass.status === 'Active' ? 1 : defaultClass.status === 'Inactive' ? 0 : -1,
      description: defaultClass.description,
    }))
    setIsEditMode(false)
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setObject({ ...object, error: '' })
  }

  const modalConfirm = () => {
    setObject({ ...object, error: '' })
    Modal.confirm({
      title: `Are you want to save new Class Detail?`,
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
                <Link to="/class-list">Class List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Class Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <div className="row">
                  <div className="col-lg-12 m-b30">
                    <div className="widget-box">
                      <div className="widget-inner">
                        <div className="row">
                          <div className="form-group col-6">
                            <label className="col-form-label">Class</label>
                            <div>
                              <input
                                className="form-control"
                                type="text"
                                value={object.classes}
                                onChange={(e) => setObject((prev) => ({ ...prev, classes: e.target.value }))}
                                disabled={role.isManager ? !isEditMode : true}
                              />
                            </div>
                          </div>
                          <div className="form-group col-6">
                            <label className="col-form-label">Subject</label>
                            <div>
                              <input className="form-control" type="text" value={object.subject} disabled={true} />
                            </div>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Term</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning" disabled={role.isManager ? !isEditMode : true}>
                                {object.term.title}
                              </CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {list.term.map((item) => (
                                  <CDropdownItem
                                    onClick={() =>
                                      setObject((prev) => ({ ...prev, term: { ...prev.term, title: item.title } }))
                                    }
                                  >
                                    {item.title}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Branch</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning" disabled={role.isManager ? !isEditMode : true}>
                                {object.branch.title}
                              </CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {list.branch.map((item) => (
                                  <CDropdownItem
                                    onClick={() =>
                                      setObject((prev) => ({ ...prev, branch: { ...prev.branch, title: item.title } }))
                                    }
                                  >
                                    {item.title}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Supporter</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning" disabled={role.isManager ? !isEditMode : true}>
                                {object.supporter}
                              </CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {list.supporter.map((item) => (
                                  <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, supporter: item }))}>
                                    {item}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                          <div className="form-group col-3">
                            <label className="col-form-label">Trainer</label>
                            <CDropdown className="w-100">
                              <CDropdownToggle
                                color="warning"
                                disabled={role.isSupporter || role.isManager ? !isEditMode : true}
                              >
                                {object.trainer}
                              </CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {list.trainer.map((item) => (
                                  <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, trainer: item }))}>
                                    {item}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>

                          <div className="form-group col-6">
                            <label className="col-form-label">Status</label>
                            <div>
                              <Radio.Group
                                value={object.status}
                                onChange={(e) => {
                                  setObject((prev) => ({ ...prev, status: e.target.value }))
                                }}
                                disabled={role.isSupporter || role.isManager ? !isEditMode : true}
                              >
                                <Radio value={1}>Active</Radio>
                                <Radio value={0}>Inactive</Radio>
                                <Radio value={-1}>Closed</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                          <div className="form-group col-12">
                            <label className="col-form-label">Description</label>
                            <div>
                              <textarea
                                className="form-control"
                                type="text"
                                value={object.description}
                                onChange={(e) => setObject((prev) => ({ ...prev, description: e.target.value }))}
                                disabled={role.isSupporter || role.isManager ? !isEditMode : true}
                              />
                            </div>
                          </div>
                          <ErrorMsg
                            errorMsg={object.error}
                            isError={object.error === 'You have successfully changed your class detail' ? false : true}
                          />
                          {role.isTrainer ? null : (
                            <div className="d-flex">
                              {isEditMode ? (
                                <>
                                  <CButton size="md" className="mr-5" color="warning" onClick={modalConfirm}>
                                    Save
                                  </CButton>
                                  <CButton size="md" className="mr-5" color="warning" onClick={handleCancel}>
                                    Cancel
                                  </CButton>
                                </>
                              ) : (
                                <CButton size="md" className="mr-5" color="warning" onClick={handleEdit}>
                                  Edit
                                </CButton>
                              )}
                            </div>
                          )}
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
    </>
  )
}

export default ClassDetail
