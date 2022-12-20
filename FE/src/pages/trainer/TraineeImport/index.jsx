import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { utils, writeFileXLSX, read } from 'xlsx'
import { Breadcrumb, Button, message, Modal, Table, Tag, Typography, Upload } from 'antd'
import { ExclamationCircleOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons'

import traineeListApi from '~/api/traineeListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useEffect } from 'react'

const TraineeImport = () => {
  const currentClass = useSelector((state) => state.profile.currentClass)
  const [listTrainee, setListTrainee] = useState([])
  const [listTraineeImported, setListTraineeImported] = useState([])
  const [isImported, setIsImported] = useState(false)

  const [numberTraineeCountType, setNumberTraineeCountType] = useState({
    'Successfully!': 0,
    'Failed!': 0,
  })

  useEffect(() => {
    handleReset()
  }, [currentClass])

  useEffect(() => {
    document.title = 'LMS - Trainee Import'
    window.scrollTo(0, 0)
  }, [])

  const handleDownloadTemplate = async () => {
    try {
      const listExport = []
      const ws = utils.json_to_sheet(listExport)
      const wb = utils.book_new()
      utils.sheet_add_aoa(ws, [['Fullname', 'Email']], { origin: 'A1' })
      var wscols = [{ wch: 20 }, { wch: 20 }]
      ws['!cols'] = wscols
      utils.book_append_sheet(wb, ws, 'Data')
      writeFileXLSX(wb, 'TraineeImportTemplate.xlsx')
    } catch {
      toastMessage('error', 'Download Template Failed, try again later')
    }
  }

  const handleReset = () => {}

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
      },
    })
  }

  const modalConfirm = () => {
    Modal.confirm({
      title: `Are you want to import new trainee?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleImport()
      },
      onCancel() {},
    })
  }

  const props = {
    name: 'file',
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    multiple: false,
    maxCount: 1,
    beforeUpload: () => {
      return false
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        //Handle read file and verify here
        const extensionFile = info.file.name.split('.').pop()
        const extensionsValid = ['xlsx', 'xls', 'csv']
        if (info.file.status === 'removed') return
        if (!extensionsValid.includes(extensionFile)) {
          toastMessage('error', 'File type is invalid (support .xlsx, .xls and .csv only)')
          return
        }

        const readFile = new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.readAsArrayBuffer(info.file)

          fileReader.onload = (e) => {
            const bufferArray = e.target.result
            const wb = read(bufferArray, { type: 'buffer' })
            const ws_name = wb.SheetNames[0]
            const ws = wb.Sheets[ws_name]
            const data = utils.sheet_to_json(ws)
            resolve(data)
          }

          fileReader.onerror = (error) => {
            reject(error)
            setListTrainee([])
            toastMessage('Error', 'Read file failed, try again later')
          }
        })

        readFile.then((data) => {
          if (data.length === 0) {
            toastMessage('error', 'File is empty, follow the Template please')
            return
          }
          setListTrainee(data)
          handleReadFile()
        })
      }
    },
  }

  const handleReadFile = () => {
    setIsImported(false)
    setListTraineeImported([])
    console.log(listTrainee)

    for (let i = 0; i < listTrainee.length; i++) {
      listTrainee[i]['Fullname'] = listTrainee[i]['Fullname']?.trim()
      listTrainee[i]['Email'] = listTrainee[i]['Email']?.trim()
    }

    for (let i = 0; i < listTrainee.length; i++) {
      if (Object.keys(listTrainee[i]).length !== 2) {
        toastMessage('error', 'Data is invalid, follow the Template please')
        return
      }
    }
  }

  const handleImport = async () => {
    const params = {
      dto: listTrainee.map((trainee) => ({
        fullName: trainee.Fullname,
        email: trainee.Email,
      })),
    }
    await traineeListApi
      .importTrainee(currentClass, params)
      .then((response) => {
        console.log(response)
        setListTraineeImported(response)
        setIsImported(true)
        toastMessage('success', 'Import Trainee Successfully')

        // eslint-disable-next-line no-sequences
        const objectStatus = response.reduce((c, { importStatus: key }) => ((c[key] = (c[key] || 0) + 1), c), {})
        setNumberTraineeCountType((prev) => ({ ...prev, ...objectStatus }))
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Import Trainee Failed, try again please')
      })
  }

  const columnsTrainee = [
    { title: 'Fullname', dataIndex: 'Fullname', width: '20%' },
    { title: 'Email', dataIndex: 'Email', width: '20%' },
    {
      title: 'Status',
      dataIndex: 'importStatus',
      render: () => <LoadingOutlined />,

      width: 150,
    },
    {
      title: 'Message',
      dataIndex: 'importMessage',
      ellipsis: true,
    },
  ]

  const columnsTraineeImported = [
    { title: 'Fullname', dataIndex: 'fullName', width: '20%' },
    { title: 'Email', dataIndex: 'email', width: '20%' },
    {
      title: 'Status',
      dataIndex: 'importStatus',
      width: 150,
      sorter: (recordA, recordB) => recordA.length - recordB.length,
      render: (_, { importStatus }) => (
        <Tag color={importStatus === 'Successfully!' ? 'blue' : 'red'} key={importStatus}>
          {importStatus.slice(0, -1)}
        </Tag>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'importMessage',
      ellipsis: true,
    },
  ]

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-8 d-flex">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link to="/trainee-list">Trainee List</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Trainee Import</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="col-4 d-flex justify-content-end">
                <Button type="link" onClick={handleDownloadTemplate}>
                  Download Template
                </Button>
                <Upload {...props} className="d-flex flex-column mx-auto justify-content-center align-item-center w-75">
                  <Button
                    className="d-flex flex-row mx-auto justify-content-center align-item-center w-100"
                    icon={<UploadOutlined />}
                  >
                    Click to Upload
                  </Button>
                </Upload>
              </div>
              {listTrainee.length !== 0 && (
                <>
                  {isImported ? (
                    <div className="col-9 d-flex justify-content-start mb-2 mt-2">
                      <Typography.Text type="success" className="mr-1" strong>
                        {`Total ${numberTraineeCountType['Successfully!']} trainee imported successfully`}
                      </Typography.Text>
                      {numberTraineeCountType['Failed!'] !== 0 && (
                        <Typography.Text type="danger" strong>
                          {` - ${numberTraineeCountType['Failed!']} trainee imported failed`}
                        </Typography.Text>
                      )}
                    </div>
                  ) : (
                    <div className="col-9 d-flex justify-content-start mb-2 mt-2"></div>
                  )}
                  <div className="col-3 d-flex justify-content-end mb-2 mt-2">
                    <Typography.Text strong>{`Total ${listTrainee.length} trainee data loaded`}</Typography.Text>
                  </div>

                  <div className="col-12 d-flex justify-content-center">
                    {isImported ? (
                      <Table
                        bordered
                        dataSource={listTraineeImported}
                        columns={columnsTraineeImported}
                        pagination={{ position: 'center' }}
                      />
                    ) : (
                      <Table
                        bordered
                        dataSource={listTrainee}
                        columns={columnsTrainee}
                        pagination={{ position: 'center' }}
                      />
                    )}
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    {!isImported && (
                      <Button type="primary" onClick={modalConfirm}>
                        Import
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default TraineeImport
