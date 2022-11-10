import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Breadcrumb, Modal, Select } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import { CButton } from '@coreui/react'

import issueApi from '~/api/issueApi'

import ErrorMsg from '~/components/Common/ErrorMsg'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const RequirementAdd = () => {
  const { currentClass } = useSelector((state) => state.profile)
  const [detail, setDetail] = useState({
    title: '',
    description: '',
  })

  const [error, setError] = useState('')
  const [listFilter, setListFilter] = useState([])

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await issueApi
      .getRequirementAddFilter(currentClass)
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleSave = async () => {
    console.log(detail)
    if (detail.title.trim() === '') {
      setError('Title must not empty')
      return
    }
    if (detail.milestoneId === undefined) {
      setError('Milestone must not empty')
      return
    }

    if (detail.groupId === undefined) {
      setError('Group must not empty')
      return
    }

    if (!detail.assignee) {
      setError('Assignee must not empty')
      return
    }

    const params = {
      title: detail.title.trim(),
      milestoneId: detail.milestoneId,
      groupId: detail.groupId,
      asigneeName: detail.assignee,
      typeId: null,
      description: detail.description.trim(),
    }

    if (detail.assignee === 'Unassigned') {
      params.asigneeName = null
    }

    console.log(params)

    await issueApi
      .addIssue(currentClass, params)
      .then((response) => {
        setError('You have successfully add new requirement')
      })
      .catch((error) => {
        if (error.response.data.message === 'Title already exist') {
          setError('Requirement Title already existed')
          return
        }
        setError('Something went wrong, please try again')
      })
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to save new Requirement?`,
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
                        <Link to="/requirement-list">Requirement List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Requirement Add</Breadcrumb.Item>
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
                          value={detail.title}
                          onChange={(e) => setDetail((prev) => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Milestone</label>
                      <Select
                        className="w-100"
                        options={listFilter?.milestoneFilter?.map((milestone) => ({
                          value: milestone.milestoneId,
                          label: milestone.milestoneTitle,
                        }))}
                        onChange={(value) => {
                          setDetail((prev) => ({
                            ...prev,
                            milestoneId: value,
                            milestone: listFilter?.milestoneFilter
                              ?.filter((milestone) => milestone.milestoneId === value)
                              ?.shift(),
                          }))
                          console.log(detail)
                        }}
                      ></Select>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Group</label>
                      <Select
                        className="w-100"
                        disabled={!detail.milestoneId}
                        value={detail?.groupId}
                        options={detail.milestone?.groups?.map((group) => ({
                          value: group.groupId,
                          label: group.groupName,
                        }))}
                        onChange={(value) =>
                          setDetail((prev) => {
                            const gr = prev.milestone.groups.filter((group) => group.groupId === value)?.shift()
                            const a = {
                              ...prev,
                              groupId: value,
                              groups: gr,
                              assignee: null,
                            }
                            return a
                          })
                        }
                      ></Select>
                    </div>
                    <div className="form-group col-4">
                      <label className="col-form-label">Assignee</label>
                      <Select
                        className="w-100"
                        disabled={!detail.groups}
                        value={detail?.assignee}
                        onChange={(value) =>
                          setDetail((prev) => ({
                            ...prev,
                            assignee: value,
                          }))
                        }
                      >
                        <Select.Option value="Unassigned">Unassigned</Select.Option>
                        {detail?.groups?.memberId.map((member) => (
                          <Select.Option value={member}>{member}</Select.Option>
                        ))}
                      </Select>
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
                      isError={error === 'You have successfully add new requirement' ? false : true}
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

export default RequirementAdd
