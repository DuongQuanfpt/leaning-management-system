import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { utils, writeFileXLSX, read } from 'xlsx'
import { Breadcrumb, Button, Modal, Table, Tag, Typography } from 'antd'
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'

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

  const handleDownloadTemplate = async () => {
    const listExport = []
    const ws = utils.json_to_sheet(listExport)
    const wb = utils.book_new()
    utils.sheet_add_aoa(ws, [['Username', 'Email']], { origin: 'A1' })
    var wscols = [{ wch: 20 }, { wch: 20 }]
    ws['!cols'] = wscols
    utils.book_append_sheet(wb, ws, 'Data')
    writeFileXLSX(wb, 'TraineeImportTemplate.xlsx')
  }

  const handleReadFile = (file) => {
    const extensionFile = file.name.split('.').pop()
    const extensionsValid = ['xlsx', 'xls', 'csv']

    if (!extensionsValid.includes(extensionFile)) {
      modalError('File type is invalid (.xlsx, .xls and .csv is valid)')
      return
    }

    const readFile = new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result
        const wb = read(bufferArray, { type: 'buffer' })
        const ws_name = wb.SheetNames[0]
        const ws = wb.Sheets[ws_name]
        const data = utils.sheet_to_json(ws)
        if (!!!data[0]?.['Username'] && !!!data[0]?.['Email']) {
          modalError('File data is invalid, follow the template please')
          setListTrainee([])
          return
        }
        resolve(data)
      }

      fileReader.onerror = (error) => {
        setListTrainee([])
        reject(error)
        modalError(error)
      }
    })

    readFile.then((data) => {
      setListTrainee(data)
    })
  }

  const handleImport = async () => {
    const params = {
      dto: listTrainee.map((trainee) => ({
        username: trainee.Username,
        email: trainee.Email,
      })),
    }
    await traineeListApi
      .importTrainee(currentClass, params)
      .then((response) => {
        setListTraineeImported(response)
        setIsImported(true)

        // eslint-disable-next-line no-sequences
        const objectStatus = response.reduce((c, { importStatus: key }) => ((c[key] = (c[key] || 0) + 1), c), {})
        setNumberTraineeCountType((prev) => ({ ...prev, ...objectStatus }))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const modalError = (error) => {
    Modal.error({
      title: 'Error',
      content: `${error}`,
    })
  }

  const modalConfirm = () => {
    Modal.confirm({
      title: `Are you want to add a total of ${listTrainee.length} students to class ${currentClass}?`,
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

  const handleReset = () => {
    setListTraineeImported([])
    setListTrainee([])
    setNumberTraineeCountType({
      'Successfully!': 0,
      'Failed!': 0,
    })
    setIsImported(false)
  }

  useEffect(() => {
    handleReset()
  }, [currentClass])

  const columnsTrainee = [
    {
      title: 'Username',
      dataIndex: 'Username',
      sorter: (a, b) => a['Username']?.length - b['Username']?.length,
      width: 300,
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      sorter: (a, b) => a['Email']?.length - b['Email']?.length,
      width: 300,
    },
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
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a['username']?.length - b['username']?.length,
      width: 300,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a['email']?.length - b['email']?.length,
      width: 300,
    },
    {
      title: 'Status',
      dataIndex: 'importStatus',
      width: 150,
      sorter: (a, b) => a['importStatus']?.length - b['importStatus']?.length,
      render: (_, { importStatus }) => (
        <Tag color={importStatus === 'Successfully!' ? 'blue' : 'red'} key={importStatus}>
          {importStatus}
        </Tag>
      ),
    },
    {
      title: 'Message',
      dataIndex: 'importMessage',
      sorter: (a, b) => a['importMessage']?.length - b['importMessage']?.length,
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
              <div className="col-12 d-flex">
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

              <div className="col-12 d-flex justify-content-end">
                <Button type="link" onClick={handleDownloadTemplate}>
                  Download Template
                </Button>
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  onChange={(e) => {
                    setListTrainee([])
                    setListTraineeImported([])
                    e.target.files[0] && handleReadFile(e.target.files[0])
                  }}
                />
              </div>
              <div className="col-12 d-flex justify-content-center"></div>
              {listTrainee.length !== 0 && (
                <>
                  {isImported ? (
                    <div className="col-9 d-flex justify-content-start mb-2 mt-2">
                      <Typography.Text type="success" className="mr-1">
                        {`Total ${numberTraineeCountType['Successfully!']} trainee imported successfully`}
                      </Typography.Text>
                      <Typography.Text type="danger">
                        {` - ${numberTraineeCountType['Failed!']} trainee imported failed!`}
                      </Typography.Text>
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
                    {isImported && (
                      <Button type="danger" onClick={handleReset}>
                        Reset
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
