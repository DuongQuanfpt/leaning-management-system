import React from 'react'
import { Table } from 'antd'

const Individual = ({ listData }) => {
  const columns = []

  return (
    <div className="widget-inner">
      <Table dataSource={listData} columns={columns} />
    </div>
  )
}

export default Individual
