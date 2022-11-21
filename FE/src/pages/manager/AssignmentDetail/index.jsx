import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Modal, Radio } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton } from '@coreui/react'

import assignmentApi from '~/api/assignmentApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AssignmentDetail = () => {
  const { id } = useParams()

  const [defaultDetail, setDefaulDetail] = useState({})
  const [detail, setDetail] = useState({
    subjectName: '',
    title: '',
    assBody: '',
    eval_weight: '',
    isOnGoing: 0,
    isTeamWork: 0,
    isFinal: 0,
    status: 0,
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
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
  }

  const handleEdit = () => {
    setIsEditMode(true)
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
  const handleCancel = () => {
    setDetail((prev) => ({
      ...prev,
      ...defaultDetail,
      eval_weight: Number(defaultDetail.eval_weight.slice(0, -1)),
      status: defaultDetail.status === 'Active' ? 1 : 0,
    }))
    setIsEditMode(false)
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
          <div className="col-lg-12 m-b30">
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
                  <div className="row">
                    <div className="form-group col-4">
                      <label className="col-form-label">Subject</label>
                      <div>
                        <input className="form-control" type="text" value={detail.subjectName} disabled={true} />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Title</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={detail.title}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Evaluation Weight (%)</label>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          value={detail.eval_weight}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, eval_weight: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group col-3">
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
                    <div className="form-group col-3">
                      <label className="col-form-label">Is Ongoing</label>
                      <div>
                        <Radio.Group value={detail.isOnGoing} disabled>
                          <Radio value={1}>Yes</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="form-group col-3">
                      <label className="col-form-label">Is Teamwork</label>
                      <div>
                        <Radio.Group
                          value={detail.isTeamWork}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, isTeamWork: e.target.value }))}
                        >
                          <Radio value={1}>Yes</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="form-group col-3">
                      <label className="col-form-label">Is Final</label>
                      <div>
                        <Radio.Group
                          value={detail.isFinal}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, isFinal: e.target.value }))}
                        >
                          <Radio value={1}>Yes</Radio>
                          <Radio value={0}>No</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <label className="col-form-label">Body</label>
                      <div>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          value={detail.assBody}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, assBody: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully change your assignment detail' ? false : true}
                    />
                    <div className="d-flex">
                      {defaultDetail.isOnGoing !== 1 &&
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

export default AssignmentDetail
