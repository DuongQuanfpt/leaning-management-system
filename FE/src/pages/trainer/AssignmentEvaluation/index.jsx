import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import {
  Breadcrumb,
  Button,
  Select,
  Typography,
  Cascader,
  Table,
  Form,
  Popconfirm,
  InputNumber,
  Input,
  Divider,
  Space,
} from 'antd'

import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

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
              message: `Please Input ${title}!`,
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
  const [filter, setFilter] = useState({})

  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey

  useEffect(() => {
    setLoading(true)
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  useEffect(() => {
    const milestoneSelect = listFilter?.milestone?.filter((item) => item.milestoneId === filter?.milestone?.value)
    const listGroup = milestoneSelect[0]?.groupFilter
    const listCriteria = milestoneSelect[0]?.criteriaFilter
    setListFilter((prev) => ({ ...prev, group: listGroup }))
    setListFilter((prev) => ({ ...prev, criteria: listCriteria }))
    setFilter((prev) => ({ ...prev, group: null, criteria: null }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.milestone?.value])

  useEffect(() => {
    if (filter?.group?.value) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter?.group?.value])

  const loadData = async () => {
    setLoading(true)
    const params = {
      groupId: filter?.group?.value,
      milestoneId: filter?.milestone?.value,
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

  //Edit row on table
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
      console.log(data)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }
  const criteriaColumns = listFilter.criteria?.map((item, index) => ({
    title: item.criteriaTitle,
    dataIndex: 'criteriaPoints',
    editable: false,
    width: 100,
    render: (_, { criteriaPoints }) => criteriaPoints[index]?.grade,
  }))

  // listFilter.criteria?.map((item, index) => ({
  //   title: item.criteriaTitle,
  //   dataIndex: 'criteriaPoints',
  //   editable: false,
  //   width: 100,
  //   render: (_, { criteriaPoints }) => criteriaPoints[index]?.grade,
  // })),

  const columns = [
    {
      title: 'Student',
      dataIndex: 'userName',
      width: 100,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      width: 100,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'Mark',
      width: 50,
      dataIndex: 'workWeight',
      editable: false,
      fixed: 'left',
    },
    {
      title: 'WG',
      dataIndex: 'workGrade',
      width: 50,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'WP',
      dataIndex: 'workPoint',
      width: 50,
      editable: false,
      fixed: 'left',
    },
    {
      title: 'Bonus/ Penalty',
      dataIndex: 'bonusGrade',
      width: 80,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Comments',
      dataIndex: 'comment',
      width: 100,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Actions',
      width: 90,
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link type="danger">Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      },
      fixed: 'right',
    },
  ]

  const mergedColumns = [...columns].map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

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
                  <div className="col-lg-2">
                    <Cascader
                      style={{
                        width: '100%',
                      }}
                      disabled={!filter.milestone}
                      placeholder="Select Criteria"
                      options={listFilter?.criteria?.map((item) => ({
                        label: item.criteriaTitle,
                        value: item.criteriaId,
                      }))}
                      onChange={(value, values) => {
                        setFilter((prev) => ({ ...prev, criteria: values }))
                        console.log(values)
                      }}
                      multiple
                      maxTagCount="responsive"
                    />
                  </div>
                  <div className="col-lg-6 d-flex justify-content-end">
                    <Button type="primary" className="ml-1">
                      Export Marks
                    </Button>
                    <Button type="primary" className="ml-1">
                      Edit Marks
                    </Button>
                    <Button type="primary" className="ml-1">
                      Save Changes
                    </Button>
                    <Button type="primary" className="ml-1">
                      Reverse Changes
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
                    columns={criteriaColumns}
                    rowClassName="editable-row"
                    pagination={{
                      onChange: cancel,
                    }}
                    scroll={{
                      x: '100%',
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AssignementEvaluation
