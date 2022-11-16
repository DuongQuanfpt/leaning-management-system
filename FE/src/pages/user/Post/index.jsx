import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { Typography, Button, Space, Skeleton } from 'antd'

import postApi from '~/api/postApi'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useSelector } from 'react-redux'

const Post = () => {
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
          <Space>
            <Skeleton loading={loading}>
              <div className="body flex-grow-1 px-5">
                <div className="row">
                  <div className="col-lg-12">
                    <Typography.Title level={2}>
                      {post.postTitle}
                      {(isTrainer || username === post.authorName) && (
                        <Button type="link" onClick={() => navigateTo(`/post-edit/${id}`)}>
                          Edit
                        </Button>
                      )}
                    </Typography.Title>
                  </div>
                  <div className="col-lg-6 mb-3 d-flex justify-content-start">
                    <Typography.Text type="primary">{`${post.authorFullName} (${post.authorName}, ${post.authorMobile})`}</Typography.Text>
                  </div>
                  <div className="col-lg-6 mb-3 d-flex justify-content-end">
                    <Typography.Text type="secondary">{`${post.lastUpdate}`}</Typography.Text>
                  </div>
                  <div className="col-lg-12 mb-3">
                    <Typography.Text type="secondary" italic>{`${post.excerpt}`}</Typography.Text>
                  </div>
                  <div className="col-lg-12 mb-3">{parse(post?.content)}</div>
                </div>
              </div>
            </Skeleton>
          </Space>
          <AdminFooter />
        </div>
      </div>
    </>
  )
}

export default Post
