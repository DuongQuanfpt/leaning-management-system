import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Button, Modal, Table, Typography } from 'antd'
import { utils, writeFileXLSX, read } from 'xlsx'
import { LoadingOutlined } from '@ant-design/icons'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const TraineeImport = () => {
  const [listTraineeImported, setListTraineeImported] = useState([])

  const handleDownloadTemplate = async () => {
    const listExport = []
    const ws = utils.json_to_sheet(listExport)
    const wb = utils.book_new()
    utils.sheet_add_aoa(ws, [['User name', 'Email']], { origin: 'A1' })
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
        if (!!!data[0]?.['User name'] && !!!data[0]?.['Email']) {
          modalError('File data is invalid, follow the template please')
          setListTraineeImported([])
          return
        }
        resolve(data)
      }

      fileReader.onerror = (error) => {
        setListTraineeImported([])
        reject(error)
        modalError(error)
      }
    })

    readFile.then((data) => {
      setListTraineeImported(data)
    })
  }

  const handleImport = () => {
    console.log(listTraineeImported)
  }

  const modalError = (error) => {
    Modal.error({
      title: 'Error',
      content: `${error}`,
    })
  }

  const columns = [
    {
      title: 'User name',
      dataIndex: 'User name',
      sorter: (a, b) => a['User name']?.length - b['User name']?.length,
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
      render: () => <LoadingOutlined />,
      width: 150,
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
                    e.target.files[0] && handleReadFile(e.target.files[0])
                  }}
                />
              </div>
              <div className="col-12 d-flex justify-content-center"></div>
              {listTraineeImported.length !== 0 && (
                <>
                  <div className="col-12 d-flex justify-content-center mb-2 mt-2">
                    <Typography.Text
                      italic
                      type="success"
                    >{`Total ${listTraineeImported.length} trainee data loaded`}</Typography.Text>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <Table
                      bordered
                      dataSource={listTraineeImported}
                      columns={columns}
                      pagination={{ position: 'center' }}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <Button type="primary" onClick={handleImport}>
                      Import
                    </Button>
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
