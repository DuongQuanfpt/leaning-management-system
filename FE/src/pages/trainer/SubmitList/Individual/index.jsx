import React, { useState, useEffect } from 'react'
import { Button, Pagination, Space, Table, Tag } from 'antd'

import submitApi from '~/api/submitApi'
import { useSelector } from 'react-redux'
import Tooltip from 'antd/es/tooltip'
import { EyeOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const Individual = ({ milestoneId }) => {
  let ITEM_PER_PAGE = 10
  const { currentClass, username } = useSelector((state) => state.profile)
  const navigateTo = useNavigate()

  const [loading, setLoading] = useState(false)

  const [tableData, setTableData] = useState({
    listData: [],
    currentPage: 1,
    totalItem: 1,
  })

  const [filter, setFilter] = useState({})

  useEffect(() => {
    if (milestoneId !== null) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass, milestoneId])

  const loadData = async (page, filter) => {
    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      isGroup: false,
      milestoneId: milestoneId,
    }
    setLoading(true)
    await submitApi
      .getListSubmit(currentClass, params)
      .then((response) => {
        console.log(response)
        setTableData((prev) => ({
          ...prev,
          listData: response.listResult,
          currentPage: response.page,
          totalItem: response.totalItem,
        }))
      })
      .then(() => setLoading(false))
      .catch((error) => {
        setLoading(false)
        console.log(error)
      })
  }

  const handleChangePage = (pageNumber) => {
    setTableData((prev) => ({ ...prev, currentPage: pageNumber }))
    loadData(pageNumber, filter)
  }

  const columns = [
    { title: 'Assignment', dataIndex: 'assignmentTitle', width: '18%' },
    { title: 'Milestone', dataIndex: 'milestoneTitle', width: '18%' },
    { title: 'Trainee Assigned', dataIndex: 'traineeTitle', width: '18%' },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      render: (_, { status }) => (
        <Tag color={status === 'Pending' ? 'green' : status === 'Submited' ? 'magenta' : 'purple'}> {status}</Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdate',
      width: '20%',
      render: (_, { lastUpdate }) => lastUpdate?.slice(0, -4),
    },
    {
      title: 'Actions',
      dataIndex: '',
      width: '15%',
      render: (_, submit) => (
        <Space size="middle" align="baseline">
          {username === submit.traineeTitle ? (
            <Tooltip title="Submit" placement="top">
              <Button
                shape="circle"
                type="primary"
                icon={<UploadOutlined />}
                onClick={() => {
                  navigateTo(`/new-submit/${submit.submitId}`)
                }}
              ></Button>
            </Tooltip>
          ) : (
            <Button></Button>
          )}
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/submit-detail/${submit.submitId}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

  const customLocaleWhenEmpty = {
    emptyText: milestoneId !== null ? 'No Data' : 'Select Milestone To Load Submit',
  }

  return (
    <div className="widget-inner">
      <Table
        dataSource={tableData.listData}
        columns={columns}
        loading={loading}
        locale={customLocaleWhenEmpty}
        pagination={false}
      />
      <div className="d-flex justify-content-end mt-3">
        {tableData.totalItem >= 10 && (
          <Pagination
            current={tableData.currentPage}
            total={tableData.totalItem}
            onChange={handleChangePage}
            showSizeChanger
            onShowSizeChange={(current, pageSize) => {
              ITEM_PER_PAGE = pageSize
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Individual
