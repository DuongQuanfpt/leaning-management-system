import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
  Popover,
  Space,
  Tooltip,
} from 'antd'

// import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import evaluationApi from '~/api/evaluationApi'
import { useSelector } from 'react-redux'
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
  // const { id } = useParams()
  const { currentClass } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({
    assignment: {
      label: '',
    },
  })
  const [listAssignment, setListAssignment] = useState([])
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey

  useEffect(() => {
    loadFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadFilter = async () => {
    const params = {
      classCode: currentClass,
    }
    setLoading(true)
    evaluationApi
      .getClassEval(params)
      .then((response) => {
        console.log(response)
        setListAssignment(response.assingmentFilter)
        setData(response.listResult)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

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
  const columns = [
    { title: 'Comments', dataIndex: 'comment', editable: true, width: 220, fixed: 'left' },
    { title: 'Final', dataIndex: 'finalEval', editable: false, width: 70, fixed: 'left' },
    { title: 'OG', dataIndex: 'ongoing', editable: false, width: 70, fixed: 'left' },
    { title: 'GPA', dataIndex: 'gpa', editable: false, width: 70, fixed: 'left' },
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
            {data.length > 0 && item.status === 'Closed' && (
              <Popover
                className="ml-2"
                content={
                  <Space className="d-flex flex-column w-100">
                    <Button type="primary" className="w-100" onClick={() => {}}>
                      Import Evaluations
                    </Button>
                    <Popconfirm title="Are you sure want to clear evaluations?" onConfirm={() => {}} okText="Confirm">
                      <Button type="primary" danger className="w-100">
                        Clear Evaluations
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title="Are you sure want to generate evaluations?"
                      onConfirm={() => {}}
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
      dataIndex: item.criteriaId,
      key: Math.random(),
      editable: true,
      width: 90,

      render: (_, assignmentEval) => {
        return {
          // props: {
          //   style: {
          //     backgroundColor:
          //       assignmentEval.assignmentGrade[index]?.status === 'Open'
          //         ? '#d5f2bb'
          //         : assignmentEval.assignmentGrade[index]?.status === 'In_Progress'
          //         ? '#b7dcfa'
          //         : '#fac8c3',
          //   },
          // },
          children: (
            <Typography.Text>
              <Typography.Text className="mr-2">{assignmentEval.assignmentGrade[index]?.grade}</Typography.Text>
              <Button icon={<EllipsisOutlined />} size="small" onClick={() => {}}></Button>
            </Typography.Text>
          ),
        }
      },
    }))
    .reverse()
    .concat(columns)
    .reverse()
    .concat(columnsAction)
  const mergedColumns = assignmentColumns.map((col) => {
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

  const options = [
    {
      label: 'Light',
      value: 'light',
      render: (_, item) => `${item} 1`,
    },
    {
      label: 'Bamboo',
      value: 'bamboo',
      render: (_, item) => `${item} 1`,
    },
  ]
  const onChange = (value) => {
    console.log(value)
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
                    <Select
                      mode="multiple"
                      className="w-100"
                      placeholder="Select Assignment"
                      options={listAssignment.map((item) => ({
                        label: item.assignmentTitle,
                        value: item.assignmentId,
                      }))}
                      value={filter?.assignment.value}
                      onChange={(value, options) => setFilter((prev) => ({ ...prev, assignment: options }))}
                    ></Select>
                  </div>
                  <div className="col-lg-3"></div>
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
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    size="small"
                    pagination={{
                      onChange: cancel,
                      pageSize: 8,
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

export default ClassEvaluation
