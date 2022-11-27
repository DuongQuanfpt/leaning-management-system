import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Breadcrumb, Modal, Radio, Segmented, Skeleton } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import evalCriteriaApi from '~/api/evalCriteriaApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const EvalCriteriaAdd = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const [detail, setDetail] = useState({
    criteriaName: '',
    assignment: 'Select Assignment',
    expectedWork: 0,
    description: '',
    evalWeight: 0,
    isTeamEval: 0,
    status: 0,
  })
  const [listFilter, setListFilter] = useState({
    assignmentFilter: [],
  })
  const [listEval, setListEval] = useState([])

  const [currentClone, setCurrentClone] = useState('Subject - Assignment - Eval Criteria')
  const [mode, setMode] = useState('Add New')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDetail({
      criteriaName: '',
      assignment: 'Select Assignment',
      expectedWork: 0,
      description: '',
      evalWeight: 0,
      isTeamEval: 0,
      status: 0,
    })
    setCurrentClone('Subject - Assignment - Eval Criteria')
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    setCurrentClone('Subject - Assignment - Eval Criteria')
    setDetail({
      criteriaName: '',
      assignment: {
        assId: '',
        title: 'Assignment',
        subjectName: 'Subject',
      },
      expectedWork: '',
      description: '',
      evalWeight: '',
      isTeamEval: 0,
      status: 0,
    })
    setError('')
  }, [mode])

  const loadData = async () => {
    setLoading(true)
    await evalCriteriaApi
      .getPage({ classCode: currentClass })
      .then((response) => {
        console.log(response)
        setListEval(response.listResult)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
      .finally(() => setLoading(false))

    await evalCriteriaApi
      .getFilterWithClass({ classCode: currentClass })
      .then((response) => {
        console.log(response)
        setListFilter(response)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
      .finally(() => setLoading(false))
  }

  const handleAdd = async () => {
    if (!detail?.assignment?.assignment?.assId) {
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

    console.log(detail)

    const params = {
      criteriaName: detail.criteriaName.trim(),
      evalWeight: detail.evalWeight + '%',
      expectedWork: detail.expectedWork,
      isTeamEval: detail.isTeamEval,
      status: detail.status,
      description: detail.description,
      assignmentId: detail?.assignment?.assignment?.assId,
      milestoneId: detail?.assignment?.milestoneId,
    }
    await evalCriteriaApi
      .addCriteria(params)
      .then((response) => {
        setError('You have successfully add new eval criteria detail')
      })
      .catch((error) => {
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
                        <Link to="/criteria-list">Eval Criteria List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Eval Criteria Add</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 d-flex ">
            <div className="col-lg-12 m-b30">
              <Segmented
                options={[
                  {
                    label: 'Add New',
                    value: 'Add New',
                  },
                  {
                    label: 'Reuse',
                    value: 'Reuse',
                  },
                ]}
                value={mode}
                onChange={setMode}
              />
              <div className="widget-box">
                <Skeleton loading={loading}>
                  <div className="widget-inner">
                    <div className="row">
                      {mode === 'Reuse' && (
                        <div className="form-group col-12">
                          <label className="col-form-label">Select Eval Criteria Reuse</label>
                          <CDropdown className="w-100">
                            <CDropdownToggle color="warning">{currentClone}</CDropdownToggle>
                            <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                              {listEval?.map((item) => (
                                <CDropdownItem
                                  onClick={() => {
                                    console.log(item)
                                    setCurrentClone(
                                      `${item.subjectName} - ${item.assignment.title} - ${item.criteriaName}`,
                                    )
                                    setDetail((prev) => ({
                                      ...prev,
                                      ...item,
                                      evalWeight: Number(item.evalWeight),
                                      status: item.status === 'Active' ? 1 : 0,
                                    }))
                                  }}
                                >
                                  {item.subjectName} - {item.assignment.title} - {item.criteriaName}
                                </CDropdownItem>
                              ))}
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      )}
                      <div className="form-group col-12">
                        <label className="col-form-label">Assignment</label>
                        <div>
                          <CDropdown className="w-100">
                            <CDropdownToggle color="warning">{`${
                              detail?.assignment?.assignment?.subjectName ?? 'Subject'
                            } - ${detail?.assignment?.assignment?.title ?? 'Milestone'}`}</CDropdownToggle>
                            <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                              {listFilter?.milestoneFilter?.map((assignment) => (
                                <CDropdownItem
                                  onClick={() => setDetail((prev) => ({ ...prev, assignment: assignment }))}
                                >
                                  {`${assignment?.assignment?.subjectName} - ${assignment?.assignment?.title}`}
                                </CDropdownItem>
                              ))}
                            </CDropdownMenu>
                          </CDropdown>
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">Eval Criteria Name</label>
                        <div>
                          <input
                            className="form-control"
                            type="text"
                            value={detail.criteriaName}
                            onChange={(e) => setDetail((prev) => ({ ...prev, criteriaName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">Evaluation Weight (%)</label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            value={detail.evalWeight}
                            onChange={(e) => setDetail((prev) => ({ ...prev, evalWeight: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">Expected Work</label>
                        <div>
                          <input
                            className="form-control"
                            type="number"
                            value={detail.expectedWork}
                            onChange={(e) => setDetail((prev) => ({ ...prev, expectedWork: e.target.value }))}
                          />
                          {/* <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          required
                          value={detail.expectedWork}
                          onChange={(e) => setDetail((prev) => ({ ...prev, expectedWork: e.target.value }))}
                        ></textarea> */}
                        </div>
                      </div>
                      <div className="form-group col-4">
                        <label className="col-form-label">Status</label>
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
                        <label className="col-form-label">Is Team Eval</label>
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

                      <div className="form-group col-12">
                        <label className="col-form-label">Description</label>
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
                        isError={error === 'You have successfully add new eval criteria detail' ? false : true}
                      />
                      <div className="d-flex">
                        <CButton size="md" className="mr-3" color="warning" onClick={modalConfirm}>
                          Add
                        </CButton>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default EvalCriteriaAdd
