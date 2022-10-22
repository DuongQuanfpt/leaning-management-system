import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, DatePicker, Modal, Radio } from 'antd'
import moment from 'moment'

import { CButton } from '@coreui/react'

import traineeListApi from '~/api/traineeListApi'

import ErrorMsg from '~/components/Common/ErrorMsg'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const TraineeDetail = () => {
  const { classId, id } = useParams()

  const [traineeDetail, setTraineeDetail] = useState({})
  const [trainee, setTrainee] = useState({
    status: 0,
    dropDate: '',
    note: '',
  })

  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    traineeListApi
      .getDetail(id, classId)
      .then((response) => {
        setTraineeDetail({
          ...response,
          status: response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : -1,
        })
        setTrainee({
          ...response,
          status: response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : -1,
        })
      })
      .catch((error) => console.log(error))
  }

  const handleEdit = () => {
    setError('')
    setIsEditMode(true)
  }
  const handleSave = async () => {
    if (trainee.status !== -1) {
      trainee.dropDate = null
    }
    if (trainee.status === -1 && !!!trainee.dropDate) {
      setError('Dropout date must not empty')
      return
    }
    const params = {
      status: trainee.status,
      dropDate: trainee.dropDate,
      note: trainee.note.trim(),
    }

    await traineeListApi
      .changeDetail(id, classId, params)
      .then((response) => {
        setIsEditMode(false)
        setError('You have successfully changed your trainee detail')
      })
      .catch((error) => {
        console.log(error)
        setError('Something went wrong, please try again')
      })
  }
  const handleCancel = () => {
    setIsEditMode(false)
    setError('')
    setTrainee({
      ...traineeDetail,
      dropDate: moment(traineeDetail.dropDate, 'YYYY-MM-DD'),
    })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to edit this Trainee Detail?`,
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
              <div className="col-12 d-flex">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to="/trainee-list">Trainee List</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Trainee Detail</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
          <div className="col-lg-12 m-b30">
            <div className="col-lg-12 m-b30">
              <div className="widget-box">
                <div className="widget-inner">
                  <div className="row">
                    <div className="form-group col-4">
                      <label className="col-form-label">Class</label>
                      <div>
                        <input className="form-control" type="text" value={trainee.classes} disabled={true} />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Username</label>
                      <div>
                        <input className="form-control" type="text" value={trainee.username} disabled={true} />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Fullname</label>
                      <input className="form-control" type="text" value={trainee.fullName} disabled={true} />
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Status</label>
                      <div>
                        <Radio.Group
                          value={trainee.status}
                          onChange={(e) => {
                            setError('')
                            setTrainee((prev) => ({ ...prev, status: e.target.value }))
                          }}
                          disabled={!isEditMode}
                        >
                          <Radio value={1}>Active</Radio>
                          <Radio value={0}>Inactive</Radio>
                          <Radio value={-1}>Dropout</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                    {trainee.status === -1 && (
                      <div className="form-group col-4">
                        <label className="col-form-label">Dropout Date</label>
                        <div>
                          <DatePicker
                            className="w-100"
                            size={'large'}
                            format={'YYYY-MM-DD'}
                            value={trainee.dropDate ? moment(trainee.dropDate, 'YYYY-MM-DD') : ''}
                            onChange={(dateString) => {
                              setError('')
                              setTrainee((prev) => ({ ...prev, dropDate: dateString }))
                            }}
                            disabled={!isEditMode}
                            allowClear={false}
                          />
                        </div>
                      </div>
                    )}
                    <div className="form-group col-12">
                      <label className="col-form-label">Note</label>
                      <div>
                        <textarea
                          className="form-control"
                          type="text"
                          value={trainee.note}
                          onChange={(e) => {
                            setError('')
                            setTrainee((prev) => ({ ...prev, note: e.target.value }))
                          }}
                          disabled={!isEditMode}
                        />
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully changed your trainee detail' ? false : true}
                    />
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
                        <CButton className="mr-3" size="md" color="warning" onClick={handleEdit}>
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

export default TraineeDetail
