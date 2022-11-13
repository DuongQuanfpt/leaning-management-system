import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Breadcrumb, Button, message, Select, Typography, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const NewSubmit = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()

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
          toastMessage('error', 'File type must smaller than 10MB')
          return
        }
        toastMessage('success', `${info.file.name} file uploaded successfully.`)

        const formData = new FormData()
        formData.append('file', info.file)

        // console.log(formData.values().next().value)
        setZipFile(formData.values().next().value)
      }
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
    console.log(requirementSelected)
    console.log(zipFile)

    const params = {
      requirementIds: btoa(JSON.stringify({ requirementIds: requirementSelected })),
      submitFile: zipFile,
    }

    console.log(params)
    submitApi
      .submitFile(id, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', `Submit file successfully`)
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', `Submit file failed, try again please`)
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
              <div className="col-lg-12 p-b30">
                <div className="row">
                  <div className="col-12 d-flex align-items-center">
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
                  <div className="row mt-3">
                    <div className="col-8 d-flex align-items-center">
                      <Typography.Text>
                        Last Submited:{' '}
                        <Typography.Link href={listSubmitFilter?.currentSubmitUrl} target="_blank">
                          {/* {listSubmitFilter?.currentSubmitUrl?.lastIndexOf('.com')} */}
                          {listSubmitFilter?.currentSubmitUrl.slice(
                            listSubmitFilter?.currentSubmitUrl?.lastIndexOf('.amazonaws.com') + 15,
                            listSubmitFilter?.currentSubmitUrl.length,
                          )}
                        </Typography.Link>{' '}
                        at `Time submitted here`
                      </Typography.Text>
                    </div>
                    <div className="col-4 d-flex align-items-center">
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-end mb-1">
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
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button type="secondary" className="ml-3" onClick={() => navigateTo('/submit-list')}>
                    Cancel
                  </Button>
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
