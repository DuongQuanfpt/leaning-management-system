import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Button, Input, message, Modal, Select, Table, Tag, Typography, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import styled from 'styled-components'

import submitApi from '~/api/submitApi'
import issueApi from '~/api/issueApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import moment from 'moment'
import { useSelector } from 'react-redux'

const StyledUpload = styled(Upload)`
  display: flex;
  flex-direction: row-reverse;
`

const NewSubmit = () => {
  const { id } = useParams()
  const { currentClass } = useSelector((state) => state.profile)
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(0)

  const [listSubmitFilter, setListSubmitFilter] = useState([])
  const [listRequirementModal, setListRequirementModal] = useState([])
  const [listMilestoneRemoved, setListMilestoneRemoved] = useState([])
  const [listStatusRemoved, setListStatusRemoved] = useState([])
  const [modalFilter, setModalFilter] = useState({
    status: null,
    milestoneId: 0,
    search: '',
  })
  const [search, setSearch] = useState('')
  const [requirementSelected, setRequirementSelected] = useState([])
  const [requirementSelectedKeys, setRequirementSelectedKey] = useState([])
  const [zipFile, setZipFile] = useState(null)

  useEffect(() => {
    setLoading(true)
    submitApi
      .getListSubmitFilter(id)
      .then((response) => {
        console.log(response)
        setListSubmitFilter({
          ...response,
          requirement: response?.requirement?.map((req, index) => ({ ...req, key: index })),
          requirementStatus: [
            { id: null, title: 'All Statuses' },
            { id: 1, title: 'Open' },
            ...response?.requirementStatus,
            { id: 0, title: 'Close' },
          ],
        })
        setListMilestoneRemoved(() => [...response?.milestoneOfGroup])
        setListStatusRemoved([{ id: 1, title: 'Open' }, ...response?.requirementStatus, { id: 0, title: 'Close' }])

        return response
      })
      .then((response) => {
        const addIndex = response?.requirement?.map((req, index) => ({ ...req, key: index }))
        const result = addIndex.filter((item) => item.submitted !== false)
        setRequirementSelected(result)

        const defaultSelected = result?.map((item) => item.key)
        setRequirementSelectedKey(defaultSelected)

        return response
      })
      .then((response) => {
        setListMilestoneRemoved((prev) => prev.slice(1))
        const groupParamsSelect = {
          groupIds: [response.groupId === null ? 0 : response.groupId],
          statusIds: [],
          typeIds: [],
          assigneeNames: [],
          requirementIds: [],
        }

        const params = {
          limit: 9999,
          page: 1,
          isIssue: false,
          // milestoneId: response.milestoneId,
          milestoneId: 0,
          filter: btoa(JSON.stringify(groupParamsSelect)),
        }

        issueApi
          .getIssue(currentClass, params)
          .then((response) => {
            console.log(response)
            setListRequirementModal(response.issueList.map((item, index) => ({ ...item, key: index })))
          })
          .then(() => setLoading(false))
          .catch((error) => {
            console.log(error)
            setLoading(false)
          })
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => {
    if (listSubmitFilter.length === 0) {
      return
    }
    const groupParamsSelect = {
      groupIds: [listSubmitFilter.groupId === null ? 0 : listSubmitFilter.groupId],
      statusIds: [],
      typeIds: [],
      assigneeNames: [],
      requirementIds: [],
    }
    if (modalFilter.status !== null) {
      groupParamsSelect.statusIds = [modalFilter.status]
    }

    const params = {
      limit: 9999,
      page: 1,
      isIssue: false,
      milestoneId: modalFilter.milestoneId,
      filter: btoa(JSON.stringify(groupParamsSelect)),
      q: modalFilter.search.trim(),
    }

    setLoading(true)
    issueApi
      .getIssue(currentClass, params)
      .then((response) => {
        setListRequirementModal(response.issueList.map((item, index) => ({ ...item, key: index })))
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalFilter])

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
      },
    })
  }

  const props = {
    name: 'file',
    accept: '.zip',
    multiple: false,
    maxCount: 1,
    beforeUpload: () => {
      return false
    },
    onChange(info) {
      const { status } = info.file
      const extensionFile = info.file.name.split('.').pop()

      if (status !== 'uploading') {
        if (info.file.status === 'removed') return

        if (!['zip'].includes(extensionFile)) {
          toastMessage('error', 'File type is invalid (support .zip only)')
          return
        }
        //File bigger than 20MB
        if (info.file.size >= 20000000) {
          toastMessage('error', 'File must smaller than 20MB')
          return
        }
        toastMessage('success', `${info.file.name} file uploaded successfully.`)

        const formData = new FormData()
        formData.append('file', info.file)

        setZipFile(formData.values().next().value)
      }
    },
    onRemove(e) {
      console.log('Remove files', e)
      setZipFile(null)
    },
  }

  const handleSubmitMilestone = async () => {
    if (requirementSelected.length === 0) {
      toastMessage('error', 'You must select at lease one requirement')
      return
    }
    if (zipFile === null) {
      toastMessage('error', 'You must upload file to submit')
      return
    }

    const checkSelectAssignee = requirementSelected.filter((req) => req.assignee === null)
    if (checkSelectAssignee.length !== 0) {
      toastMessage('error', 'Submit requirement must assign to an assignee')
      return
    }

    const reqSubmit = requirementSelected.map((item) => ({
      assigneeName: item.assignee,
      requirementId: item.id,
    }))

    const params = {
      requirementIds: btoa(JSON.stringify({ requirements: reqSubmit })),
      submitFile: zipFile,
    }

    setLoading(true)
    submitApi
      .submitFile(id, params)
      .then(() => {
        toastMessage('success', `Submit file successfully`)
      })
      .then(() => setCount((prev) => prev + 1))
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        toastMessage('error', `Submit file failed, try again please`)
        setLoading(false)
      })
  }

  const handleModalSubmit = async () => {
    console.log(listRequirementModal)
    const params = {
      issues: listRequirementModal.map((item) => ({
        issueId: item.issueId,
        statusId: item.statusId,
        milestoneId: item.milestone.milestoneId,
      })),
    }

    console.log(params)

    setLoading(true)

    submitApi
      .requirementChange(params)
      .then((response) => {
        console.log(response)
        setOpen(false)
        setCount((prev) => prev + 1)
      })
      .then(() => {
        setLoading(false)
        toastMessage('success', 'Update Requirement Successfully')
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
        toastMessage('error', 'Update Requirement Failed, try again later')
      })
  }

  const columns = [
    {
      title: 'Requirement',
      dataIndex: 'title',
      width: '60%',
      render: (_, requirement) => (
        <Typography.Text>
          {requirement.title}
          {'  '}
          <Typography.Text type="secondary">
            {requirement.submitStatus ? `(${requirement.submitStatus})` : ``}
          </Typography.Text>
        </Typography.Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '20%',
      render: (_, { status }) => <Tag color="green">{status}</Tag>,
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      width: '20%',
      render: (_, requirement) => (
        <Select
          className="w-100"
          allowClear
          options={listSubmitFilter?.assigneeOfGroup?.map((ass) => ({
            label: ass?.username,
            value: ass?.username,
          }))}
          placeholder="Select Assignee"
          value={requirement?.assignee}
          onChange={(value) => {
            const positionChange = listSubmitFilter.requirement.findIndex((item) => item.id === requirement.id)
            const cloneRequirementList = [...listSubmitFilter.requirement]
            cloneRequirementList[positionChange].assignee = value
            setListSubmitFilter((prev) => ({ ...prev, requirement: cloneRequirementList }))
            console.log(cloneRequirementList[positionChange])
          }}
          onClear={() => {
            const positionChange = listSubmitFilter.requirement.findIndex((item) => item.id === requirement.id)
            const cloneRequirementList = [...listSubmitFilter.requirement]
            cloneRequirementList[positionChange].assignee = null
            setListSubmitFilter((prev) => ({ ...prev, requirement: cloneRequirementList }))
          }}
          disabled={listSubmitFilter.status === 'Evaluated'}
        />
      ),
    },
  ]

  const columnsModal = [
    {
      title: '#',
      dataIndex: 'issueId',
      width: '10%',
    },
    {
      title: 'Requirements',
      dataIndex: 'title',
      width: '45%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '25%',
      render: (_, requirement) => (
        <Select
          disabled={requirement.submitted}
          className="w-100"
          placeholder="Select Status"
          value={requirement.status}
          options={listStatusRemoved.map((req) => ({
            label: req.title,
            value: req.id,
          }))}
          onChange={(value, option) => {
            const result = [...listRequirementModal]
            result.forEach((item) => {
              if (item.issueId === requirement.issueId) {
                item.statusId = value
                item.status = option.label
              }
            })
            setListRequirementModal(result)
          }}
        />
      ),
    },
    {
      title: 'Milestone',
      width: '25%',
      render: (_, requirement) => (
        <Select
          disabled={requirement.submitted}
          className="w-100"
          placeholder="Select Milestone"
          value={requirement.milestone?.title}
          options={listMilestoneRemoved.map((milestone) => ({
            label: milestone?.milestoneTitle,
            value: milestone?.milestoneId,
          }))}
          onChange={(value, option) => {
            const result = [...listRequirementModal]
            result.forEach((item) => {
              if (item.issueId === requirement.issueId) {
                item.milestone = { ...item.milestone, milestoneId: value, title: option.label }
              }
            })
            setListRequirementModal(result)
          }}
        />
      ),
    },
  ]

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12">
            <div className="row">
              <div className="row">
                <div className="col-lg-12">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link to="/submit-list">Submit List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>New Submit</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 p-b20">
                  <div className="row mt-3">
                    <div className="row mt-0 mb-2 mx-0 p-0">
                      <div className="col-8 d-flex justify-content-start">
                        {listSubmitFilter?.status === 'Pending' ? (
                          <></>
                        ) : (
                          <>
                            <Typography.Text>{`Lastest submitted:`}</Typography.Text>
                            <Typography.Link className="mx-1" href={listSubmitFilter?.currentSubmitUrl} target="_blank">
                              {listSubmitFilter?.currentSubmitUrl?.slice(
                                listSubmitFilter?.currentSubmitUrl?.lastIndexOf(
                                  'https://lms-assignment-g23.s3.ap-southeast-1.amazonaws.com',
                                ) + 59,
                                listSubmitFilter?.currentSubmitUrl?.length,
                              )}
                            </Typography.Link>
                            <Typography.Text>{`at ${moment(
                              listSubmitFilter?.lastSubmit,
                              'YYYY-MM-DD hh:mm:ss',
                            )}`}</Typography.Text>
                          </>
                        )}
                      </div>
                      <div className="col-4 d-flex justify-content-end">
                        <Typography.Text>{`Choose submit package (zip file, <= 20MB)`}</Typography.Text>
                      </div>
                    </div>
                    <div className="col-4 d-flex">
                      <Input value={listSubmitFilter?.milestone} readOnly />
                    </div>
                    <div className="col-6 d-flex"></div>
                    <div className="col-2 d-flex justify-content-end">
                      {listSubmitFilter.status !== 'Evaluated' && (
                        <StyledUpload
                          {...props}
                          style={{ display: 'flex !important', flexDirection: 'row-reverse !important' }}
                        >
                          <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </StyledUpload>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 m-b10">
                  <div className="row">
                    <div className="col-8 d-flex justify-content-start">
                      <Typography.Text strong>{`Found ${
                        listSubmitFilter?.requirement?.length ?? 0
                      } requirements which you can choose to submit`}</Typography.Text>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                      {listSubmitFilter.status !== 'Evaluated' && (
                        <Button className="px-0" type="link" onClick={() => setOpen(true)}>
                          Update Requirement
                        </Button>
                      )}
                      <Modal
                        title="Requirement Update"
                        style={{
                          left: 30,
                        }}
                        centered
                        maskClosable={false}
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={'85%'}
                        footer={[
                          <Button key="submit" type="primary" onClick={handleModalSubmit}>
                            Submit
                          </Button>,

                          <Button
                            key="back"
                            type="secondary"
                            onClick={() => {
                              setOpen(false)
                              setModalFilter({
                                status: null,
                                milestoneId: 0,
                                search: '',
                              })
                            }}
                          >
                            Cancel
                          </Button>,
                        ]}
                      >
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-6">
                              <Input.Search
                                placeholder="Input text to search requirement title"
                                value={search}
                                allowClear
                                onChange={(e) => {
                                  if (e.target.value) {
                                    setSearch(() => e.target.value)
                                  } else {
                                    setSearch(() => undefined)
                                  }
                                }}
                                onSearch={() => setModalFilter((prev) => ({ ...prev, search: search }))}
                              />
                            </div>
                            <div className="col-lg-2">
                              <Select
                                className="w-100"
                                placeholder="Select Status"
                                value={modalFilter.status}
                                options={listSubmitFilter?.requirementStatus?.map((req) => ({
                                  label: req.title,
                                  value: req.id,
                                }))}
                                onChange={(value) => setModalFilter((prev) => ({ ...prev, status: value }))}
                              />
                            </div>
                            <div className="col-lg-4">
                              <Select
                                className="w-100"
                                placeholder="Select Milestone"
                                value={modalFilter.milestoneId}
                                options={listSubmitFilter?.milestoneOfGroup?.map((milestone) => ({
                                  label: milestone.milestoneTitle,
                                  value: milestone.milestoneId,
                                }))}
                                onChange={(value) => setModalFilter((prev) => ({ ...prev, milestoneId: value }))}
                              />
                            </div>
                          </div>
                          <div className="row mt-3">
                            <div className="col-lg-12 m-t10">
                              <Table
                                columns={columnsModal}
                                dataSource={listRequirementModal}
                                pagination={false}
                                loading={loading}
                              />
                              <div className="col-lg-12 p-0 mt-3 d-flex justify-content-end">
                                <Button
                                  className="m-0"
                                  type="primary"
                                  onClick={() =>
                                    setModalFilter({
                                      status: null,
                                      milestoneId: 0,
                                      search: '',
                                    })
                                  }
                                >
                                  Reset
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <Table
                      columns={columns}
                      dataSource={listSubmitFilter?.requirement}
                      pagination={false}
                      loading={loading}
                      rowSelection={{
                        selectedRowKeys: requirementSelectedKeys,
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                          console.log(selectedRows)
                          setRequirementSelected(selectedRows)
                          setRequirementSelectedKey(selectedRowKeys)
                        },
                        getCheckboxProps: (record) => ({
                          disabled: listSubmitFilter.status !== 'Evaluated' ? false : true,
                        }),
                        // disabled: listSubmitFilter.status !== 'Evaluated' ? true : false,
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-12 mt-3">
                  <div className="row ">
                    <div className="col-lg-3 d-flex justify-content-start mb-3">
                      {listSubmitFilter.status !== 'Evaluated' && (
                        <Button type="primary" onClick={handleSubmitMilestone} loading={loading}>
                          Submit Milestone
                        </Button>
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

export default NewSubmit
