import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { Typography, Button, Space, Skeleton, Image } from 'antd'

import postApi from '~/api/postApi'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'
import { FormOutlined } from '@ant-design/icons'

const Notice = () => {
  const { id } = useParams()
  const navigateTo = useNavigate()
  const { roles, username } = useSelector((state) => state.profile)
  const [post, setPost] = useState({ content: '' })
  const [isTrainer, setIsTrainer] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (roles.includes('trainer')) {
      setIsTrainer(true)
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'LMS - Notice'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async () => {
    setLoading(true)
    postApi
      .getPost(id)
      .then((response) => {
        console.log(response)
        setPost(response)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <>
      <div>
        <AdminSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AdminHeader />
          <div className="body flex-grow-1">
            <div className="col-lg-12">
              <Space className="w-100">
                <Skeleton loading={loading}>
                  <div className="body flex-grow-1 px-2">
                    <div className="col-lg-12">
                      <div className="row">
                        <div className="col-lg-12" style={{ wordBreak: 'break-word' }}>
                          <div className="col-lg-12">
                            <Typography.Title level={2}>
                              {post.postTitle}
                              {(isTrainer || username === post.authorName) && (
                                <Button
                                  type="link"
                                  onClick={() => navigateTo(`/post-edit/${id}`)}
                                  icon={<FormOutlined />}
                                ></Button>
                              )}
                            </Typography.Title>
                          </div>
                          <div className="col-lg-12 d-flex p-0">
                            <div className="col-lg-6 mb-4 d-flex justify-content-start">
                              <Typography.Text
                                type="primary"
                                style={{ fontSize: '12px' }}
                              >{`${post.authorFullName} (${post.authorName}, ${post.authorMobile})`}</Typography.Text>
                              <Typography.Text type="secondary" className="ml-2" style={{ fontSize: '12px' }}>
                                {post.viewCount} views
                              </Typography.Text>
                            </div>
                            <div className="col-lg-6 mb-4 d-flex justify-content-end">
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: '12px' }}
                              >{`${post.lastUpdate}`}</Typography.Text>
                            </div>
                          </div>
                          <div className="col-lg-12 mb-3">
                            <Typography.Text type="secondary" italic>{`${post.excerpt}`}</Typography.Text>
                          </div>
                          <div className="col-lg-12 mb-3 d-flex justify-content-center">
                            <Image src={post.thumbnail_Url} preview={false} />
                          </div>
                          <div className="col-lg-12 mb-3">{parse(post?.content)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Skeleton>
              </Space>
            </div>
          </div>
          <AdminFooter />
        </div>
      </div>
    </>
  )
}

export default Notice
