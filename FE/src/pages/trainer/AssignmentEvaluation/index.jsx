import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

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
} from 'antd'

import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { CloseOutlined, EditOutlined, EllipsisOutlined, SaveOutlined } from '@ant-design/icons'

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
  const { currentClass } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [listFilter, setListFilter] = useState({
    milestone: [],
    group: [],
    criteria: [],
  })
  const [filter, setFilter] = useState({
    search: null,
  })
  const [columnTable, setColumnsTable] = useState([])

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const [evalSelected, setEvalSelected] = useState({})
  const [open, setOpen] = useState(false)
  const isEditing = (record) => record.key === editingKey

  useEffect(() => {
    setLoading(true)
    setFilter((prev) => ({ ...prev, search: null }))
    loadFilter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    setData([])
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
        console.log(response)
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
    console.log(record)
    form.setFieldsValue({
      bonusGrade: 0,
      ...record,
    })
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

      if (row.bonusGrade > 2 || row.bonusGrade < -2) {
        toastMessage('error', 'Bonus / Penalty must between -2 and 2')
        return
      }
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
      console.log(rowUpdated)

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
        evalList: [
          {
            submitId: rowUpdated.submitId,
            comment: rowUpdated.comment,
            bonus: rowUpdated.bonusGrade,
            grade:
              rowUpdated.criteriaPoints.reduce((a, b) => a + (b.weight * +b.grade) / 100, 0) +
              (rowUpdated.workGrade * rowUpdated.workWeight) / 100 +
              rowUpdated.bonusGrade,
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

      console.log(params)

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

      console.log(params)

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
      width: 100,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Bonus/ Penalty',
      dataIndex: 'bonusGrade',
      key: Math.random(),
      width: 80,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'WP',
      dataIndex: 'workPoint',
      key: Math.random(),
      width: 50,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'WG',
      dataIndex: 'workGrade',
      key: Math.random(),
      width: 50,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'Mark',
      width: 50,
      dataIndex: 'milestoneGrade',
      key: Math.random(),
      editable: false,
      fixed: 'left',
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
  const criteriaColumns = listFilter?.criteria
    ?.map((item, index) => ({
      title: (_) => (
        <Space className="d-flex flex-column-reverse align-items-center justify-content-center align-content-center">
          <Typography.Text>
            {`${item.criteriaTitle} (${item.weight}%)`}
            {data.length > 0 && (
              <Popover
                className="ml-2"
                content={
                  <Space className="d-flex flex-column w-100">
                    <Button
                      type="primary"
                      className="w-100"
                      onClick={() => {
                        setOpen(true)
                      }}
                    >
                      Import Evaluations
                    </Button>
                    <Button type="primary" danger className="w-100" onClick={() => setEvalSelected(item)}>
                      Clear Evaluations
                    </Button>
                  </Space>
                }
                trigger="hover"
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
      width: 100,
      render: (_, { criteriaPoints }) => criteriaPoints[index]?.grade,
    }))
    .reverse()
    .concat(columns)
    .reverse()
    .concat(columnsAction)

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
        editing: isEditing(record),
      }),
    }
  })

  const handleCopyGroupEval = async () => {
    console.log(data)
    if (data[0]?.userName !== 'Group') {
      toastMessage('error', "Can't Copy Group Evaluaion because this milestone is working individually")
      return
    }
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
                  <div className="col-lg-3">
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
                          edit(result[0])
                        }
                      }}
                    />
                  </div>
                  <div className="col-lg-5 d-flex justify-content-end">
                    <Button type="secondary" className="ml-2" disabled={data.length === 0}>
                      Export Marks
                    </Button>
                    <Button type="primary" className="ml-2" onClick={handleCopyGroupEval} disabled={data.length === 0}>
                      Copy Group Evaluation
                    </Button>
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
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: cancel,
                      pageSize: 999,
                    }}
                    scroll={{
                      x: '100%',
                    }}
                  />
                </Form>
              </div>

              <Modal
                title="Import Evaluations"
                width={'55%'}
                style={{ left: '30px' }}
                open={open}
                onOk={() => {
                  console.log('ok modal')
                }}
                onCancel={() => setOpen(false)}
              >
                <Space>
                  <Typography.Text>Import upload here</Typography.Text>
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
