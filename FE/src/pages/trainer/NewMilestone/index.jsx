/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Breadcrumb, DatePicker, Modal, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import milestoneApi from '~/api/milestoneApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'

const NewMilestone = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const [detail, setDetail] = useState({
    class: {
      classCode: 'Class',
      subjectCode: 'Subject',
    },
    title: '',
    assignment: {
      title: 'Assignment',
      subjectName: 'Subject',
    },
    fromDate: moment().format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    description: '',
  })

  const [listAss, setListAss] = useState([])
  const [listFilter, setListFilter] = useState({
    classFilter: [],
    assFilter: [],
  })

  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - New Milestone'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    await milestoneApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({ ...prev, ...response }))
        setListAss(response.assFilter)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAdd = async () => {
    if (typeof detail.fromDate === 'object') {
      detail.fromDate = detail.fromDate.format('YYYY-MM-DD')
    }
    if (typeof detail.toDate === 'object') {
      detail.toDate = detail.toDate.format('YYYY-MM-DD')
    }
    if (detail.assignment.title === 'Assignment') {
      setError('You must select one Assignment')
      return
    }
    if (detail.title.trim() === '') {
      setError('Title must not empty')
      return
    }
    if (detail.fromDate > detail.toDate) {
      setError('FromDate can not after than ToDate')
      return
    }
    if (detail.description === '') {
      setError('Description must not empty')
      return
    }

    const params = {
      classesCode: currentClass,
      assignmentId: detail.assignment.assId,
      title: detail.title,
      fromDate: detail.fromDate,
      toDate: detail.toDate,
      status: 0,
      description: detail.description,
    }

    await milestoneApi
      .addMilestone(params)
      .then(() => {
        setError('You have successfully add new Milestone')
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.message === 'Assignment already have milestone') {
          setError('Subject Assignment were used already')
          return
        }
        setError('Somthing went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new Milestone?`,
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
                      <Breadcrumb.Item>New Milestone</Breadcrumb.Item>
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
                    <div className="form-group col-12">
                      <label className="col-form-label">
                        Assignment <Typography.Text type="danger">*</Typography.Text>
                      </label>
                      <CDropdown className="w-100">
                        <CDropdownToggle color="warning">{`${detail.assignment.subjectName} - ${detail.assignment.title}`}</CDropdownToggle>
                        <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                          {listFilter.assFilter.map((assignment) => (
                            <CDropdownItem
                              onClick={() => {
                                setDetail((prev) => ({ ...prev, assignment: assignment, title: assignment.title }))
                                console.log(assignment)
                                console.log(detail)
                              }}
                            >
                              {`${assignment.subjectName} - ${assignment.title}`}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </div>

                    <div className="form-group col-12">
                      <label className="col-form-label">
                        Title <Typography.Text type="danger">*</Typography.Text>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={detail.title}
                        onChange={(e) => setDetail((prev) => ({ ...prev, title: e.target.value }))}
                      />
                    </div>

                    <div className="form-group col-6">
                      <label className="col-form-label">
                        From Date <Typography.Text type="danger">*</Typography.Text>
                      </label>
                      <DatePicker
                        className="form-control"
                        value={moment(detail.fromDate, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => setDetail((prev) => ({ ...prev, fromDate: date }))}
                        allowClear={false}
                      />
                    </div>
                    <div className="form-group col-6">
                      <label className="col-form-label">
                        To Date <Typography.Text type="danger">*</Typography.Text>
                      </label>
                      <DatePicker
                        className="form-control"
                        value={moment(detail.toDate, 'YYYY-MM-DD')}
                        onChange={(date, dateString) => setDetail((prev) => ({ ...prev, toDate: date }))}
                        allowClear={false}
                      />
                    </div>

                    <div className="form-group col-12">
                      <label className="col-form-label">
                        Description <Typography.Text type="danger">*</Typography.Text>
                      </label>
                      <div>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          value={detail.description}
                          onChange={(e) => setDetail((prev) => ({ ...prev, description: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully add new Milestone' ? false : true}
                    />
                    <div className="d-flex">
                      <CButton size="md" className="mr-3" color="warning" onClick={modalConfirm}>
                        Add
                      </CButton>
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

export default NewMilestone
