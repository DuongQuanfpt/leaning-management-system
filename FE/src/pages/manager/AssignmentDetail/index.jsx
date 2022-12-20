/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Modal, Radio, Skeleton, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton } from '@coreui/react'

import assignmentApi from '~/api/assignmentApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AssignmentDetail = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

  const [defaultDetail, setDefaulDetail] = useState({})
  const [detail, setDetail] = useState({
    subjectName: '',
    title: '',
    assBody: '',
    eval_weight: '',
    isOnGoing: 1,
    isTeamWork: 0,
    isFinal: 0,
    status: 0,
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - Assignment Detail'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    await assignmentApi
      .getDetail(id)
      .then((response) => {
        console.log(response)
        setDefaulDetail(response)
        setDetail((prev) => ({
          ...prev,
          ...response,
          eval_weight: Number(response.eval_weight.slice(0, -1)),
          status: response.status === 'Active' ? 1 : 0,
        }))
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
      .finally(() => setLoading(false))
  }

  const handleSave = async () => {
    if (detail.title.trim() === '') {
      setError('Assignment title must not empty')
      return
    }

    if (detail.assBody.trim() === '') {
      setError('Assignment body must not empty')
      return
    }

    if (detail.eval_weight === '') {
      setError('Evaluation weight must not empty')
      return
    }

    if (detail.eval_weight < 0 || detail.eval_weight > 100) {
      setError('Evaluation weight must between 0 and 100')
      return
    }

    const params = {
      title: detail.title.trim(),
      assBody: detail.assBody.trim(),
      eval_weight: detail.eval_weight + '%',
      isOnGoing: detail.isOnGoing,
      isTeamWork: detail.isTeamWork,
      isFinal: detail.isFinal,
      status: detail.status,
    }

    await assignmentApi
      .changeDetail(id, params)
      .then((response) => {
        setError('You have successfully change your assignment detail')
        setIsEditMode(false)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }
  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Assignment Detail?`,
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
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/assignment-list">Assignment List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Assignment Detail</Breadcrumb.Item>
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
                  <Skeleton loading={loading}>
                    <div className="row">
                      <div className="form-group col-6">
                        <label className="col-form-label">Subject </label>
                        <div>
                          <input className="form-control" type="text" value={detail.subjectName} disabled={true} />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">
                          Evaluation Weight (%) <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            value={detail.eval_weight}
                            onChange={(e) => setDetail((prev) => ({ ...prev, eval_weight: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          />
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label className="col-form-label">
                          Assignment Title <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={detail.title}
                            onChange={(e) => setDetail((prev) => ({ ...prev, title: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          />
                        </div>
                      </div>

                      <div className="form-group col-4">
                        <label className="col-form-label">
                          Status <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <Radio.Group
                            value={detail.status}
                            onChange={(e) => setDetail((prev) => ({ ...prev, status: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          >
                            <Radio value={1}>Active</Radio>
                            <Radio value={0}>Inactive</Radio>
                          </Radio.Group>
                        </div>
                      </div>

                      <div className="form-group col-4">
                        <label className="col-form-label">
                          Teamwork Assignment? <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <Radio.Group
                            value={detail.isTeamWork}
                            onChange={(e) => setDetail((prev) => ({ ...prev, isTeamWork: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">
                          Final Assignment? <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <Radio.Group
                            value={detail.isFinal}
                            onChange={(e) => setDetail((prev) => ({ ...prev, isFinal: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label className="col-form-label">
                          Body <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <textarea
                            name="message"
                            rows="4"
                            className="form-control"
                            required
                            value={detail.assBody}
                            onChange={(e) => setDetail((prev) => ({ ...prev, assBody: e.target.value }))}
                            disabled={detail.isOnGoing !== 0}
                          ></textarea>
                        </div>
                      </div>
                      <ErrorMsg
                        errorMsg={error}
                        isError={error === 'You have successfully change your assignment detail' ? false : true}
                      />
                      {detail.isOnGoing === 0 ? (
                        <div className="d-flex">
                          <CButton size="md" className="mr-3" color="warning" onClick={modalConfirm}>
                            Save
                          </CButton>
                          <CButton
                            size="md"
                            className="mr-3"
                            color="warning"
                            onClick={() => navigateTo('/assignment-list')}
                          >
                            Cancel
                          </CButton>
                        </div>
                      ) : null}
                    </div>
                  </Skeleton>
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

export default AssignmentDetail
