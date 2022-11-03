import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment/moment'

import { Breadcrumb, DatePicker, Modal, TimePicker } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import scheduleApi from '~/api/scheduleApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import ErrorMsg from '~/components/Common/ErrorMsg'

const ScheduleDetail = () => {
  const { id } = useParams()

  const [listFilter, setListFilter] = useState([])
  const [defaultDetail, setDefaultDetail] = useState({})
  const [detail, setDetail] = useState({
    modules: {
      classCode: '',
      slot: '',
      topic: '',
    },
    date: moment(new Date(), 'YYYY-MM-DD'),
    fromTime: moment(new Date(), 'HH:mm:ss'),
    toTime: moment(new Date(), 'HH:mm:ss'),
    status: null,
    room: {
      title: '',
      value: null,
    },
  })

  const [error, setError] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    scheduleApi
      .getFilter()
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        console.log(error)
      })
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await scheduleApi
      .getDetail(id)
      .then((response) => {
        setDefaultDetail({
          ...response,
          status: response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : null,
          date: moment(response.date, 'YYYY-MM-DD'),
          fromTime: moment(response.fromTime, 'HH:mm:ss'),
          toTime: moment(response.toTime, 'HH:mm:ss'),
        })
        setDetail({
          ...response,
          status: response.status === 'Active' ? 1 : response.status === 'Inactive' ? 0 : null,
          date: moment(response.date, 'YYYY-MM-DD'),
          fromTime: moment(response.fromTime, 'HH:mm:ss'),
          toTime: moment(response.toTime, 'HH:mm:ss'),
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setError('')
  }

  const handleSave = async () => {
    const params = {
      slot: detail.modules.slot,
      topic: detail.modules.topic.trim(),
      date: moment(detail.date).format('YYYY-MM-DD'),
      fromTime: moment(detail.fromTime).format('HH:mm:ss'),
      toTime: moment(detail.toTime).format('HH:mm:ss'),
      room: detail.room.value,
    }

    await scheduleApi
      .changeDetail(id, params)
      .then(() => {
        setError('You have successfully changed your schedule detail')
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message === 'Room already have slots, cannot assign!') {
          setError("You can't assign this Room at this time because already have slots assigned")
          return
        }
        if (error.response.data.message === 'From Time must before To Time') {
          setError('Time From must before Time To')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const handleCancel = () => {
    setDetail((prev) => ({ ...prev, ...defaultDetail }))
    setError('')
    setIsEditMode(false)
  }

  const range = (start, end) => {
    const arr = []
    let i = start
    while (i < end) {
      arr.push(i)
      i++
    }
    return arr
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Schedule Detail?`,
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
                        <Link to="/schedule-list">Schedule List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Schedule Detail</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="widget-box">
                  <div className="widget-inner">
                    <div className="row">
                      <div className="form-group col-6">
                        <label className="col-form-label">Slot</label>
                        <input className="form-control" type="text" value={detail.modules.slot} disabled={true} />
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">Topic</label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={detail.modules.topic}
                            onChange={(e) =>
                              setDetail((prev) => ({ ...prev, modules: { ...prev.modules, topic: e.target.value } }))
                            }
                            disabled={!isEditMode}
                          />
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label className="col-form-label">Room</label>
                        <div>
                          <CDropdown className="w-100">
                            <CDropdownToggle disabled={!isEditMode} color="warning">
                              {detail.room.title}
                            </CDropdownToggle>
                            <CDropdownMenu style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}>
                              {listFilter?.roomFilter?.map((room) => (
                                <CDropdownItem
                                  value={room}
                                  onClick={() => setDetail((prev) => ({ ...prev, room: room }))}
                                >
                                  {room.title}
                                </CDropdownItem>
                              ))}
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label className="col-form-label">Date</label>
                        <div>
                          <DatePicker
                            className="w-100"
                            size={'large'}
                            disabled={!isEditMode}
                            format={'YYYY-MM-DD'}
                            allowClear={false}
                            disabledDate={(current) => current && current < moment().startOf('day')}
                            value={detail.date}
                            onChange={(date) => setDetail((prev) => ({ ...prev, date: date }))}
                          />
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label className="col-form-label">From</label>
                        <div>
                          <TimePicker
                            className="w-100"
                            size={'large'}
                            disabled={!isEditMode}
                            showNow={false}
                            minuteStep={10}
                            secondStep={60}
                            allowClear={false}
                            value={detail.fromTime}
                            onChange={(time) => setDetail((prev) => ({ ...prev, fromTime: time }))}
                          />
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label className="col-form-label">To</label>
                        <div>
                          <TimePicker
                            className="w-100"
                            size={'large'}
                            disabled={!isEditMode}
                            showNow={false}
                            minuteStep={10}
                            secondStep={60}
                            disabledHours={() => range(0, Number(moment(detail.fromTime).format('HH')))}
                            disabledMinutes={() => {}}
                            allowClear={false}
                            value={detail.toTime}
                            onChange={(time) => setDetail((prev) => ({ ...prev, toTime: time }))}
                          />
                        </div>
                      </div>

                      <ErrorMsg
                        errorMsg={error}
                        isError={error === 'You have successfully changed your schedule detail' ? false : true}
                      />
                      <div className="d-flex">
                        {isEditMode ? (
                          <>
                            <CButton size="md" className="mr-5" color="warning" onClick={modalConfirm}>
                              Save
                            </CButton>
                            <CButton size="md" color="warning" onClick={handleCancel}>
                              Cancel
                            </CButton>
                          </>
                        ) : (
                          <>
                            <CButton size="md" color="warning" onClick={handleEdit}>
                              Edit
                            </CButton>
                          </>
                        )}
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
    </div>
  )
}

export default ScheduleDetail
