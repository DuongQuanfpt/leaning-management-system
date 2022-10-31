import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Space, Divider, Radio } from 'antd'
import groupApi from '~/api/groupApi'

const ReuseGroup = () => {
  const [listReuse, setListReuse] = useState([{ milestoneId: 0 }])
  const [reuse, setReuse] = useState({})
  const { id } = useParams()

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    await groupApi
      .getReuseFilter(id)
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
            {listReuse.map((item) => (
              <Radio defaultChecked={true} defaultValue={0} value={item.milestoneId} onChange={() => setReuse(item)}>
                {`${item.classesCode} - ${item.title}`}
              </Radio>
            ))}
          </Radio.Group>
        </Space>
        <Divider />
      </div>
    </div>
  )
}

export default ReuseGroup
