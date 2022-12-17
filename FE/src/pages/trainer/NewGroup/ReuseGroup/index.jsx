import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Space, Divider, Radio, Typography, Row, Col, Card, Button, Modal, message, Skeleton } from 'antd'
import groupApi from '~/api/groupApi'
import { CrownTwoTone, ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons'

const ReuseGroup = () => {
  const { id } = useParams()

  const [listReuse, setListReuse] = useState([{ milestoneId: 0 }])
  const [listGroup, setListGroup] = useState([])
  const [isReusable, setIsReusable] = useState(false)
  const [reuse, setReuse] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    setLoading(true)
    await groupApi
      .getReuseFilter(id)
      .then((response) => {
        console.log(response)
        setListReuse(response)
        setIsReusable(true)
      })
      .catch((error) => {
        setIsReusable(false)
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

  const modalConfirm = () => {
    Modal.confirm({
      title: 'Are you sure to confirm reuse this configure group for this milestone?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Confirm',
      cancelText: 'Cancel',
      okType: 'danger',
      async onOk() {
        await handleFinish()
      },
      onCancel() {},
    })
  }

  const handleChange = (item) => {
    setReuse(item)
    const listGroup = []
    item.groups.forEach((group) => listGroup.push(group))
    listGroup.unshift({
      groupCode: 'Waiting List',
      groupId: '',
      topicName: '',
      memberList: item.noGroup,
    })
    setListGroup(listGroup)
  }

  const handleFinish = async () => {
    await groupApi
      .overrideReuse(id, reuse.milestoneId)
      .then((response) => {
        toastMessage('success', 'Reuse Group Successfully!')
      })
      .catch((error) => {
        toastMessage('error', 'Something went wrong, please try again')
      })
  }

  return (
    <div className="widget-inner">
      <Skeleton loading={loading}>
        <div className="row mb-3">
          <Typography.Text className="ml-3 mt-2 mb-2">Select Milestone want to reuse:</Typography.Text>
          <Divider />
          <Space
            align="center"
            style={{
              width: '100%',
              height: '150px',
              minHeight: '150px',
              flexDirection: 'column',
              overflowX: 'hidden',
              alignItems: 'flex-start',
              textOverflow: 'ellipsis',
            }}
          >
            {isReusable && (
              <Radio.Group defaultValue={1} className="d-flex flex-column align-items-start w-100">
                {listReuse.map((item) => (
                  <Radio className="ant-radio-custom" value={item.milestoneId} onChange={() => handleChange(item)}>
                    {`${item.classesCode} - ${item.title}`}
                  </Radio>
                ))}
              </Radio.Group>
            )}
            {!isReusable && (
              <Typography.Text
                className="d-flex align-items-center justify-content-center text-center w-100"
                type="warning"
                strong
              >
                No Milestone Reusable
              </Typography.Text>
            )}
          </Space>
          <Divider />
        </div>
      </Skeleton>
      {isReusable && (
        <>
          {listGroup.length !== 0 && (
            <>
              <Space className="d-inline-flex">
                <Typography.Text className="d-flex flex-column" strong>
                  <Typography.Text>Class size:</Typography.Text>

                  <Typography.Text type="warning" strong>
                    {` ${reuse.classesSize} `}
                  </Typography.Text>
                  <Typography.Text>Students</Typography.Text>
                </Typography.Text>
              </Space>
              <Space className="d-inline-flex ml-2">
                <Typography.Text className="d-flex flex-column" strong>
                  <Typography.Text> - Group:</Typography.Text>
                  <Typography.Text type="warning" strong>
                    {` ${listGroup?.length} `}
                  </Typography.Text>
                </Typography.Text>
              </Space>
            </>
          )}
          <Row gutter={24} className="mt-3">
            {listGroup?.map((group) => (
              <Col span={8} className="pb-3">
                <Card
                  title={group?.groupCode}
                  bordered
                  style={{ backgroundColor: '#ededed', minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}
                  bodyStyle={{ paddingTop: 0 }}
                  extra={
                    <Space>
                      <UsergroupAddOutlined style={{ fontSize: '20px' }} />
                      <Typography>{group?.memberList?.length}</Typography>
                    </Space>
                  }
                >
                  {group?.memberList?.map((student) => (
                    <Typography className="p-0 m-0 d-flex flex-row">
                      {student?.fullName} - {student?.userName}{' '}
                      {student?.leader && <CrownTwoTone className="ml-2 d-flex align-items-center" />}
                    </Typography>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
          <div className="row">
            <Space className="mt-4">
              <Typography.Title level={5} strong>
                Apply old milestone group configuration
              </Typography.Title>
            </Space>
            <Space className="mt-1">
              <Typography.Text>
                <Typography.Text strong>Step 1: </Typography.Text>
                <Typography.Text>
                  The system will display the list of milestone that is "In_Progress" or "Close" status.
                </Typography.Text>
              </Typography.Text>
            </Space>
            <Space className="mt-3">
              <Typography.Text>
                <Typography.Text strong>Step 2: </Typography.Text>
                <Typography.Text>Select milestone to preview group configuration.</Typography.Text>
              </Typography.Text>
            </Space>
            <Space className="mt-3">
              <Typography.Text>
                <Typography.Text strong>Step 3: </Typography.Text>
                <Typography.Text>
                  Click "Reuse" to apply configuration of this milestone to current milestone.
                </Typography.Text>
              </Typography.Text>
            </Space>
          </div>
        </>
      )}
      <div className="d-flex justify-content-end ">
        <Button type="primary" onClick={modalConfirm}>
          Reuse
        </Button>
      </div>
    </div>
  )
}

export default ReuseGroup
