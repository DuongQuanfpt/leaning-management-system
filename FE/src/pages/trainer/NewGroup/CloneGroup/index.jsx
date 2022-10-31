import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Space, Divider, Radio } from 'antd'
import groupApi from '~/api/groupApi'

const CloneGroup = () => {
  const [listReuse, setListReuse] = useState([])
  const { id } = useParams()

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(listReuse)

  const loadData = async () => {
    await groupApi
      .getReuseGroup(id)
      .then((response) => {
        console.log(response)
        setListReuse(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="widget-inner">
      <div className="row">
        <Divider />
        <Space
          align="center"
          style={{
            width: '100%',
            height: '250px',
            flexDirection: 'column',
            overflowX: 'hidden',
            alignItems: 'flex-start',
            textOverflow: 'ellipsis',
          }}
        >
          <Radio.Group defaultValue={1} className="d-flex flex-column align-items-start w-100">
            <Radio className="ant-radio-custom" value={1}>
              The actor click the “Add new” button to access “Add New” tag, click the “Reuse” button to access “Reuse”
              tag.
            </Radio>
            <Radio className="ant-radio-custom" value={2}>
              The actor click the “Status” select button to select status, click “Is Teameval” select button to select
              is teameval, click “Subject-Assignment” dropdown list to sval Criteria Name field, Eval Criteria Weight
              field, Expected Work field and Description field to change them.elect a subject-assignment.
            </Radio>
            <Radio className="ant-radio-custom" value={3}>
              In the “Reuse” tag, the actor click “Subjecval Criteria Name field, Eval Criteria Weight field, Expected
              Work field and Description field to change them.t-Assignment-Eval Criteria” dropdown list to select a
              subject-assignment-eval criteria.
            </Radio>
            <Radio className="ant-radio-custom" value={4}>
              The actor enter text to Eval Criteria Nval Criteria Name field, Eval Criteria Weight field, Expected Work
              field and Description field to change them.ame field, Eval Criteria Weight field, Expected Work field and
              Description field to change them.
            </Radio>
          </Radio.Group>
        </Space>
        <Divider />
      </div>
    </div>
  )
}

export default CloneGroup
