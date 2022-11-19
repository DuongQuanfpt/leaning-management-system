import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Breadcrumb, Modal, Radio } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import assignmentApi from '~/api/assignmentApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const AssignmentAdd = () => {
  const [filter, setFilter] = useState({
    subjectFilter: [],
  })
  const [detail, setDetail] = useState({
    subjectName: 'Select Subject',
    title: '',
    assBody: '',
    eval_weight: 0,
    isOnGoing: 0,
    isTeamWork: 0,
    isFinal: 0,
    status: 0,
  })

  const [error, setError] = useState('')

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await assignmentApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setFilter(response)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }

  const handleSave = async () => {
    if (detail.subjectName === 'Select Subject') {
      setError('You must choose one Subject')
      return
    }

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
      subjectName: detail.subjectName.trim(),
      title: detail.title.trim(),
      assBody: detail.assBody.trim(),
      eval_weight: detail.eval_weight + '%',
      isOnGoing: detail.isOnGoing,
      isTeamWork: detail.isTeamWork,
      isFinal: detail.isFinal,
      status: detail.status,
    }

    await assignmentApi
      .addAssignment(params)
      .then((response) => {
        setError('You have successfully add new your assignment detail')
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new Assignment Detail?`,
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
                      <Breadcrumb.Item>Assignment Add</Breadcrumb.Item>
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
                      <CDropdown className="w-100">
                        <CDropdownToggle color="warning">{detail.subjectName}</CDropdownToggle>
                        <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                          {filter.subjectFilter.map((item) => (
                            <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, subjectName: item }))}>
                              {item}
                            </CDropdownItem>
                          ))}
                        </CDropdownMenu>
                      </CDropdown>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Title</label>
                      <div>
                        <input
                          className="form-control"
                          type="text"
                          value={detail.title}
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
                          onChange={(e) => setDetail((prev) => ({ ...prev, eval_weight: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group col-3">
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
                    <div className="form-group col-3">
                      <label className="col-form-label">Is Ongoing</label>
                      <div>
                        <Radio.Group
                          disabled
                          value={detail.isOnGoing}
                          onChange={(e) => setDetail((prev) => ({ ...prev, isOnGoing: e.target.value }))}
                        >
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
                          onChange={(e) => setDetail((prev) => ({ ...prev, assBody: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully add new your assignment detail' ? false : true}
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

export default AssignmentAdd
