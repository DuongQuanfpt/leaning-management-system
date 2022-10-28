import { Button, Input, Space, Typography } from 'antd'
import React from 'react'

const index = () => {
  return (
    <div className="widget-inner">
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
              {` ${30} `}
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
            <Input className="mt-2"></Input>
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
              Click "Next Step" to preview groups with random member. The first member of each group is defauled as the
              group leader.
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
      <div className="d-flex justify-content-end ">
        <Button type="primary">Next Step</Button>
      </div>
    </div>
  )
}

export default index
