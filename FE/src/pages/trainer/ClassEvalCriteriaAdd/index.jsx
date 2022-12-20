/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, Modal, Radio, Segmented, Skeleton, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import classEvalCriteriaApi from '~/api/classEvalCriteriaApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'

const ClassEvalCriteriaAdd = () => {
  const { id } = useParams()
  const { currentClass } = useSelector((state) => state.profile)
  const [detail, setDetail] = useState({
    milestone: 'Select Milestone',
    criteriaName: '',
    assignment: '',
    expectedWork: 0,
    description: '',
    evalWeight: 0,
    isTeamEval: 0,
    isWorkEval: 0,
    status: 0,
  })
  const [listFilter, setListFilter] = useState({
    assignmentFilter: [],
    milestoneFilter: [],
  })
  const [listEval, setListEval] = useState([])

  const [currentClone, setCurrentClone] = useState('Subject - Milestone - Assignment - Class Eval Criteria')
  const [mode, setMode] = useState('Add New')
  const [error, setError] = useState('')
  const [clone, setClone] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (id) {
      setLoading(true)
      classEvalCriteriaApi
        .getDetail(id)
        .then((response) => {
          console.log(response)
          setDetail((prev) => ({
            ...prev,
            ...response,
            evalWeight: Number(response.evalWeight),
            status: response.status === 'Active' ? 1 : 0,
          }))
        })
        .catch((error) => {
          setError('Something went wrong, please try again')
        })
        .finally(() => setLoading(false))
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setCurrentClone('Subject - Milestone - Assignment - Class Eval Criteria')
    setDetail({
      milestone: { title: 'Select Milestone' },
      criteriaName: '',
      assignment: {
        assId: '',
        title: 'Title',
        subjectName: 'Subject',
      },
      expectedWork: '',
      description: '',
      evalWeight: '',
      isTeamEval: 0,
      isWorkEval: 0,
      status: 0,
    })
    setError('')
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, currentClass])

  useEffect(() => {
    document.title = 'LMS - Class Eval Criteria Add'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    await classEvalCriteriaApi
      .getPage({ filterClass: currentClass })
      .then((response) => {
        setListEval(response.listResult)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
      .finally(() => setLoading(false))

    await classEvalCriteriaApi
      .getFilter({ classCode: currentClass })
      .then((response) => {
        setListFilter((prev) => ({
          ...prev,
          assignmentFilter: response.assignmentFilter,
          milestoneFilter: response.milestoneFilter,
        }))
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
      .finally(() => setLoading(false))
  }

  const handleAdd = async () => {
    if (detail.milestone.title === 'Select Milestone') {
      setError('You must select one Milestone')
      return
    }
    if (detail.assignment.title === 'Assignment') {
      setError('You must select one Assignment')
      return
    }
    if (detail.criteriaName.trim() === '') {
      setError('Eval criteria name must not empty')
      return
    }
    if (!detail.evalWeight) {
      setError('Evaluation weight must not empty')
      return
    }
    if (detail.evalWeight < 0 || detail.evalWeight > 100) {
      setError('Evaluation weight must between 0 and 100')
      return
    }
    if (!detail.expectedWork) {
      setError('Expected Work must not empty')
      return
    }
    if (detail.expectedWork < 0) {
      setError('Expected Work must be positive')
      return
    }
    if (detail.description.trim() === '') {
      setError('Description must not empty')
      return
    }

    const params = {
      milestoneId: detail.milestone.milestoneId,
      assignmentId: detail.assignment.assId,
      criteriaName: detail.criteriaName.trim(),
      assignment: detail.assignment.title.trim(),
      evalWeight: detail.evalWeight + '%',
      expectedWork: detail.expectedWork,
      isTeamEval: detail.isTeamEval,
      isWorkEval: detail.isWorkEval,
      status: detail.status,
      description: detail.description,
    }

    await classEvalCriteriaApi
      .addClassCriteria(params)
      .then(() => {
        setError('You have successfully add new eval criteria detail')
      })
      .catch((error) => {
        if (error.response.data.message === 'Assignment of this eval already got eval is work eval') {
          setError('One assignment only have one evaluation is work evaluated')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Eval Criteria Detail?`,
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
                        <Link to="/class-criteria-list">Class Eval Criteria List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Class Eval Criteria {id ? 'Clone' : 'Add'}</Breadcrumb.Item>
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
                      {id ? (
                        <div className="form-group col-12">
                          <label className="col-form-label">
                            Milestone <Typography.Text type="danger">*</Typography.Text>
                          </label>
                          <div>
                            <input
                              className="form-control"
                              type="text"
                              value={`${detail?.milestone.milestoneTitle}`}
                              disabled
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="form-group col-12">
                          <label className="col-form-label">
                            Milestone <Typography.Text type="danger">*</Typography.Text>
                          </label>
                          <div>
                            <CDropdown className="w-100">
                              <CDropdownToggle color="warning">{`${detail.milestone.title}`}</CDropdownToggle>
                              <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                                {listFilter?.milestoneFilter?.map((milestone) => (
                                  <CDropdownItem
                                    onClick={() => {
                                      console.log(detail)
                                      setDetail((prev) => ({
                                        ...prev,
                                        milestone: milestone,
                                        assignment: milestone.assignment,
                                      }))
                                    }}
                                  >
                                    {milestone.title}
                                  </CDropdownItem>
                                ))}
                              </CDropdownMenu>
                            </CDropdown>
                          </div>
                        </div>
                      )}
                      <div className="form-group col-12">
                        <label className="col-form-label">
                          Assignment <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={`${detail.assignment.subjectName} - ${detail.assignment.title}`}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="form-group col-12">
                        <label className="col-form-label">
                          Eval Criteria Name <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={detail.criteriaName}
                            onChange={(e) => setDetail((prev) => ({ ...prev, criteriaName: e.target.value }))}
                          />
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
                            value={detail.evalWeight}
                            onChange={(e) => setDetail((prev) => ({ ...prev, evalWeight: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-group col-6">
                        <label className="col-form-label">
                          Expected Work <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            value={detail.expectedWork}
                            onChange={(e) => setDetail((prev) => ({ ...prev, expectedWork: e.target.value }))}
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
                          >
                            <Radio value={1}>Active</Radio>
                            <Radio value={0}>Inactive</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">
                          Team Evaluation? <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <Radio.Group
                            value={detail.isTeamEval}
                            onChange={(e) => setDetail((prev) => ({ ...prev, isTeamEval: e.target.value }))}
                          >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                          </Radio.Group>
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">
                          Work Evaluation? <Typography.Text type="danger">*</Typography.Text>
                        </label>
                        <div>
                          <Radio.Group
                            value={detail.isWorkEval}
                            onChange={(e) => setDetail((prev) => ({ ...prev, isWorkEval: e.target.value }))}
                          >
                            <Radio value={1}>Yes</Radio>
                            <Radio value={0}>No</Radio>
                          </Radio.Group>
                        </div>
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
                      <>
                        <ErrorMsg
                          errorMsg={error}
                          isError={error === 'You have successfully add new eval criteria detail' ? false : true}
                        />
                      </>
                      <div className="d-flex">
                        <CButton size="md" className="mr-3" color="warning" onClick={modalConfirm}>
                          Add
                        </CButton>
                      </div>
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

export default ClassEvalCriteriaAdd
