import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Card, Col, Input, message, Modal, Row, Space, Typography } from 'antd'
import groupApi from '~/api/groupApi'
import { CrownTwoTone, ExclamationCircleOutlined, UsergroupAddOutlined } from '@ant-design/icons'

const Random = () => {
  const { id } = useParams()

  const [groupDetail, setGroupDetail] = useState({
    traineeList: [],
  })
  const [listGroup, setListGroup] = useState([])
  const [isClickedNextStep, setIsClickedNextStep] = useState(false)

  const numberGroupInput = useRef(null)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      title: 'Are you sure to confirm this configure group this milestone?',
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

  const loadData = async () => {
    await groupApi
      .getReuseGroup(id)
      .then((response) => {
        console.log(response)
        setGroupDetail(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleNextStep = () => {
    const listStudent = [...groupDetail.traineeList]

    const numberStudent = groupDetail.traineeList.length
    let inputGroup = numberGroupInput.current.input.value

    if (inputGroup <= 0) {
      toastMessage('error', 'Number of group must be 1 or bigger!')
      return
    }
    if (inputGroup >= numberStudent) {
      inputGroup = numberStudent
    }
    const minNumberStudentEachGroup = Math.floor(numberStudent / inputGroup)

    const result = []
    for (let i = 0; i < inputGroup; i++) {
      const member = []
      for (let j = 0; j < minNumberStudentEachGroup; j++) {
        member.push(...listStudent.splice(Math.floor(Math.random() * listStudent.length), 1))
      }
      result.push({
        groupCode: `G${i + 1}`,
        topicName: `Topic ${i + 1}`,
        desciption: `Description G${i + 1}`,
        members: member,
      })
    }
    for (let k = 0; k <= listStudent.length; k++) {
      result[k].members.push(...listStudent.splice(Math.floor(Math.random() * listStudent.length), 1))
    }

    result.forEach((group) => {
      group.members.forEach((member) => {
        member.isLeader = false
      })
      group.members[0].isLeader = true
    })

    setListGroup(result)
    setIsClickedNextStep(true)
  }

  const handleFinish = async () => {
    const params = {
      listGroup: [
        ...listGroup.map((group) => ({
          groupCode: group.groupCode,
          topicName: group.topicName,
          description: '',
          members: group.members.map((member) => ({ memberName: member.username, isLeader: member.isLeader })),
        })),
      ],
    }
    await groupApi
      .overrideGroup(id, params)
      .then((response) => {
        toastMessage('success', 'Create Group Successfully!')
      })
      .catch((error) => {
        toastMessage('error', 'Something went wrong, please try again')
      })
  }

  const handleCancel = () => {
    loadData()
    setIsClickedNextStep(false)
  }

  return (
    <div className="widget-inner">
      {!isClickedNextStep ? (
        <div className="row">
          <Space
            align="center"
            style={{
              width: '100%',
              height: '50px',
              justifyContent: 'center',
              flexDirection: 'column',
              borderTop: '1px grey dashed',
              borderLeft: '1px grey dashed',
              borderRight: '1px grey dashed',
            }}
          >
            <Typography.Text className="d-flex justify-content-center" strong>
              Class size:
              <Typography.Text type="warning" strong>
                {` ${groupDetail?.traineeList?.length} `}
              </Typography.Text>
              Students
            </Typography.Text>
          </Space>
          <Space
            align="center"
            style={{
              width: '100%',
              height: '200px',
              border: '1px grey dashed',
            }}
          >
            <Space
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                paddingLeft: '35%',
                paddingRight: '35%',
              }}
            >
              <Typography.Text strong className="d-flex justify-content-center">
                How many groups do you want to create?
              </Typography.Text>
              <Input type="number" className="mt-2" ref={numberGroupInput}></Input>
            </Space>
          </Space>
          <Space className="mt-4">
            <Typography.Title level={5} strong>
              Create group randomly
            </Typography.Title>
          </Space>
          <Space className="mt-1">
            <Typography.Text>
              <Typography.Text strong>Step 1: </Typography.Text>
              <Typography.Text>
                The system will display the number of students in a slot and ask you to type the number of groups to
                create.
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 2: </Typography.Text>
              <Typography.Text>
                Click "Next Step" to preview groups with random member. The first member of each group is defaulted as
                the group leader.
              </Typography.Text>
            </Typography.Text>
          </Space>
          <Space className="mt-3">
            <Typography.Text>
              <Typography.Text strong>Step 3: </Typography.Text>
              <Typography.Text>Click "Finish" to complete creating groups randomly.</Typography.Text>
            </Typography.Text>
          </Space>
        </div>
      ) : (
        <>
          <Space className="d-inline-flex">
            <Typography.Text className="d-flex flex-column" strong>
              <Typography.Text>Class size:</Typography.Text>

              <Typography.Text type="warning" strong>
                {` ${groupDetail.traineeList.length} `}
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
          <Row gutter={24} className="mt-3">
            {listGroup.map((group) => (
              <Col span={8} className="pb-3">
                <Card
                  title={group.groupCode}
                  bordered
                  style={{ backgroundColor: '#ededed', minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}
                  bodyStyle={{ paddingTop: 0 }}
                  extra={
                    <Space>
                      <UsergroupAddOutlined style={{ fontSize: '20px' }} />
                      <Typography>{group.members.length}</Typography>
                    </Space>
                  }
                >
                  {group.members.map((student) => (
                    <Typography className="p-0 m-0 d-flex flex-row">
                      {student.fullName} - {student.username}{' '}
                      {student.isLeader && <CrownTwoTone className="ml-2 d-flex align-items-center" />}
                    </Typography>
                  ))}
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
      <div className="d-flex justify-content-end ">
        {!isClickedNextStep ? (
          <Button type="primary" onClick={handleNextStep}>
            Next Step
          </Button>
        ) : (
          <>
            <Button type="text" className="ml-3" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="danger" className="ml-3" onClick={modalConfirm}>
              Finish
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Random
