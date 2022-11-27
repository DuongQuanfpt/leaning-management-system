import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Button, Select, Typography, Cascader, Table, Form, Popconfirm, InputNumber, Input } from 'antd'

// import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const originData = []
for (let i = 0; i < 23; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
}
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

const ClassEvaluation = () => {
  // const { id } = useParams()
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {}

  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey

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
    {
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      editable: false,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
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
              Cancel
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
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
  // const dropdownRender = (menus) => (
  //   <div>
  //     {menus}
  //     <Divider
  //       style={{
  //         margin: 0,
  //       }}
  //     />
  //     <div
  //       style={{
  //         padding: 8,
  //       }}
  //     >
  //       The footer is not very short.
  //     </div>
  //   </div>
  // )

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
                    <Select className="w-100" placeholder="Select Assignment">
                      <Select.Option key={1}>1</Select.Option>
                      <Select.Option key={2}>2</Select.Option>
                      <Select.Option key={3}>3</Select.Option>
                      <Select.Option key={4}>4</Select.Option>
                      <Select.Option key={5}>5</Select.Option>
                      <Select.Option key={6}>6</Select.Option>
                    </Select>
                  </div>
                  <div className="col-lg-3">
                    <Cascader
                      style={{
                        width: '100%',
                      }}
                      options={options}
                      onChange={onChange}
                      multiple
                      maxTagCount="responsive"
                    />{' '}
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
