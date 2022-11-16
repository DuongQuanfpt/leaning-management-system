import React, { useState, useEffect } from 'react'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import postApi from '~/api/postApi'
import { Card, Image, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

const AdminDashboard = () => {
  const navigateTo = useNavigate()
  const [listPost, setListPost] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const params = {
      isNotice: true,
      topView: 5,
    }
    await postApi
      .getListPost(params)
      .then((response) => {
        console.log(response)
        setListPost(response)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }
  return (
    <div>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-lg-12">
                <Typography.Title level={4} className="mb-3">
                  Trainee Blogs
                </Typography.Title>
                {listPost?.listResult?.map((post) => (
                  <Card className="w-100 mb-3" loading={loading}>
                    <Card.Meta
                      avatar={
                        <Link to={`/post/${post.postId}`}>
                          <Image
                            src={post.thumbnail_Url}
                            style={{
                              minWidth: '150px',
                              maxWidth: '150px',
                              minHeight: '120px',
                              maxHeight: '120px',
                              objectFit: 'cover',
                            }}
                            preview={false}
                          />
                        </Link>
                      }
                      title={
                        <Space className="d-flex flex-column mb-1">
                          <Space className="p-0 m-0">
                            <Typography.Link
                              style={{ color: 'black' }}
                              className="p-0 m-0"
                              level={5}
                              onClick={() => navigateTo(`/post/${post.postId}`)}
                            >
                              {post.postTitle}
                            </Typography.Link>
                          </Space>
                          <Space className="p-0 m-0">
                            <Typography.Text style={{ fontSize: '11px', marginRight: '10px' }}>
                              {`${post.authorFullName} (${post.authorName}, ${post.authorMobile})`}
                            </Typography.Text>
                            <Typography.Text style={{ fontSize: '11px', marginRight: '10px' }} type="secondary">
                              {moment(post.lastUpdate).format('DD/MM/YYYY hh:mm:ss')}
                            </Typography.Text>
                          </Space>
                        </Space>
                      }
                      description={<Typography.Text type="secondary">{post.excerpt}</Typography.Text>}
                    />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminDashboard
