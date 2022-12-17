import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
import { Breadcrumb, Radio, Modal, Skeleton, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import classListApi from '~/api/classListApi'

import ErrorMsg from '~/components/Common/ErrorMsg'

const ClassAdd = () => {
  const [list, setList] = useState({
    subject: [],
    term: [],
    branch: [],
    trainer: [],
    supporter: [],
    status: [],
  })

  const [object, setObject] = useState({
    classes: '',
    subject: 'Select Subject',
    term: {
      title: 'Select Term',
      value: '',
    },
    branch: {
      title: 'Select Branch',
      value: '',
    },
    trainer: 'Select Trainer',
    supporter: 'Select Supporter',
    status: 0,
    description: '',
    error: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    document.title = 'LMS - Class Add'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    classListApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setList({
          ...list,
          subject: response.subjectFilterAdd,
          term: response.terms,
          branch: response.branches,
          trainer: response.trainerFilter,
          supporter: response.supporterFilter,
          status: response.statusFilter,
        })
      })
      .catch((error) => setObject({ ...object, error: 'Something went wrong, please try again' }))
      .finally(() => setLoading(false))
  }

  const handleAdd = async () => {
    if (object.classes.trim() === '') {
      setObject((prev) => ({ ...prev, error: 'Class code must not empty' }))
      return
    }
    if (object.subject === 'Select Subject') {
      setObject((prev) => ({ ...prev, error: 'You must select one Subject' }))
      return
    }
    if (object.term.title === 'Select Term') {
      setObject((prev) => ({ ...prev, error: 'You must select one Term' }))
      return
    }
    if (object.branch.title === 'Select Branch') {
      setObject((prev) => ({ ...prev, error: 'You must select one Branch' }))
      return
    }
    if (object.trainer === 'Select Trainer') {
      setObject((prev) => ({ ...prev, error: 'You must select one Trainer' }))
      return
    }
    if (object.supporter === 'Select Supporter') {
      setObject((prev) => ({ ...prev, error: 'You must select one Supporter' }))
      return
    }
    if (object.description === '') {
      setObject((prev) => ({ ...prev, error: 'Description must not empty' }))
      return
    }
    const params = {
      code: object.classes.trim(),
      subjectCode: object.subject,
      term: object.term.value,
      branch: object.branch.value,
      supporter: object.supporter,
      trainer: object.trainer,
      status: object.status,
      description: object.description,
    }

    console.log(params)

    await classListApi
      .addClass(params)
      .then((response) => {
        setObject((prev) => ({ ...prev, error: 'You have successfully add new class' }))
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

  const modalConfirm = () => {
    setObject({ ...object, error: '' })
    Modal.confirm({
      title: `Are you want to add new Class?`,
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
              <Breadcrumb.Item>Class Add</Breadcrumb.Item>
            </Breadcrumb>
          </div>
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
                                Class <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={object.classes}
                                  onChange={(e) => setObject((prev) => ({ ...prev, classes: e.target.value }))}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Subject <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{object.subject}</CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {list.subject.map((item) => (
                                    <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, subject: item }))}>
                                      {item}
                                    </CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Term <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{object.term.title}</CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {list.term.map((item) => (
                                    <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, term: item }))}>
                                      {item.title}
                                    </CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Branch <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{object.branch.title}</CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {list.branch.map((item) => (
                                    <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, branch: item }))}>
                                      {item.title}
                                    </CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Trainer <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{object.trainer}</CDropdownToggle>
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
                              <label className="col-form-label">
                                Supporter <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{object.supporter}</CDropdownToggle>
                                <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                  {list.supporter.map((item) => (
                                    <CDropdownItem onClick={() => setObject((prev) => ({ ...prev, supporter: item }))}>
                                      {item}
                                    </CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">
                                Status <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <Radio.Group
                                  value={object.status}
                                  onChange={(e) => {
                                    setObject((prev) => ({ ...prev, status: e.target.value }))
                                  }}
                                >
                                  <Radio value={1}>Active</Radio>
                                  <Radio value={0}>Inactive</Radio>
                                  <Radio value={-1}>Closed</Radio>
                                </Radio.Group>
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label className="col-form-label">
                                Description <Typography.Text type="danger">*</Typography.Text>
                              </label>
                              <div>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={object.description}
                                  onChange={(e) => setObject((prev) => ({ ...prev, description: e.target.value }))}
                                />
                              </div>
                            </div>
                            <>
                              <ErrorMsg
                                errorMsg={object.error}
                                isError={object.error === 'You have successfully add new class' ? false : true}
                              />
                              <div className="d-flex">
                                <CButton size="md" className="mr-5" color="warning" onClick={modalConfirm}>
                                  Add
                                </CButton>
                              </div>
                            </>
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
    </>
  )
}

export default ClassAdd
