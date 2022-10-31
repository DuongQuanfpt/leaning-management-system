import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton } from '@coreui/react'

import groupApi from '~/api/groupApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const GroupDetail = () => {
  const { id } = useParams()

  const [defaultDetail, setDefaulDetail] = useState({})
  const [detail, setDetail] = useState({
    groupCode: '',
    topicName: '',
    description: '',
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await groupApi
      .getDetail(id)
      .then((response) => {
        console.log(response)
        setDefaulDetail((prev) => ({ ...prev, ...response, status: response.status === 'Active' ? 1 : 0 }))
        setDetail((prev) => ({ ...prev, ...response, status: response.status === 'Active' ? 1 : 0 }))
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }
  const handleSave = async () => {
    if (detail.groupCode.trim().length === 0) {
      setError('Group name must not empty')
      return
    }

    if (detail.topicName.trim().length === 0) {
      setError('Topic name must not empty')
      return
    }

    const params = {
      groupCode: detail.groupCode.trim(),
      topicName: detail.topicName.trim(),
      description: detail.description.trim(),
    }

    await groupApi
      .changeDetail(id, params)
      .then((response) => {
        setError('You have successfully change your group detail')
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
    }))
    setIsEditMode(false)
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Group Detail?`,
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
                        <Link to="/group-list">Group List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Group Detail</Breadcrumb.Item>
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
                    <div className="form-group col-6">
                      <div>
                        <label className="col-form-label">Group Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={detail.groupCode}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, groupCode: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      <div>
                        <label className="col-form-label">Topic Name</label>
                        <input
                          className="form-control"
                          type="text"
                          value={detail.topicName}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, topicName: e.target.value }))}
                        />
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
                      isError={error === 'You have successfully change your group detail' ? false : true}
                    />
                    <div className="d-flex">
                      {isEditMode ? (
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
    </div>
  )
}

export default GroupDetail
