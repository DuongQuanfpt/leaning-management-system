/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { utils, writeFileXLSX, read } from 'xlsx'

import {
  Breadcrumb,
  Button,
  Select,
  Typography,
  Table,
  Form,
  Popconfirm,
  InputNumber,
  Input,
  Space,
  message,
  Popover,
  Modal,
  Upload,
  Tooltip,
} from 'antd'

import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
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

const AssignementEvaluation = () => {
  const { milestoneId, groupId } = useParams()
  const { currentClass, roles } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [listFilter, setListFilter] = useState({
    milestone: [],
    group: [],
    criteria: [],
  })
  const [filter, setFilter] = useState({
    search: null,
  })

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [evalSelected, setEvalSelected] = useState({})
  const [open, setOpen] = useState({
    import: false,
    comment: false,
  })
  const [copyMode, setCopyMode] = useState(false)
  const [rowSelected, setRowSelected] = useState([])
  const [listImported, setListImported] = useState([])
  const [currentComment, setCurrentComment] = useState({
    assignmentEval: {},
    criteria: {},
  })
  const [listCriteriaSelectCopy, setListCriteriaSelectCopy] = useState([])
  const isEditing = (record) => record.key === editingKey
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    setIsEditable(false)
    setLoading(true)
    setFilter((prev) => ({ ...prev, search: null }))
    loadFilter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    setData([])
    setEditingKey('')
    setCopyMode(false)
    const milestoneSelect = listFilter?.milestone?.filter((item) => item.milestoneId === filter?.milestone?.value)
    const listGroup = milestoneSelect[0]?.groupFilter
    const listCriteria = milestoneSelect[0]?.criteriaFilter
    setListFilter((prev) => ({ ...prev, group: listGroup }))
    setListFilter((prev) => ({ ...prev, criteria: listCriteria }))
    setFilter((prev) => ({ ...prev, group: null, criteria: null }))
    console.log(milestoneSelect)
    if (milestoneSelect[0]?.teamWork === false) {
      loadData(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.milestone?.value])

  useEffect(() => {
    if (filter?.group?.value) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.group?.value])

  const loadFilter = async () => {
    evaluationApi
      .getAssignmentEvalFilter(currentClass)
      .then((response) => {
        setFilter({})
        setData([])
        setListFilter((prev) => ({ ...prev, milestone: response.milestones }))

        if (milestoneId && groupId) {
          const milestoneSelect = response.milestones.filter((item) => item.milestoneId === +milestoneId)
          if (milestoneSelect.length !== 0) {
            setFilter((prev) => ({
              ...prev,
              milestone: {
                label: milestoneSelect[0]?.milestoneName,
                value: milestoneSelect[0]?.milestoneId,
              },
            }))
          } else {
            setFilter((prev) => ({ ...prev, milestone: null }))
          }

          const listGroup = milestoneSelect[0]?.groupFilter
          const listCriteria = milestoneSelect[0]?.criteriaFilter

          setListFilter((prev) => ({ ...prev, group: listGroup }))
          setListFilter((prev) => ({ ...prev, criteria: listCriteria }))

          const groupSelect = listGroup?.filter((item) => item.groupId === +groupId)
          if (groupSelect) {
            setFilter((prev) => ({
              ...prev,
              group: {
                label: groupSelect[0]?.groupName,
                value: groupSelect[0]?.groupId,
              },
            }))
          } else {
            setFilter((prev) => ({ ...prev, group: null }))
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }
  const loadData = async (teamwork = true) => {
    setLoading(true)
    let params = {}
    if (teamwork === false) {
      params.milestoneId = filter?.milestone?.value
    } else {
      params.milestoneId = filter?.milestone?.value
      params.groupId = filter?.group?.value
    }

    evaluationApi
      .getAssignmentEvalList(filter?.milestone?.value, params)
      .then((response) => {
        console.log(response)
        setData(response.listResult.map((item, index) => ({ ...item, key: index })))
        setIsEditable(response.editable)
        if (roles.includes('trainee')) {
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

  //Edit row on table
  const edit = (record) => {
    // console.log(record)
    // form.setFieldsValue({
    //   bonusGrade: 0,
    //   ...record,
    // })
    form.resetFields()
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    //Get data row edit
    const rowUpdated = data[key]
    try {
      const row = await form.validateFields()
      //Get data form
      console.log(row)
      console.log(rowUpdated)

      if (row.bonusGrade > 2 || row.bonusGrade < -2) {
        toastMessage('error', 'Bonus / Penalty must between -2 and 2')
        return
      }
      rowUpdated.bonusGrade = row.bonusGrade
      rowUpdated.comment = row.comment
      delete row.bonusGrade
      delete row.comment
      rowUpdated.criteriaPoints = rowUpdated.criteriaPoints.map((item, index) => ({
        ...item,
        grade: row[Object.keys(row)[index]],
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

      const finalGrade =
        rowUpdated.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
        (rowUpdated?.workGrade * rowUpdated?.workWeight) / 100 +
        (rowUpdated.bonusGrade ?? 0)

      const params = {
        evalList: [
          {
            submitId: rowUpdated.submitId,
            comment: rowUpdated.comment,
            bonus: rowUpdated.bonusGrade,
            grade: finalGrade.toFixed(2),
            workGrade: rowUpdated.workGrade,
            workPoint: rowUpdated.workPoint,
            workCriteriaId: rowUpdated.workCriteriaId,
            criteria: rowUpdated.criteriaPoints.map((item) => ({
              criteriaId: item.criteriaId,
              grade: item.grade,
              comment: item.comment,
            })),
          },
        ],
      }

      await evaluationApi
        .editAssignment(filter?.milestone?.value, params)
        .then((response) => {
          console.log(response)
          toastMessage('success', 'Edit Evaluation successfully!')
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => loadData())

      //Disable Edit Mode
      setEditingKey('')
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const columns = [
    {
      title: 'Comments',
      dataIndex: 'comment',
      key: Math.random(),
      width: 150,
      editable: true,
      fixed: 'left',
    },
    {
      title: () => (
        <Tooltip title="Bonus / Penalty">
          <Typography.Text>B/P</Typography.Text>
        </Tooltip>
      ),
      dataIndex: 'bonusGrade',
      key: Math.random(),
      width: 35,
      editable: true,
      fixed: 'left',
      render: (_, { bonusGrade }) => (bonusGrade === null ? null : bonusGrade.toFixed(2)),
    },
    {
      title: 'WP',
      dataIndex: 'workPoint',
      key: Math.random(),
      width: 35,
      editable: false,
      fixed: 'left',
      render: (_, { workPoint }) => (workPoint === null ? null : workPoint.toFixed(2)),
    },
    {
      title: 'WG',
      dataIndex: 'workGrade',
      key: Math.random(),
      width: 35,
      editable: false,
      fixed: 'left',
      render: (_, { workGrade }) => (workGrade === null ? null : workGrade.toFixed(2)),
    },
    {
      title: () => (
        <Tooltip title="Mark">
          <Typography.Text>M</Typography.Text>
        </Tooltip>
      ),
      width: 35,
      dataIndex: 'milestoneGrade',
      key: Math.random(),
      editable: false,
      fixed: 'left',
      render: (_, { milestoneGrade }) => (milestoneGrade === null ? null : milestoneGrade.toFixed(2)),
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: Math.random(),
      width: 100,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'Student',
      dataIndex: 'userName',
      key: Math.random(),
      width: 100,
      editable: false,
      fixed: 'left',
    },
  ]
  const columnsAction = [
    {
      title: 'Actions',
      width: 60,
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
            disabled={editingKey !== '' || copyMode}
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
  const criteriaColumns = listFilter?.criteria
    ?.map((item, index) => ({
      title: (_) => (
        <Space className="d-flex flex-column-reverse align-items-center justify-content-center align-content-center">
          <Typography.Text>
            <Tooltip title={`${item.criteriaTitle} (${item.weight}%)`}>
              <Typography.Text>{`Criteria ${index + 1}`}</Typography.Text>
            </Tooltip>
            {data.length > 0 && isEditable && (
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
                        setEvalSelected(item)
                        handleClearEvaluation(item)
                      }}
                      okText="Confirm"
                    >
                      <Button type="primary" danger className="w-100">
                        Clear Evaluations
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
      dataIndex: item.criteriaId,
      key: Math.random(),
      editable: true,
      width: 65,
      render: (_, assignmentEval) => (
        <Typography.Text>
          <Typography.Text className="mr-2">
            {assignmentEval?.criteriaPoints[index]?.grade === null
              ? null
              : Number(assignmentEval?.criteriaPoints[index]?.grade)?.toFixed(2)}
          </Typography.Text>
          {isEditable && (
            <Button
              icon={<EllipsisOutlined />}
              size="small"
              onClick={() => {
                setOpen((prev) => ({ ...prev, comment: true }))
                setCurrentComment({
                  assignmentEval: assignmentEval,
                  criteria: assignmentEval.criteriaPoints[index],
                })
              }}
            ></Button>
          )}
        </Typography.Text>
      ),
    }))
    .reverse()
    .concat(columns)
    .reverse()
    .concat(isEditable ? columnsAction : [])

  const mergedColumns = criteriaColumns?.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'bonusGrade' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: col.dataIndex === 'bonusGrade' && record.userName === 'Group' ? false : isEditing(record),
      }),
    }
  })

  const handleCopyGroupEval = async () => {
    if (listCriteriaSelectCopy.length === 0) {
      toastMessage('error', 'You must choose at least one evaluation')
      return
    }
    console.log(rowSelected)
    const groupData = data[0]

    console.log(listCriteriaSelectCopy)

    rowSelected.forEach((item) => {
      item.criteriaPoints.forEach((item2, index) => {
        if (listCriteriaSelectCopy.includes(item2.criteriaId)) {
          item2.grade = groupData.criteriaPoints[index].grade
        }
      })
    })

    console.log(rowSelected)

    const params = {
      evalList: rowSelected.map((item) => ({
        submitId: item.submitId,
        comment: item.comment,
        bonus: item.bonusGrade,
        grade: (
          item.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
          (item.workGrade * item.workWeight) / 100 +
          item.bonusGrade
        ).toFixed(2),

        workGrade: item.workGrade,
        workPoint: item.workPoint,
        workCriteriaId: item.workCriteriaId,
        criteria: item.criteriaPoints.map((item) => ({
          criteriaId: item.criteriaId,
          grade: item.grade,
          comment: item.comment,
        })),
      })),
    }

    await evaluationApi
      .editAssignment(filter?.milestone?.value, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Copy Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Copy Evaluation failed, try again later')
      })
      .finally(() => {
        setCopyMode(false)
        setRowSelected([])
        loadData()
      })
  }

  const handleClearEvaluation = async (evaluation) => {
    const newData = [...data]

    newData.forEach((item) => {
      item.criteriaPoints.forEach((item2) => {
        if (item2.criteriaId === evaluation.criteriaId) {
          item2.grade = null
        }
      })
    })
    const params = {
      evalList: newData.map((item) => ({
        submitId: item.submitId,
        comment: item.comment,
        bonus: item.bonusGrade,
        grade: (
          item.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
          (item.workGrade * item.workWeight) / 100 +
          item.bonusGrade
        ).toFixed(2),

        workGrade: item.workGrade,
        workPoint: item.workPoint,
        workCriteriaId: item.workCriteriaId,
        criteria: item.criteriaPoints.map((item) => ({
          criteriaId: item.criteriaId,
          grade: item.grade,
          comment: item.comment,
        })),
      })),
    }
    await evaluationApi
      .editAssignment(filter?.milestone?.value, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Clear Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Clear Evaluation failed, try again later')
      })
      .finally(() => {
        loadData()
      })
  }

  const handleDownloadtemplateFile = () => {
    try {
      const listExport = [
        ...data.map((evaluation) => ({
          UserName: evaluation.userName,
          FullName: evaluation.fullName,
          Evaluation: evaluation.criteriaPoints.filter((item) => item.criteriaId === evalSelected.criteriaId)[0]?.grade,
          Comment: evaluation.criteriaPoints.filter((item) => item.criteriaId === evalSelected.criteriaId)[0]?.comment,
        })),
      ]
      const ws = utils.json_to_sheet(listExport)
      const wb = utils.book_new()
      utils.sheet_add_aoa(ws, [['UserName', 'FullName', 'Evaluation', 'Comment']], { origin: 'A1' })
      var wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }]
      ws['!cols'] = wscols
      utils.book_append_sheet(wb, ws, 'Data')
      writeFileXLSX(wb, 'EvaluationData.xlsx')
      toastMessage('success', 'Download Template Successfully')
    } catch {
      toastMessage('error', 'Download Template Failed, try again later')
    }
  }

  const handleImportEval = async () => {
    console.log(data)
    console.log(listImported)
    //Check length of data is modified
    if (listImported.length === 0) {
      toastMessage('error', 'File uploaded must not empty, follow the template please')
      return
    }
    //Check Eval mark is number and must between 0 and 10
    const checkIsNumber = listImported.every((item) => !isNaN(item.Evaluation))
    const checkIsMark = listImported.every((item) => item.Evaluation <= 10 && item.Evaluation >= 0)
    if (!checkIsNumber) {
      toastMessage('error', 'Evaluation Mark must a number')
      return
    }
    if (!checkIsMark) {
      toastMessage('error', 'Evaluation Mark must between 0 and 10')
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
      item.criteriaPoints.forEach((item2) => {
        if (item2.criteriaId === evalSelected.criteriaId) {
          item2.grade = listImported[index].Evaluation
          item2.comment = listImported[index].Comment
        }
      })
    })

    const params = {
      evalList: newData.map((item) => ({
        submitId: item.submitId,
        comment: item.comment,
        bonus: item.bonusGrade,
        grade: (
          item.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
          (item.workGrade * item.workWeight) / 100 +
          item.bonusGrade
        ).toFixed(2),
        workGrade: item.workGrade,
        workPoint: item.workPoint,
        workCriteriaId: item.workCriteriaId,
        criteria: item.criteriaPoints.map((item) => ({
          criteriaId: item.criteriaId,
          grade: item.grade,
          comment: item.comment,
        })),
      })),
    }

    await evaluationApi
      .editAssignment(filter?.milestone?.value, params)
      .then((response) => {
        console.log(response)
        toastMessage('success', 'Import Evaluation successfully!')
      })
      .catch((error) => {
        console.log(error)
        toastMessage('error', 'Import Evaluation failed, try again later')
      })
      .finally(() => {
        setCopyMode(false)
        setRowSelected([])
        loadData()
        setOpen((prev) => ({ ...prev, import: false }))
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

  const customLocale = {
    emptyText: !filter.milestone?.value
      ? 'Select Milestone to see Evaluation'
      : !filter?.group?.value
      ? 'Select Group to see Evaluation'
      : 'No Data',
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
                    <Breadcrumb.Item>Assignment Evaluation</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="col-lg-12 m-b30 ">
                <div className="row">
                  <div className="col-lg-2">
                    <Select
                      className="w-100"
                      placeholder="Select Assignment"
                      value={filter.milestone}
                      options={listFilter?.milestone?.map((item) => ({
                        label: item.milestoneName,
                        value: item.milestoneId,
                      }))}
                      onChange={(value, options) => setFilter((prev) => ({ ...prev, milestone: options }))}
                    />
                  </div>
                  <div className="col-lg-2">
                    <Select
                      className="w-100"
                      placeholder="Select Group"
                      disabled={!filter.milestone}
                      value={filter.group}
                      options={listFilter?.group?.map((item) => ({
                        label: item.groupName,
                        value: item.groupId,
                      }))}
                      onChange={(value, options) => setFilter((prev) => ({ ...prev, group: options }))}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Input.Search
                      className="w-100"
                      placeholder="Input exactly student want to edit"
                      onChange={(e) => setFilter((prev) => ({ ...prev, search: e.target.value }))}
                      value={filter?.search}
                      onSearch={(value) => {
                        const result = data.filter((item) => item.userName === value)
                        if (result.length === 0) {
                          toastMessage('error', 'No student matched!')
                        } else {
                          toastMessage('success', `Found ${value}`)
                          if (isEditable) {
                            edit(result[0])
                          }
                        }
                      }}
                    />
                  </div>
                  {isEditable && (
                    <div className="col-lg-4 d-flex justify-content-end">
                      {copyMode ? (
                        <>
                          <Button
                            type="secondary"
                            className="ml-2"
                            onClick={() => {
                              setRowSelected([])
                              setCopyMode(false)
                            }}
                          >
                            Cancel
                          </Button>
                          <Popconfirm
                            title={() => (
                              <Space className="d-flex flex-column">
                                <Typography.Text>Select evaluation want to copy</Typography.Text>
                                <Select
                                  mode="multiple"
                                  className="w-100 mb-3"
                                  placeholder="Select Evaluation"
                                  options={listFilter?.criteria?.map((item) => ({
                                    label: item.criteriaTitle,
                                    value: item.criteriaId,
                                  }))}
                                  onChange={(value, options) => {
                                    setListCriteriaSelectCopy(value)
                                  }}
                                />
                                <Typography.Text strong>Are you sure want to copy group evaluation?</Typography.Text>
                              </Space>
                            )}
                            onConfirm={handleCopyGroupEval}
                            okText="Confirm"
                            placement="left"
                            disabled={rowSelected.length === 0}
                          >
                            <Button type="primary" className="ml-2" disabled={rowSelected.length === 0}>
                              Save
                            </Button>
                          </Popconfirm>
                        </>
                      ) : (
                        <>
                          {/* <Button type="secondary" className="ml-2" disabled={data.length === 0}>
                          Export Marks
                        </Button> */}
                          <Button
                            type="primary"
                            className="ml-2"
                            onClick={() => {
                              if (data[0]?.userName !== 'Group') {
                                toastMessage(
                                  'error',
                                  "Can't Copy Group Evaluaion because this milestone is working individually",
                                )
                                return
                              }
                              setCopyMode(true)
                              setEditingKey('')
                              setListCriteriaSelectCopy([])
                            }}
                            disabled={data.length === 0 || editingKey !== ''}
                          >
                            Copy Group Evaluation
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Table */}
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
                    size="small"
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    scroll={{
                      x: '100%',
                    }}
                    rowSelection={
                      copyMode && {
                        type: 'checkbox',
                        onChange: (selectedRowKeys, selectedRows) => {
                          setRowSelected(selectedRows)
                        },
                        getCheckboxProps: (record) => ({
                          disabled: record.userName === 'Group',
                        }),
                      }
                    }
                    locale={customLocale}
                  />
                </Form>
              </div>

              {/* Modal Import */}
              <Modal
                title="Import Evaluations"
                width={'55%'}
                style={{ left: '30px' }}
                open={open.import}
                onOk={async () => {
                  handleImportEval()
                }}
                onCancel={() => setOpen((prev) => ({ ...prev, import: false }))}
              >
                <Space className="d-flex flex-column w-100">
                  <Typography.Text
                    strong
                    className="mb-2"
                  >{`Import Evaluations of the <${evalSelected.criteriaTitle}> (${evalSelected.weight}%)`}</Typography.Text>
                  <Button type="link" onClick={handleDownloadtemplateFile} className="m-0 p-0 mb-2">
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
              {/* Modal Comment */}
              <Modal
                title="Comments"
                width={'55%'}
                style={{ left: '30px' }}
                open={open.comment}
                okText="Save"
                onOk={async () => {
                  console.log(currentComment)
                  const finalGrade =
                    currentComment.assignmentEval.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
                    (currentComment.assignmentEval.workGrade * currentComment.assignmentEval.workWeight) / 100 +
                    currentComment.assignmentEval.bonusGrade
                  const params = {
                    evalList: [
                      {
                        submitId: currentComment.assignmentEval.submitId,
                        comment: currentComment.assignmentEval.comment,
                        bonus: currentComment.assignmentEval.bonusGrade,
                        grade: finalGrade.toFixed(2),
                        workGrade: currentComment.assignmentEval.workGrade,
                        workPoint: currentComment.assignmentEval.workPoint,
                        workCriteriaId: currentComment.assignmentEval.workCriteriaId,
                        criteria: [
                          {
                            criteriaId: currentComment.criteria.criteriaId,
                            grade: currentComment.criteria.grade,
                            comment: currentComment.criteria.comment,
                          },
                        ],
                      },
                    ],
                  }

                  console.log(params)
                  await evaluationApi
                    .editAssignment(filter?.milestone?.value, params)
                    .then((response) => {
                      console.log(response)
                      toastMessage('success', 'Edit Comment Evaluation successfully!')
                    })
                    .catch((error) => {
                      console.log(error)
                      toastMessage('error', 'Edit Comment Evaluation failed, try again later!')
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
                  >{`Student: ${currentComment.assignmentEval.userName} (${currentComment.assignmentEval.fullName})`}</Typography.Text>
                  <Typography.Text strong>{`${currentComment.criteria.criteriaTitle} (${
                    currentComment.criteria.weight
                  }%): ${currentComment.criteria.grade ?? 0}`}</Typography.Text>
                  <Typography.Text className="mt-3" strong>
                    Comment
                  </Typography.Text>
                  <Input.TextArea
                    value={currentComment.criteria.comment}
                    onChange={(e) =>
                      setCurrentComment((prev) => ({
                        ...prev,
                        criteria: { ...prev.criteria, comment: e.target.value },
                      }))
                    }
                  />
                </Space>
              </Modal>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AssignementEvaluation
