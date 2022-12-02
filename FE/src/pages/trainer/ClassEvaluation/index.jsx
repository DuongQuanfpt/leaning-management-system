/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { utils, writeFileXLSX, read } from 'xlsx'

import {
  Breadcrumb,
  Button,
  Typography,
  Cascader,
  Table,
  Form,
  Popconfirm,
  InputNumber,
  Input,
  Popover,
  Space,
  Tooltip,
  message,
  Modal,
  Upload,
} from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import evaluationApi from '~/api/evaluationApi'
import { useSelector } from 'react-redux'
import { CloseOutlined, EditOutlined, EllipsisOutlined, InboxOutlined, SaveOutlined } from '@ant-design/icons'

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Field must not empty!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const ClassEvaluation = () => {
  const { currentClass, roles } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    assignment: [],
  })
  const [open, setOpen] = useState({
    import: false,
    comment: false,
  })
  const [listAssignment, setListAssignment] = useState([])
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const [currentComment, setCurrentComment] = useState({
    classEval: {},
    assignment: {},
  })
  const [evalSelected, setEvalSelected] = useState([])
  const [listImported, setListImported] = useState([])
  const [search, setSearch] = useState('')
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    setIsEditable(false)
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass, search])

  const loadData = async () => {
    const params = {
      classCode: currentClass,
    }
    if (search) {
      params.q = search
    }
    setLoading(true)
    evaluationApi
      .getClassEval(params)
      .then((response) => {
        console.log(response)
        setListAssignment(response.assingmentFilter)
        setData(response.listResult.map((item, index) => ({ ...item, key: index })))
        if (roles.includes('trainer')) {
          setIsEditable(true)
        } else {
          setIsEditable(false)
        }
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  const toastMessage = (type, mes) => {
    message[type]({
      content: mes,
      style: {
        transform: `translate(0, 8vh)`,
      },
    })
  }

  const edit = (record) => {
    form.resetFields()
    form.setFieldsValue({})
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const rowUpdated = data[key]
      rowUpdated.comment = row.comment
      delete row.comment

      rowUpdated.assignmentGrade.forEach((item, index) => console.log(row[Object.keys(row)[index]]))
      rowUpdated.assignmentGrade = rowUpdated.assignmentGrade.map((item, index) => ({
        ...item,
        grade: row.hasOwnProperty(item.assignmentId) ? +row[item.assignmentId] : +item.grade,
      }))

      for (let key in row) {
        if (row.hasOwnProperty(key)) {
          if (isNaN(row[key])) {
            toastMessage('error', 'Criteria Evaluation Mark must be a number')
            return
          }
          if (Number(row[key]) < 0 || Number(row[key]) > 10) {
            toastMessage('error', 'Criteria Evaluation Mark must between 0 and 10')
            return
          }
        }
      }

      const params = {
        dto: [
          {
            comment: rowUpdated.comment,
            accountName: rowUpdated.userName,
            gpa: rowUpdated.gpa,
            ongoing: rowUpdated.ongoing,
            finalEval: rowUpdated.finalEval,
            assignmentGrade: rowUpdated.assignmentGrade.map((item) => ({
              assignmentId: item.assignmentId,
              grade: item.grade,
              comment: item.comment,
            })),
          },
        ],
      }

      console.log(params)
      await evaluationApi
        .editClassEval(currentClass, params)
        .then((response) => {
          console.log(response)
          toastMessage('success', 'Edit Assignment Evaluation successfully!')
        })
        .catch((error) => {
          console.log(error)
          toastMessage('error', 'Edit Assignment Evaluation failed, try again later!')
        })
        .finally(() => {
          loadData()
          //Disable Edit Mode
          setEditingKey('')
        })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const columns = [
    { title: 'Comments', dataIndex: 'comment', editable: true, key: 0, width: 220, fixed: 'left' },
    {
      title: 'Final',
      dataIndex: 'finalEval',
      editable: false,
      width: 70,
      fixed: 'left',
      render: (_, { finalEval }) => (finalEval === null ? null : finalEval.toFixed(2)),
    },
    {
      title: 'OG',
      dataIndex: 'ongoing',
      editable: false,
      width: 70,
      fixed: 'left',
      render: (_, { ongoing }) => (ongoing === null ? null : ongoing.toFixed(2)),
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      editable: false,
      width: 70,
      fixed: 'left',
      render: (_, { gpa }) => (gpa === null ? null : gpa.toFixed(2)),
    },
    { title: 'Full Name', dataIndex: 'fullName', editable: false, width: 120, fixed: 'left' },
    { title: 'Student', dataIndex: 'userName', editable: false, width: 120, fixed: 'left' },
  ]
  const columnsAction = [
    {
      title: 'Actions',
      width: 90,
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Button
              onClick={() => save(record.key)}
              type="primary"
              style={{
                marginRight: 8,
              }}
              size="medium"
              icon={<SaveOutlined />}
            ></Button>
            <Popconfirm title="Are you sure want to discard?" onConfirm={cancel}>
              <Button type="danger" size="medium" icon={<CloseOutlined />}></Button>
            </Popconfirm>
          </span>
        ) : (
          <Button
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
            icon={<EditOutlined />}
            size="medium"
            type="secondary"
          ></Button>
        )
      },
      fixed: 'right',
    },
  ]
  const assignmentColumns = listAssignment
    .map((item, index) => ({
      title: (_) => (
        <Space className="d-flex flex-column-reverse align-items-center justify-content-center align-content-center">
          <Typography.Text>
            <Tooltip
              title={`${item.assignmentTitle} (${item.evalWeight}%) <${item.status}> ${item.final ? 'Is Final' : ''}`}
            >
              <Typography.Text>{`Assignment ${index + 1}`}</Typography.Text>
            </Tooltip>
            {data.length > 0 && item.status === 'Closed' && isEditable && (
              <Popover
                className="ml-2"
                content={
                  <Space className="d-flex flex-column w-100">
                    <Button
                      type="primary"
                      className="w-100"
                      onClick={() => {
                        setEvalSelected(item)
                        setOpen((prev) => ({ ...prev, import: true }))
                      }}
                    >
                      Import Evaluations
                    </Button>
                    <Popconfirm
                      title="Are you sure want to clear evaluations?"
                      onConfirm={() => {
                        handleClearEvaluation(item)
                      }}
                      okText="Confirm"
                    >
                      <Button type="primary" danger className="w-100">
                        Clear Evaluations
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title="Are you sure want to generate evaluations?"
                      onConfirm={() => {
                        handleGenerateEvaluation(item)
                      }}
                      okText="Confirm"
                    >
                      <Button type="primary" danger className="w-100">
                        Generate Evaluations
                      </Button>
                    </Popconfirm>
                  </Space>
                }
                trigger="click"
              >
                <Button size="small" icon={<EllipsisOutlined />}></Button>
              </Popover>
            )}
          </Typography.Text>
        </Space>
      ),
      dataIndex: item.assignmentId,
      key: item.status === 'Closed' ? index : Math.random(),
      editable: true,
      width: 90,
      hidden: filter.assignment.length === 0 ? false : !filter.assignment.includes(item.assignmentId),
      render: (_, assignmentEval) => {
        return {
          children: (
            <Typography.Text>
              <Typography.Text className="mr-2">
                {assignmentEval?.assignmentGrade[index]?.grade === null
                  ? null
                  : Number(assignmentEval?.assignmentGrade[index]?.grade)?.toFixed(2)}
              </Typography.Text>
              {isEditable && assignmentEval?.assignmentGrade[index]?.status === 'Closed' && (
                <Button
                  icon={<EllipsisOutlined />}
                  size="small"
                  onClick={() => {
                    setOpen((prev) => ({ ...prev, comment: true }))
                    console.log(assignmentEval)
                    console.log(assignmentEval?.assignmentGrade[index])
                    setCurrentComment({
                      classEval: assignmentEval,
                      assignment: assignmentEval?.assignmentGrade[index],
                    })
                  }}
                ></Button>
              )}
            </Typography.Text>
          ),
        }
      },
    }))
    .reverse()
    .concat(columns)
    .reverse()
    .concat(isEditable ? columnsAction : [])
    .filter((col) => !col.hidden)
  const mergedColumns = assignmentColumns.map((col) => {
    if (!Number.isInteger(col.key)) {
      return col
    }
    return {
      ...col,
      onCell: (record) => {
        return {
          record,
          inputType: col.dataIndex === 'comment' ? 'text' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }
      },
    }
  })

  const handleClearEvaluation = async (assignmentSelected) => {
    setLoading(true)
    const newData = [...data].map((item) => ({
      ...item,
      assignmentGrade: item.assignmentGrade.map((item2) => ({
        ...item2,
        grade: item2.assignmentId === assignmentSelected.assignmentId ? null : item2.grade,
      })),
    }))

    const params = {
      dto: newData.map((item) => ({
        accountName: item.userName,
        comment: item.comment,
        assignmentGrade: item.assignmentGrade.map((item2) => ({
          assignmentId: item2.assignmentId,
          grade: item2.grade,
          comment: item2.comment,
        })),
      })),
    }

    await evaluationApi
      .editClassEval(currentClass, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Clear Assignment Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Clear Assignment Evaluation failed, try again later!')
      })
      .finally(() => {
        loadData()
      })
  }

  const handleGenerateEvaluation = async (assignmentSelected) => {
    setLoading(true)

    // const newData = [...data].map((item) => ({
    //   ...item,
    //   assignmentGrade: item.assignmentGrade.map((item2) => ({
    //     ...item2,
    //     grade: item2.assignmentId === assignmentSelected.assignmentId ? null : item2.grade,
    //   })),
    // }))

    // const params = {
    //   dto: newData.map((item) => ({
    //     accountName: item.userName,
    //     comment: item.comment,
    //     assignmentGrade: item.assignmentGrade.map((item2) => ({
    //       assignmentId: item2.assignmentId,
    //       grade: item2.grade,
    //       comment: item2.comment,
    //     })),
    //   })),
    // }

    // await evaluationApi
    //   .editClassEval(currentClass, params)
    //   .then((response) => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    const params2 = {
      dto: data.map((item) => ({
        accountName: item.userName,
        assignmentGrade: [
          {
            assignmentId: assignmentSelected.assignmentId,
          },
        ],
      })),
    }

    await evaluationApi
      .generateClassEval(currentClass, params2)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Generate Assignment Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Generate Assignment Evaluation failed, try again later!')
      })
      .finally(() => {
        setLoading(false)
        setOpen((prev) => ({ ...prev, import: false }))
        loadData()
      })
  }

  const handleImportEval = async () => {
    const checkIsNumber = listImported.every((item) => !isNaN(item.Mark))
    const checkIsMark = listImported.every((item) => item.Mark <= 10 && item.Mark >= 0)

    if (!checkIsNumber) {
      toastMessage('error', 'Evaluation Mark must a number')
      return
    }
    if (!checkIsMark) {
      toastMessage('error', 'Evaluation Mark must between 0 and 10')
      return
    }

    //Check length of data is modified
    if (listImported.length === 0) {
      toastMessage('error', 'File uploaded must not empty, follow the template please')
      return
    }

    //Check length data is modified
    if (data.length !== listImported.length) {
      toastMessage('error', 'Number of student is modified, follow the template please')
      return
    }
    //Check username and fullname data is modified
    const checkModifiedUsername = data.every((item, index) => item.userName === listImported[index].UserName)
    const checkModifiedFullname = data.every((item, index) => item.fullName === listImported[index].FullName)

    if (!checkModifiedUsername) {
      toastMessage('error', 'Username of student is modified, follow the template please')
      return
    }
    if (!checkModifiedFullname) {
      toastMessage('error', 'FullName of student is modified, follow the template please')
      return
    }

    const newData = [...data]

    newData.forEach((item, index) => {
      item.assignmentGrade.forEach((item2) => {
        if (item2.assignmentId === evalSelected.assignmentId) {
          item2.grade = listImported[index].Mark
          item2.comment = listImported[index].Comment === undefined ? null : listImported[index].Comment
        }
      })
    })

    const params = {
      dto: newData.map((item) => ({
        accountName: item.userName,
        comment: item.comment,
        assignmentGrade: item.assignmentGrade.map((item2) => ({
          assignmentId: item2.assignmentId,
          grade: item2.grade,
          comment: item2.comment,
        })),
      })),
    }
    setLoading(true)

    await evaluationApi
      .editClassEval(currentClass, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Import Assignment Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Import Assignment Evaluation failed, try again later!')
      })
      .finally(() => {
        setOpen((prev) => ({ ...prev, import: false }))
        setLoading(false)
        loadData()
      })
  }

  const handleDownloadTemplateFile = () => {
    try {
      const listExport = [
        ...data.map((evaluation) => ({
          UserName: evaluation.userName,
          FullName: evaluation.fullName,
          Mark: evaluation.assignmentGrade.filter((item) => item.assignmentId === evalSelected.assignmentId)[0]?.grade,
          Comment: evaluation.assignmentGrade.filter((item) => item.assignmentId === evalSelected.assignmentId)[0]
            ?.comment,
        })),
      ]
      const ws = utils.json_to_sheet(listExport)
      const wb = utils.book_new()
      utils.sheet_add_aoa(ws, [['UserName', 'FullName', 'Mark', 'Comment']], { origin: 'A1' })
      var wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]
      ws['!cols'] = wscols
      utils.book_append_sheet(wb, ws, 'Data')
      writeFileXLSX(wb, 'MarkData.xlsx')
      toastMessage('success', 'Download Template Successfully')
    } catch {
      toastMessage('error', 'Download Template Failed, try again later')
    }
  }

  const handleExportMark = () => {
    try {
      let listExport = []
      let colName = ['UserName', 'FullName', 'Comment']
      let colWidth = [{ wch: 20 }, { wch: 20 }, { wch: 25 }]
      if (filter.assignment.length === 0) {
        listExport = [
          ...data.map((evaluation, index) => {
            let objectReturn = {
              UserName: evaluation.userName,
              FullName: evaluation.fullName,
              Comment: evaluation.comment,
            }
            evaluation.assignmentGrade.forEach((item, index) => {
              objectReturn = {
                ...objectReturn,
                [`${item.assingmentTitle} ${item.evalWeight}%`]: item.grade,
              }
            })

            return objectReturn
          }),
        ]

        listAssignment.forEach((item) => {
          colName.push(`${item?.assignmentTitle} ${item?.evalWeight}%`)
          colWidth.push({ wch: 15 })
        })
      } else {
      }
      const ws = utils.json_to_sheet(listExport)
      const wb = utils.book_new()
      utils.sheet_add_aoa(ws, [colName], { origin: 'A1' })
      var wscols = colWidth
      ws['!cols'] = wscols
      utils.book_append_sheet(wb, ws, 'Data')
      writeFileXLSX(wb, `MarkDataOf${currentClass}.xlsx`)
      toastMessage('success', 'Export Mark Successfully')
    } catch {
      toastMessage('error', 'Export Mark Failed, try again later')
    }
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
        const extensionFile = info.file.name.split('.').pop().toLowerCase()
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
            setListImported([])
            toastMessage('Error', 'Read file failed, try again later')
          }
        })

        readFile.then((data) => {
          setListImported(data)
        })
      }
    },
    onRemove(e) {
      setListImported([])
    },
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
                <div className="col-lg-12 p-0 m-0">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Class Evaluation</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="col-lg-12 m-b30 ">
                <div className="row">
                  <div className="col-lg-3">
                    <Cascader
                      style={{
                        width: '100%',
                      }}
                      placeholder="Select Assignment "
                      options={listAssignment.map((item, index) => ({
                        label: `Assignment ${index + 1}`,
                        value: item.assignmentId,
                      }))}
                      value={filter?.assignment.value}
                      onChange={(value, options) => {
                        const flatArray = value.flat()
                        setFilter((prev) => ({ ...prev, assignment: flatArray }))
                        console.log(flatArray)
                      }}
                      multiple
                      maxTagCount="responsive"
                    />
                  </div>
                  <div className="col-lg-3">
                    <Input.Search
                      className="w-100"
                      placeholder="Enter Student User Name"
                      allowClear
                      onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
                      value={filter?.search}
                      onSearch={(value) => {
                        if (value.trim() === '') {
                          setSearch('')
                        } else {
                          setSearch(value)
                        }
                      }}
                    />
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end">
                    {isEditable && (
                      <Button type="primary" className="ml-1" onClick={handleExportMark}>
                        Export Marks
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30 ">
                <Form form={form} component={false}>
                  <Table
                    loading={loading}
                    components={{
                      body: {
                        cell: EditableCell,
                      },
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    size="small"
                    pagination={false}
                    scroll={{
                      x: '100%',
                    }}
                  />
                </Form>

                {/* Modal Comment */}
                <Modal
                  title="Comments"
                  width={'55%'}
                  style={{ left: '30px' }}
                  open={open.comment}
                  okText="Save"
                  confirmLoading={loading}
                  onOk={async () => {
                    console.log(currentComment)
                    const params = {
                      dto: [
                        {
                          accountName: currentComment.classEval.userName,
                          comment: currentComment.classEval.comment,
                          assignmentGrade: [
                            {
                              assignmentId: currentComment.assignment.assignmentId,
                              grade: currentComment.assignment.grade,
                              comment: currentComment.assignment.comment,
                            },
                          ],
                        },
                      ],
                    }

                    await evaluationApi
                      .editClassEval(currentClass, params)
                      .then((response) => {
                        console.log(response)
                        toastMessage('success', 'Edit Comment Assignment successfully!')
                      })
                      .catch((error) => {
                        console.log(error)
                        toastMessage('error', 'Edit Comment Assignment failed, try again later!')
                      })
                      .finally(() => {
                        setOpen((prev) => ({ ...prev, comment: false }))
                        loadData()
                      })
                  }}
                  onCancel={() => setOpen((prev) => ({ ...prev, comment: false }))}
                >
                  <Space className="d-flex flex-column">
                    <Typography.Text
                      strong
                    >{`Student: ${currentComment.classEval.userName} (${currentComment.classEval.fullName})`}</Typography.Text>
                    <Typography.Text strong>{`${currentComment.assignment.assingmentTitle} (${
                      currentComment.assignment.evalWeight
                    }%): ${currentComment.assignment.grade ?? 0}`}</Typography.Text>
                    <Typography.Text className="mt-3" strong>
                      Comment
                    </Typography.Text>
                    <Input.TextArea
                      value={currentComment.assignment.comment}
                      onChange={(e) =>
                        setCurrentComment((prev) => ({
                          ...prev,
                          assignment: { ...prev.assignment, comment: e.target.value },
                        }))
                      }
                    />
                  </Space>
                </Modal>

                {/* Modal Import */}
                <Modal
                  title="Import Evaluations"
                  width={'55%'}
                  style={{ left: '30px' }}
                  open={open.import}
                  onOk={async () => {
                    handleImportEval()
                  }}
                  confirmLoading={loading}
                  onCancel={() => setOpen((prev) => ({ ...prev, import: false }))}
                >
                  <Space className="d-flex flex-column w-100">
                    <Typography.Text
                      strong
                      className="mb-2"
                    >{`Import Marks of the <${evalSelected.assignmentTitle}> (${evalSelected.evalWeight}%)`}</Typography.Text>
                    <Button type="link" onClick={handleDownloadTemplateFile} className="m-0 p-0 mb-2">
                      Download Import Template File
                    </Button>
                    <Upload.Dragger {...props} className="w-100">
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">
                        Support for a single upload. Strictly prohibit from uploading company data or other band files
                      </p>
                    </Upload.Dragger>
                  </Space>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ClassEvaluation
