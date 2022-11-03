import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, DatePicker, Modal, TimePicker } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import scheduleApi from '~/api/scheduleApi'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import ErrorMsg from '~/components/Common/ErrorMsg'
import moment from 'moment/moment'
import { useSelector } from 'react-redux'

const ScheduleAdd = () => {
  const round = (date, duration, method) => {
    return moment(Math[method](+date / +duration) * +duration)
  }

  const currentClass = useSelector((state) => state.profile.currentClass)

  const [listFilter, setListFilter] = useState([])
  const [detail, setDetail] = useState({
    modules: {
      classCode: '',
      slot: '',
      topic: '',
    },
    date: moment(new Date(), 'YYYY-MM-DD'),
    fromTime: round(new Date(), moment.duration(10, 'minutes'), 'floor'),
    toTime: round(new Date(), moment.duration(10, 'minutes'), 'ceil'),
    status: null,
    room: {
      title: 'Select Room',
      value: null,
    },
  })

  const [error, setError] = useState('')

  useEffect(() => {
    scheduleApi
      .getFilter()
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAdd = async () => {
    if (detail.modules.slot.trim() === '') {
      setError('Slot name must not empty')
      return
    }

    if (detail.modules.topic.trim() === '') {
      setError('Topic name must not empty')
      return
    }

    if (detail.room.title === 'Select Room') {
      setError('You must select room')
      return
    }

    const params = {
      clazz: currentClass,
      slot: detail.modules.slot.trim(),
      topic: detail.modules.topic.trim(),
      date: moment(detail.date).format('YYYY-MM-DD'),
      fromTime: moment(detail.fromTime).format('HH:mm:ss'),
      toTime: moment(detail.toTime).format('HH:mm:ss'),
      room: detail.room.value,
    }

    await scheduleApi
      .addSchedule(params)
      .then(() => {
        setError('You have successfully add new schedule detail')
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
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-4 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/schedule-list">Schedule List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Schedule Add</Breadcrumb.Item>
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
                        <input
                          className="form-control"
                          type="text"
                          value={detail.modules.slot}
                          onChange={(e) =>
                            setDetail((prev) => ({ ...prev, modules: { ...prev.modules, slot: e.target.value } }))
                          }
                        />
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
                          />
                        </div>
                      </div>
                      <div className="form-group col-3">
                        <label className="col-form-label">Room</label>
                        <div>
                          <CDropdown className="w-100">
                            <CDropdownToggle color="warning">{detail.room.title}</CDropdownToggle>
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
                            showNow={false}
                            minuteStep={10}
                            secondStep={60}
                            disabledHours={() => range(0, Number(moment(new Date()).format('HH')))}
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
                            showNow={false}
                            minuteStep={10}
                            secondStep={60}
                            disabledHours={() => range(0, Number(moment(detail.fromTime).format('HH')))}
                            allowClear={false}
                            value={detail.toTime}
                            onChange={(time) => setDetail((prev) => ({ ...prev, toTime: time }))}
                          />
                        </div>
                      </div>

                      <ErrorMsg
                        errorMsg={error}
                        isError={error === 'You have successfully add new schedule detail' ? false : true}
                      />
                      <div className="d-flex">
                        <CButton size="md" className="mr-5" color="warning" onClick={modalConfirm}>
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
    </div>
  )
}

export default ScheduleAdd
