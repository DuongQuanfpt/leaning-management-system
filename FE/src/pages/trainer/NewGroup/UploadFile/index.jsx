import { Button, Space, Typography } from 'antd'
import React from 'react'

const UploadFile = () => {
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
            You need to download the <Typography.Link>File of Student List</Typography.Link> to create groups
          </Typography.Text>
        </Space>
        <Space
          align="center"
          style={{
            width: '100%',
            height: '200px',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px grey dashed',
          }}
        >
          <Space
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              paddingLeft: '35%',
              paddingRight: '35%',
            }}
          >
            <Typography.Text className="d-flex mx-auto justify-content-center" strong>
              Please click "Upload" to import the file
            </Typography.Text>
            <Button className="d-flex mx-auto justify-content-center" type="primary">
              Upload
            </Button>
          </Space>
        </Space>
        <Space className="mt-4">
          <Typography.Title level={5} strong>
            Upload File
          </Typography.Title>
        </Space>
        <Space className="mt-1">
          <Typography.Text>
            <Typography.Text strong>Step 1: </Typography.Text>
            <Typography.Text>
              To create groups, you need to download the student list by clicking link "File of Student List".
            </Typography.Text>
          </Typography.Text>
        </Space>
        <Space className="mt-3">
          <Typography.Text>
            <Typography.Text strong>Step 2: </Typography.Text>
            <Typography.Text>
              Add group names to the column "Group Name". The first member of each group is defaulted as the group
              leader.
            </Typography.Text>
          </Typography.Text>
        </Space>
        <Space className="mt-3">
          <Typography.Text>
            <Typography.Text strong>Step 3: </Typography.Text>
            <Typography.Text>Click button "Upload" to upload the file of group list.</Typography.Text>
          </Typography.Text>
        </Space>
        <Space className="mt-3">
          <Typography.Text>
            <Typography.Text strong>Step 4: </Typography.Text>
            <Typography.Text>Click Next Step to preview groups. The groups are displaed on the screen.</Typography.Text>
          </Typography.Text>
        </Space>
        <Space className="mt-3">
          <Typography.Text>
            <Typography.Text strong>Step 5: </Typography.Text>
            <Typography.Text>
              Click "Finish" to complete create groups. Then you can start the constructive questions.
            </Typography.Text>
          </Typography.Text>
        </Space>
      </div>
      <div className="d-flex justify-content-end ">
        <Button type="primary">Next Step</Button>
      </div>
    </div>
  )
}

export default UploadFile
