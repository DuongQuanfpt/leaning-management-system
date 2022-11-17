import React, { useState, useEffect } from 'react'
import postApi from '~/api/postApi'
import { Card, Image, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Header from '~/components/Homepage/Header'
import MainSlider from '~/components/Homepage/MainSlider'
import ContactUs from '~/components/Homepage/ContactUs'
import Footer from '~/components/Homepage/Footer'
import { EyeOutlined } from '@ant-design/icons'

const HomePage = () => {
  const navigateTo = useNavigate()
  const [listPost, setListPost] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const params = {
      isNotice: false,
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
    <>
      <Header />
      <div className="page-content bg-white">
        <MainSlider />
        <div className="content-block" id="content-area">
          <div className="body flex-grow-1 px-3 py-3" style={{ backgroundColor: '#ebedef' }}>
            <div className="col-lg-12 m-b30">
              <div className="row">
                <div className="col-lg-9 mt-3">
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
                                {post.categoryName}
                              </Typography.Text>
                              <Typography.Text style={{ fontSize: '11px', marginRight: '10px' }}>
                                {`${post.authorFullName} (${[post.authorName]})`}
                              </Typography.Text>
                            </Space>
                          </Space>
                        }
                        description={<Typography.Text type="secondary">{post.excerpt}</Typography.Text>}
                      />
                    </Card>
                  ))}
                </div>
                <div className="col-lg-3">
                  <Space className="w-100">
                    <Card
                      title={<Typography.Title level={5}>Category</Typography.Title>}
                      className="w-100"
                      size="small"
                      loading={loading}
                    >
                      {listPost?.categoryFilter?.map((category) => (
                        <p className="p-0 m-0">{category.categoryName}</p>
                      ))}
                    </Card>
                  </Space>
                  <Space className="w-100">
                    <Card
                      title={<Typography.Title level={5}>Most view</Typography.Title>}
                      className="w-100"
                      size="small"
                      loading={loading}
                    >
                      {listPost?.topView?.map((topView, index) => (
                        <Space className="d-flex flex-column">
                          <Typography.Link
                            onClick={() => navigateTo(`/post/${topView.postId}`)}
                            style={{ color: 'black' }}
                          >
                            {`${index + 1}.   ${topView.postTitle}`}
                            <Typography.Text type="secondary" className="pl-3">
                              {topView.viewCount} views
                            </Typography.Text>
                          </Typography.Link>
                        </Space>
                      ))}
                    </Card>
                  </Space>
                </div>
              </div>
            </div>
          </div>
          <ContactUs />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
