import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Button, Input, Segmented, Space, Typography } from 'antd'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { } from '@ant-design/icons'

const NewGroup = () => {
  const [mode, setMode] = useState('Upload file')

  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-lg-12 m-b30">
                <div className="row">
                  <div className="col-4 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>
                        <Link to="/group-list">Group List</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>New Group</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12 m-b30">
                  <Segmented
                    options={[
                      {
                        label: 'Upload file',
                        value: 'Upload file',
                      },
                      {
                        label: 'Random',
                        value: 'Random',
                      },
                      {
                        label: 'Reuse Group',
                        value: 'Reuse Group',
                      },
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                  <div className="widget-box">
                    {mode === 'Upload file' && (
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
                            <Typography.Text strong>
                              You need to download the <Typography.Link>File of Student List</Typography.Link> to create
                              groups
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
                            <Typography.Text strong>Please click "Upload" to import the file</Typography.Text>
                            <Button type="primary">Upload</Button>
                          </Space>
                          <Space className="mt-4">
                            <Typography.Title level={5} strong>
                              Upload File
                            </Typography.Title>
                          </Space>
                          <Space className="mt-1">
                            <Typography.Text strong>Step 1: </Typography.Text>
                            <Typography.Text>
                              To create groups, you need to download the student list by clicking link "File of Student
                              List".
                            </Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 2: </Typography.Text>
                            <Typography.Text>
                              Add group names to the column "Group Name". The first member of each group is defaulted as
                              the group leader.
                            </Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 3: </Typography.Text>
                            <Typography.Text>Click button "Upload" to upload the file of group list.</Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 4: </Typography.Text>
                            <Typography.Text>
                              Click Next Step to preview groups. The groups are displaed on the screen.
                            </Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 5: </Typography.Text>
                            <Typography.Text>
                              Click "Finish" to complete create groups. Then you can start the constructive questions.
                            </Typography.Text>
                          </Space>
                        </div>
                        <div className="d-flex justify-content-end ">
                          <Button type="primary">Next Step</Button>
                        </div>
                      </div>
                    )}
                    {mode === 'Random' && (
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
                            <Typography.Text strong>
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
                              justifyContent: 'center',
                              flexDirection: 'column',
                              border: '1px grey dashed',
                            }}
                          >
                            <Typography.Text strong>How many groups do you want to create?</Typography.Text>
                            <Input className="mt-2"></Input>
                          </Space>
                          <Space className="mt-4">
                            <Typography.Title level={5} strong>
                              Create group randomly
                            </Typography.Title>
                          </Space>
                          <Space className="mt-1">
                            <Typography.Text strong>Step 1: </Typography.Text>
                            <Typography.Text>
                              The system will display the number of students in a slot and ask you to type the number of
                              groups to create.
                            </Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 2: </Typography.Text>
                            <Typography.Text>
                              Click "Next Step" to preview groups with random member. The first member of each group is
                              defauled as the group leader.
                            </Typography.Text>
                          </Space>
                          <Space className="mt-3">
                            <Typography.Text strong>Step 3: </Typography.Text>
                            <Typography.Text>Click "Finish" to complete creating groups randomly.</Typography.Text>
                          </Space>
                        </div>
                        <div className="d-flex justify-content-end ">
                          <Button type="primary">Next Step</Button>
                        </div>
                      </div>
                    )}
                    {mode === 'Reuse Group' && (
                      <div className="widget-inner">
                        <div className="row"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default NewGroup
