import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Button, message, Select, Typography, Upload } from 'antd'

import submitApi from '~/api/submitApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { InboxOutlined } from '@ant-design/icons'

const NewSubmit = () => {
  const { id } = useParams()

  const [listSubmitFilter, setListSubmitFilter] = useState([])
  const [requirementSelected, setRequirementSelected] = useState([])
  const [zipFile, setZipFile] = useState(null)

  useEffect(() => {
    submitApi
      .getListSubmitFilter(id)
      .then((response) => {
        setListSubmitFilter(response)
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

        toastMessage('success', `${info.file.name} file uploaded successfully.`)
        const formData = new FormData()
        console.log(info.fileList[0].name, info.fileList[0])
        formData.append('name', info.fileList[0])
        setZipFile(formData)
      }
    },
  }

  const handleSubmit = async () => {
    if (requirementSelected.length === 0) {
      toastMessage('error', 'You must select at lease one requirement')
      return
    }
    console.log(requirementSelected)
    console.log(zipFile)

    const params = {
      base64Requirement: btoa(JSON.stringify(requirementSelected)),
      submitFile: zipFile,
    }

    submitApi
      .submitFile(id, params)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
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
                        <Link to="/submit-list">Submit List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>New Submit</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="row">
                    <div className="col-4 d-flex align-items-center"></div>
                    <div className="col-4 d-flex align-items-center"></div>
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
                <div className="col-lg-12 d-flex justify-content-end">
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
