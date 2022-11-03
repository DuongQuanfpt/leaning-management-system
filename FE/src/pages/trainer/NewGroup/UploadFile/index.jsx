import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { utils, writeFileXLSX, read } from 'xlsx'
import { Button, Card, Col, message, Modal, Row, Space, Typography, Upload } from 'antd'
import groupApi from '~/api/groupApi'
import { CrownTwoTone, ExclamationCircleOutlined, UploadOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import _ from 'lodash'

const UploadFile = () => {
  const { id } = useParams()
  const [groupDetail, setGroupDetail] = useState({})
  const [fileList, setFileList] = useState([])
  const [result, setResult] = useState([])
  const [display, setDisplay] = useState([])
  const [isClickedNextStep, setIsClickedNextStep] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await groupApi
      .getReuseGroup(id)
      .then((response) => {
        setGroupDetail(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
      title: 'Are you sure to confirm this configure group this milestone?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        await handleFinish()
      },
      onCancel() {},
    })
  }

  const handleDownloadFileStudent = () => {
    const listExport = [
      ...groupDetail.traineeList.map((student) => ({
        'Group Name': '',
        Email: student.email,
        Fullname: student.fullName,
        Username: student.username,
        'Is Leader': '',
      })),
    ]

    console.log(listExport)
    const ws = utils.json_to_sheet(listExport)
    const wb = utils.book_new()
    utils.sheet_add_aoa(ws, [['Group Name', 'Email', 'Fullname', 'Username', 'Is Leader']], { origin: 'A1' })
    var wscols = [{ wch: 20 }, { wch: 30 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]
    ws['!cols'] = wscols
    utils.book_append_sheet(wb, ws, 'List Student')
    writeFileXLSX(wb, 'FileOfStudentList.xlsx')
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
          }
        })

        readFile.then((data) => {
          setFileList(data)
        })
      }
    },
  }

  const handleNextStep = () => {
    for (let i = 0; i < fileList.length; i++) {
      fileList[i]['Group Name'] = fileList[i]['Group Name']?.trim()
    }

    if (groupDetail.traineeList.length !== fileList.length) {
      toastMessage('error', 'Data is invalid, follow the File of Student List please')
      console.log(1)
      return
    }
    for (let i = 0; i < fileList.length; i++) {
      if (Object.keys(fileList[i]).length !== 5) {
        toastMessage('error', 'Data is invalid, follow the File of Student List please')
        console.log(2)
        return
      }
      if (groupDetail.traineeList[i].username?.trim() !== fileList[i].Username?.trim()) {
        toastMessage('error', 'Data is invalid, follow the File of Student List please')
        console.log(3)
        return
      }
      if (groupDetail.traineeList[i].fullName?.trim() !== fileList[i].Fullname?.trim()) {
        toastMessage('error', 'Data is invalid, follow the File of Student List please')
        console.log(4)
        return
      }
      if (groupDetail.traineeList[i].email?.trim() !== fileList[i].Email?.trim()) {
        toastMessage('error', 'Data is invalid, follow the File of Student List please')
        console.log(5)
        return
      }
    }
    const grouped = _.groupBy(fileList, (item) => item['Group Name'])

    const result = []

    for (const [key, value] of Object.entries(grouped)) {
      if (key === '') {
        result.unshift({
          groupCode: key,
          topicName: `Topic Waiting List`,
          description: `Description Waiting List`,
          fullData: value,
          members: value.map((item) => ({
            memberName: item.Username,
            isLeader: false,
          })),
        })
      } else {
        result.push({
          groupCode: key,
          topicName: `Topic ${key}`,
          description: `Description ${key}`,
          fullData: value,
          members: value.map((item) => ({
            memberName: item.Username,
            isLeader: item['Is Leader'] === 'TRUE' ? true : false,
          })),
        })
      }
    }

    result[0].fullData = result[0].fullData.map((item) => ({ ...item, 'Is Leader': false }))

    setDisplay(result)
    setResult(result)
    setIsClickedNextStep(true)
    console.log(result)
  }

  const handleFinish = async () => {
    function removeObjectWithId(arr, value) {
      // eslint-disable-next-line no-self-compare
      const objWithIdIndex = arr.findIndex((obj) => obj.groupCode === value)
      arr.splice(objWithIdIndex, 1)
      return arr
    }

    const params = {
      listGroup: removeObjectWithId(result, ''),
    }

    await groupApi
      .overrideGroup(id, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Create Group Successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Something went wrong, please try again')
      })
  }

  const handleCancel = () => {
    loadData()
    setIsClickedNextStep(false)
  }

  return (
    <div className="widget-inner">
      {!isClickedNextStep ? (
        <div className="row">
          <Space
            align="center"
            style={{
              width: '100%',
              height: '50px',
              justifyContent: 'center',
              flexDirection: 'column',
              borderTop: '1px grey dashed',
              borderLeft: '1px grey dashed',
              borderRight: '1px grey dashed',
            }}
          >
            <Typography.Text className="d-flex justify-content-center" strong>
              You need to download the{' '}
              <Button
                className="p-0 m-0"
                type="link"
                onClick={async () => {
                  await handleDownloadFileStudent()
                  toastMessage('success', 'Download File of Student List Successfully!')
                }}
              >
                File of Student List
              </Button>{' '}
              to create groups
            </Typography.Text>
          </Space>
          <Space
            align="center"
            style={{
              width: '100%',
              height: '200px',
              justifyContent: 'center',
              flexDirection: 'column',
              border: '1px grey dashed',
            }}
          >
            <Space
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                paddingLeft: '35%',
                paddingRight: '35%',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Typography.Text className="text-center" strong>
                Please click "Upload" to import the file
              </Typography.Text>
              <Upload {...props} className="d-flex flex-column mx-auto justify-content-center align-item-center w-75">
                <Button
                  className="d-flex flex-row mx-auto justify-content-center align-item-center w-100"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Space>
          </Space>
          <Space className="mt-4">
            <Typography.Title level={5} strong>
              Upload File
            </Typography.Title>
          </Space>
          <Space className="mt-1">
            <Typography.Text>
              <Typography.Text strong>Step 1: </Typography.Text>
              <Typography.Text>
                To create groups, you need to download the student list by clicking link "File of Student List".
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 2: </Typography.Text>
              <Typography.Text>
                Add group names to the column "Group Name". The first member of each group is defaulted as the group
                leader.
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 3: </Typography.Text>
              <Typography.Text>Click button "Upload" to upload the file of group list.</Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 4: </Typography.Text>
              <Typography.Text>
                Click Next Step to preview groups. The groups are displaed on the screen.
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 5: </Typography.Text>
              <Typography.Text>
                Click "Finish" to complete create groups. Then you can start the constructive questions.
              </Typography.Text>
            </Typography.Text>
          </Space>
        </div>
      ) : (
        <>
          <Space className="d-inline-flex">
            <Typography.Text className="d-flex flex-column" strong>
              <Typography.Text>Class size:</Typography.Text>

              <Typography.Text type="warning" strong>
                {` ${groupDetail.traineeList.length} `}
              </Typography.Text>
              <Typography.Text>Students</Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="d-inline-flex ml-2">
            <Typography.Text className="d-flex flex-column" strong>
              <Typography.Text> - Group:</Typography.Text>
              <Typography.Text type="warning" strong>
                {` ${display?.length} `}
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Row gutter={24} className="mt-3">
            {display.map((group) => {
              return (
                <Col span={8} className="pb-3">
                  <Card
                    title={group.groupCode === '' ? 'Waiting List' : group.groupCode}
                    bordered
                    style={{ backgroundColor: '#ededed', minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}
                    bodyStyle={{ paddingTop: 0 }}
                    extra={
                      <Space>
                        <UsergroupAddOutlined style={{ fontSize: '20px' }} />
                        <Typography>{group.members.length}</Typography>
                      </Space>
                    }
                  >
                    {group.fullData.map((student) => (
                      <Typography className="p-0 m-0 d-flex flex-row">
                        {student.Fullname} - {student.Username}{' '}
                        {student['Is Leader'] === true && <CrownTwoTone className="ml-2 d-flex align-items-center" />}
                      </Typography>
                    ))}
                  </Card>
                </Col>
              )
            })}
          </Row>
        </>
      )}
      <div className="d-flex justify-content-end ">
        {!isClickedNextStep ? (
          <Button type="primary" onClick={handleNextStep}>
            Next Step
          </Button>
        ) : (
          <>
            <Button type="text" className="ml-3" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="danger" className="ml-3" onClick={modalConfirm}>
              Finish
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default UploadFile
