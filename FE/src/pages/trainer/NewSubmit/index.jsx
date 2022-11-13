import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Button, Input, message, Select, Table, Tag, Typography, Upload } from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const NewSubmit = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()
  const [loading, setLoading] = useState(false)

  const [listSubmitFilter, setListSubmitFilter] = useState([])
  const [requirementSelected, setRequirementSelected] = useState([])
  const [zipFile, setZipFile] = useState(null)

  useEffect(() => {
    submitApi
      .getListSubmitFilter(id)
      .then((response) => {
        console.log(response)
        setListSubmitFilter(response)
        if (response?.requirementSubmitted) {
          setRequirementSelected(response.requirementSubmitted.map((req) => req.id))
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeRequirement = (value) => {
    setRequirementSelected(value)
  }

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
        //File bigger than 10MB
        if (info.file.size >= 10000000) {
          toastMessage('error', 'File must smaller than 10MB')
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

  const handleSubmit = async () => {
    if (requirementSelected.length === 0) {
      toastMessage('error', 'You must select at lease one requirement')
      return
    }
    if (zipFile === null) {
      toastMessage('error', 'You must choose file to submit')
      return
    }

    const params = {
      requirementIds: btoa(JSON.stringify({ requirementIds: requirementSelected })),
      submitFile: zipFile,
    }

    console.log(params)
    submitApi
      .submitFile(id, params)
      .then((response) => {
        toastMessage('success', `Submit file successfully`)
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', `Submit file failed, try again please`)
      })
  }

  const columns = [
    { title: 'Requirement', dataIndex: 'requirement', width: '60%' },
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
      render: (_, { assignee }) => (
        <Select
          className="w-100"
          allowClear
          options={assignee.map((ass) => ({
            label: ass,
            value: ass,
          }))}
          placeholder="Select Assignee"
        />
      ),
    },
  ]

  const dataSource = [
    {
      requirement: 'requirement 0',
      key: 0,
      status: 'Doing',
      assignee: ['hoang1', 'hoang2', 'hoang3'],
    },
    {
      requirement: 'requirement 1',
      key: 1,
      status: 'Done',
      assignee: ['hoang1', 'hoang2', 'hoang3'],
    },
    {
      requirement: 'requirement 2',
      key: 2,

      status: 'Open',
      assignee: ['hoang1', 'hoang2', 'hoang3'],
    },
    {
      requirement: 'requirement 3',
      key: 3,

      status: 'Close',
      assignee: ['hoang1', 'hoang2', 'hoang3'],
    },
    {
      requirement: 'requirement 4',
      key: 4,
      status: 'Somthing custom',
      assignee: ['hoang1', 'hoang2', 'hoang3'],
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
              <div className="col-lg-12 p-b20">
                <div className="row">
                  <div className="row mt-3">
                    {/* <div className="col-6 d-flex align-items-center">
                      <Typography.Text>
                        Last Submited:{' '}
                        <Typography.Link href={listSubmitFilter?.currentSubmitUrl} target="_blank">
                          {listSubmitFilter?.currentSubmitUrl?.slice(
                            listSubmitFilter?.currentSubmitUrl?.lastIndexOf('.amazonaws.com') + 15,
                            listSubmitFilter?.currentSubmitUrl.length,
                          )}
                        </Typography.Link>{' '}
                        at `Time submitted here`
                      </Typography.Text>
                    </div> */}
                    {/* <div className="col-6 d-flex align-items-center">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: '100%',
                        }}
                        placeholder="Select Requirement"
                        value={requirementSelected}
                        onChange={handleChangeRequirement}
                        options={listSubmitFilter?.requirement?.map((requirement) => ({
                          label: requirement.title,
                          value: requirement.id,
                        }))}
                      />
                    </div> */}
                    <div className="col-9 d-flex justify-content-end"></div>
                    <div className="col-3 d-flex justify-content-start">
                      <Typography.Text>{`Choose submit package (zip file, <= 20MB)`}</Typography.Text>
                    </div>
                    <div className="col-4 d-flex align-items-center">
                      <Input placeholder="Milestone name here" readOnly />
                    </div>
                    <div className="col-5 d-flex align-items-center"></div>
                    <div className="col-3 d-flex  justify-content-start">
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-lg-12 d-flex justify-content-end mb-1">
                  <Typography.Text>Maximum file for new file: 10MB</Typography.Text>
                </div>
                <div className="col-lg-12 m-b30">
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single upload file and accept zip extension only</p>
                  </Upload.Dragger>
                </div>
                <div className="col-lg-12 m-b30 d-flex justify-content-center">
                  <Button type="primary" onClick={async () => handleSubmit()}>
                    Submit
                  </Button>
                  <Button type="secondary" className="ml-3" onClick={() => navigateTo('/submit-list')}>
                    Cancel
                  </Button>
                </div> */}
                <div className="col-lg-12 m-b10">
                  <div className="row">
                    <div className="col-9 d-flex justify-content-start">
                      <Typography.Text>Found 10 requirements which you can choose to submit</Typography.Text>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                      <Typography.Link>Update Requirement</Typography.Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 ">
                  <div className="row">
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      pagination={false}
                      loading={loading}
                      rowSelection={{
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                          console.log(selectedRowKeys, selectedRows)
                        },
                      }}
                    />
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
