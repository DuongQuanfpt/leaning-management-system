import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, DatePicker, Modal, Radio } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton } from '@coreui/react'

import milestoneApi from '~/api/milestoneApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const MilestoneDetail = () => {
  const { id } = useParams()

  const [defaultDetail, setDefaulDetail] = useState({})
  const [detail, setDetail] = useState({
    classesCode: '',
    title: '',
    assignment: {
      title: '',
    },
    fromDate: '',
    toDate: '',
    status: -1,
    description: '',
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await milestoneApi
      .getDetail(id)
      .then((response) => {
        console.log(response)
        setDetail({
          ...response,
          status: response.status === 'Open' ? 1 : response.status === 'In_Progress' ? 0 : -1,
        })
        setDefaulDetail({
          ...response,
          status: response.status === 'Open' ? 1 : response.status === 'In_Progress' ? 0 : -1,
        })
      })
      .catch((error) => {
        console.log(error)
        setError('Something went wrong, please try again')
      })
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }
  const handleSave = async () => {
    if (typeof detail.fromDate === 'object') {
      detail.fromDate = detail.fromDate.format('YYYY-MM-DD')
    }

    if (typeof detail.toDate === 'object') {
      detail.toDate = detail.toDate.format('YYYY-MM-DD')
    }

    if (detail.fromDate > detail.toDate) {
      setError('FromDate can not after than ToDate')
      return
    }
    if (detail.title.trim() === '') {
      setError('Title must not empty')
      return
    }
    if (detail.description.trim() === '') {
      setError('Description must not empty')
      return
    }

    const params = {
      title: detail.title.trim(),
      fromDate: detail.fromDate,
      toDate: detail.toDate,
      status: detail.status,
      description: detail.description.trim(),
    }

    await milestoneApi
      .changeDetail(id, params)
      .then((response) => {
        setError('You have successfully change your milestone detail')
        setIsEditMode(false)
      })
      .catch((error) => {
        console.log(error)
        setError('Somthing went wrong, please try again')
      })
  }
  const handleCancel = () => {
    setDetail((prev) => ({
      ...prev,
      ...defaultDetail,
    }))
    setIsEditMode(false)
    setError('')
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Milestone detail?`,
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
          <div className="col-lg-12 ">
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/milestone-list">Milestone List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Milestone Detail</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex ">
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="widget-inner">
                  <div className="row">
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Class</label>
                        <input className="form-control" type="text" value={detail.classesCode} disabled />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Title</label>
                      <input
                        className="form-control"
                        type="text"
                        value={detail.title}
                        onChange={(e) => setDetail((prev) => ({ ...prev, title: e.target.value }))}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Assignment</label>
                      <input className="form-control" type="text" value={detail.assignment.title} disabled />
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">From Date</label>
                      <DatePicker
                        className="form-control"
                        value={moment(detail.fromDate, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => setDetail((prev) => ({ ...prev, fromDate: date }))}
                        allowClear={false}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">To Date</label>
                      <DatePicker
                        className="form-control"
                        value={moment(detail.toDate, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => setDetail((prev) => ({ ...prev, toDate: date }))}
                        allowClear={false}
                        disabled={!isEditMode}
                      />
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Status</label>
                      <div>
                        <Radio.Group value={detail.status} disabled>
                          <Radio value={1}>Open</Radio>
                          <Radio value={0}>In_Progress</Radio>
                          <Radio value={-1}>Closed</Radio>
                        </Radio.Group>
                      </div>
                    </div>

                    <div className="form-group col-12">
                      <label className="col-form-label">Description</label>
                      <div>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          value={detail.description}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, description: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully change your milestone detail' ? false : true}
                    />
                    <div className="d-flex">
                      {detail.status !== -1 &&
                        detail.status !== 0 &&
                        (isEditMode ? (
                          <>
                            <CButton size="md" className="mr-3" color="warning" onClick={modalConfirm}>
                              Save
                            </CButton>
                            <CButton size="md" className="mr-3" color="warning" onClick={handleCancel}>
                              Cancel
                            </CButton>
                          </>
                        ) : (
                          <CButton size="md" className="mr-3" color="warning" onClick={handleEdit}>
                            Edit
                          </CButton>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default MilestoneDetail
