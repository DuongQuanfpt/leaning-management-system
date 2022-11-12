import React, { useState, useEffect } from 'react'
import { Pagination, Table, Tag } from 'antd'

import submitApi from '~/api/submitApi'
import { useSelector } from 'react-redux'

const Group = ({ milestoneId }) => {
  let ITEM_PER_PAGE = 10
  const { currentClass } = useSelector((state) => state.profile)
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
      isGroup: true,
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
    { title: 'Assignment', dataIndex: 'assignmentTitle' },
    { title: 'Milestone', dataIndex: 'milestoneTitle' },
    { title: 'Group', dataIndex: 'groupTitle' },
    { title: 'Trainee Assigned', dataIndex: 'traineeTitle' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <Tag color={status === 'Pending' ? 'green' : status === 'Submited' ? 'magenta' : 'purple'}> {status}</Tag>
      ),
    },
    { title: 'Last Updated', dataIndex: 'lastUpdate' },
    { title: 'Actions', dataIndex: '' },
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
        {tableData.listData.length >= 10 && (
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

export default Group
