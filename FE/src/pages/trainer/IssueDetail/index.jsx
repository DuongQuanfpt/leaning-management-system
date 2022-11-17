import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, DatePicker, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'

import issueApi from '~/api/issueApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'
import moment from 'moment'

const IssueDetail = () => {
  const { currentClass, ofGroup } = useSelector((state) => state.profile)
  const { id } = useParams()

  const [defaultDetail, setDefaultDetail] = useState({})
  const [detail, setDetail] = useState({})
  const [filter, setFilter] = useState({})

  const [isEditMode, setIsEditMode] = useState(false)
  const [error, setError] = useState('')

  let listGroupAssigned = ofGroup.map((group) => group.groupId)

  useEffect(() => {
    setFilter({})
    setDetail({
      title: '',
      milestone: {
        milestoneTitle: 'Select Milestone',
        group: [],
      },
      group: {
        groupName: 'Select Group',
      },
      assignee: 'Select Assignee',
      requirement: { id: null, title: 'General Requirement' },
      type: { title: 'Select Type' },
      status: {
        id: 1,
        title: 'Open',
      },
      deadline: null,
      description: '',
    })
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await issueApi
      .getAddFilter(currentClass)
      .then((response) => {
        console.log(response)
        setFilter({
          ...response,
          statusFilter: [{ title: 'Open', value: 1 }, ...response.statusFilter, { title: 'Close', value: 0 }],
        })
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })

    await issueApi
      .getIssueDetail(id)
      .then((response) => {
        console.log(response)

        // const groupModified = response?.milestone?.groups
        //   ?.filter((group) => group?.groupId === response?.group?.groupId)
        //   ?.shift()

        // console.log(groupModified)
        // groupModified?.memberId?.unshift('Unassigned')

        setDefaultDetail({
          ...response,
          // group: groupModified,
        })
        setDetail({
          ...response,
          // group: groupModified,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSave = async () => {
    if (detail.title.trim() === '') {
      setError('Title must not empty')
      return
    }

    const changedDetail = {
      title: detail.title,
      deadline: detail.deadline === null ? null : moment(detail.deadline).format('YYYY-MM-DD'),
      statusId: detail.status.id,
      description: detail.description.trim(),
      milestoneId: detail.milestone.milestoneId,
      typeId: detail.type.id,
      requirementId: detail.requirement.id,
    }
    if (detail.group.groupName !== 'Select Group') {
      changedDetail.groupId = detail.group.groupId
    }

    if (detail.asignee.username !== 'Select Assignee') {
      changedDetail.asigneeName = detail.asignee.username
    }

    await issueApi
      .changeIssueDetail(id, changedDetail)
      .then(() => {
        setError('You have successfully change issue detail')
        setIsEditMode(false)
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
        console.log(error)
      })
  }

  const handleCancel = () => {
    setError('')
    setDetail(defaultDetail)
    setIsEditMode(false)
  }

  const handleEdit = () => {
    setError('')
    setIsEditMode(true)
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Issue?`,
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
                        <Link to="/issue-list">Issue List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Issue Detail</Breadcrumb.Item>
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
                      <div>
                        <label className="col-form-label">Title</label>
                        <input
                          className="form-control"
                          type="text"
                          disabled={!isEditMode}
                          value={detail?.title}
                          onChange={(e) =>
                            setDetail((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Milestone</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail?.milestone?.milestoneTitle}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter?.milestoneFilter?.map((milestone) => (
                              <CDropdownItem
                                onClick={() =>
                                  setDetail((prev) => ({
                                    ...prev,
                                    milestone: milestone,
                                    group: { ...prev.group, groupName: 'Select Group' },
                                    asignee: { ...prev.asignee, username: 'Select Assignee' },
                                  }))
                                }
                              >
                                {milestone?.milestoneTitle}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Group</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail?.group?.groupName || detail?.group?.groupCode}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {detail?.milestone?.groups?.map((group) => (
                              <CDropdownItem
                                onClick={() => {
                                  const newGroup = {
                                    ...group,
                                    memberId: group.memberId,
                                  }
                                  setDetail((prev) => ({
                                    ...prev,
                                    group: newGroup,
                                    asignee: { ...prev.asignee, username: 'Select Assignee' },
                                  }))
                                }}
                              >
                                {group?.groupName}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Assignee</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle
                            color="warning"
                            disabled={!isEditMode || detail?.group?.groupName === 'Select Group'}
                          >
                            {detail?.asignee?.username}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            <CDropdownItem
                              onClick={() =>
                                setDetail((prev) => ({ ...prev, asignee: { ...prev.asignee, username: 'Unassigned' } }))
                              }
                            >
                              Unassigned
                            </CDropdownItem>
                            {detail?.group?.memberId?.map((member) => (
                              <CDropdownItem
                                onClick={() =>
                                  setDetail((prev) => ({
                                    ...prev,
                                    asignee: { ...prev.asignee, username: member },
                                  }))
                                }
                              >
                                {member}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Type</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail?.type?.title}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter?.typeFilter?.map((type) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, type: type }))}>
                                {type?.title}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Requirement</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail?.requirement?.title}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            <CDropdownItem
                              onClick={() =>
                                setDetail((prev) => ({
                                  ...prev,
                                  requirement: { title: 'General Requirement', id: null },
                                }))
                              }
                            >
                              General Requirement
                            </CDropdownItem>
                            {detail?.milestone?.requirements?.map((require) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, requirement: require }))}>
                                {require?.title}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Deadline</label>
                        <DatePicker
                          className="w-100"
                          size={'large'}
                          format={'YYYY-MM-DD'}
                          value={detail.deadline === null ? null : moment(detail.deadline, 'YYYY-MM-DD')}
                          disabled={!isEditMode}
                          onChange={(date) => setDetail((prev) => ({ ...prev, deadline: date }))}
                          allowClear={false}
                          disabledDate={(current) => {
                            let customDate = moment().format('YYYY-MM-DD')
                            return current && current < moment(customDate, 'YYYY-MM-DD')
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <div>
                        <label className="col-form-label">Status</label>
                        <CDropdown className="w-100">
                          <CDropdownToggle color="warning" disabled={!isEditMode}>
                            {detail?.status?.title}
                          </CDropdownToggle>
                          <CDropdownMenu className="w-100" style={{ maxHeight: '300px', overflow: 'auto' }}>
                            {filter?.statusFilter?.map((status) => (
                              <CDropdownItem onClick={() => setDetail((prev) => ({ ...prev, status: status }))}>
                                {status?.title}
                              </CDropdownItem>
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </div>
                    </div>
                    <div className="form-group col-12">
                      <label className="col-form-label">Description</label>
                      <div>
                        <textarea
                          name="message"
                          rows="4"
                          className="form-control"
                          value={detail?.description}
                          disabled={!isEditMode}
                          onChange={(e) => setDetail((prev) => ({ ...prev, description: e.target.value }))}
                        ></textarea>
                      </div>
                    </div>
                    <ErrorMsg
                      errorMsg={error}
                      isError={error === 'You have successfully change issue detail' ? false : true}
                    />
                    {listGroupAssigned.includes(defaultDetail?.group?.groupId) && (
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
                    )}
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

export default IssueDetail
