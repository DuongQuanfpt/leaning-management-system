import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import parse from 'html-react-parser'

import { Typography, Button, Space, Skeleton, Image, Card } from 'antd'

import postApi from '~/api/postApi'
import Header from '~/components/Homepage/Header'
import { useSelector } from 'react-redux'
import { FormOutlined } from '@ant-design/icons'

import Footer from '~/components/Homepage/Footer'
const Post = () => {
  let ITEM_PER_PAGE = 10
  const { id } = useParams()
  const navigateTo = useNavigate()
  const { roles, username } = useSelector((state) => state.profile)
  const [post, setPost] = useState({ content: '' })
  const [listPost, setListPost] = useState([])
  const [isTrainer, setIsTrainer] = useState(false)
  const [loading, setLoading] = useState(false)
  const [paginate, setPaginate] = useState({
    totalItem: 0,
    currentPage: 1,
  })

  useEffect(() => {
    if (roles.includes('trainer')) {
      setIsTrainer(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadData(paginate.currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEM_PER_PAGE, id])

  const loadData = async (page) => {
    setLoading(true)

    const params = {
      isNotice: false,
      topView: 10,
      page: page,
      limit: ITEM_PER_PAGE,
    }

    await postApi
      .getListPost(params)
      .then((response) => {
        console.log(response)
        setListPost(response)
        setPaginate({
          totalItem: response.totalItem,
          currentPage: response.currentPage,
        })
      })
      .catch((error) => {
        console.log(error)
      })

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
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header isPost={true} />
      <div className="page-content bg-white" style={{ width: '100vw' }}>
        <div className="body flex-grow-1 px-3 py-3" style={{ backgroundColor: '#ebedef' }}>
          <Skeleton loading={loading} style={{ marginTop: '90px' }}>
            <div className="col-lg-12 m-b30">
              <div className="row w-100" style={{ marginTop: '90px', width: '100vw' }}>
                <div className="col-lg-9">
                  <div className="col-lg-12">
                    <Skeleton loading={loading}>
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
                    </Skeleton>
                  </div>
                  <div className="col-lg-12 d-flex">
                    <div className="col-lg-6 mb-4 d-flex justify-content-start p-0">
                      <Typography.Text
                        type="primary"
                        style={{ fontSize: '12px' }}
                      >{`${post.categoryName} ${post.authorFullName} (${post.authorName}, ${post.authorMobile})`}</Typography.Text>
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
                  <div className="col-lg-12 mb-3" style={{ wordWrap: 'break-word' }}>
                    {parse(post?.content)}
                  </div>
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
                        <Link to={`/category/${category.categoryId}`}>
                          <Typography.Text className="p-0 m-0 hover-text-decoration">
                            {category.categoryName}
                          </Typography.Text>
                          <br />
                        </Link>
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
                          <Link to={`/post/${topView.postId}`}>
                            <Typography.Text>
                              {`${index + 1}. `}
                              <Typography.Text className="hover-text-decoration">
                                {`${
                                  topView.postTitle.length > 100
                                    ? topView.postTitle.substring(0, 100) + ' ...'
                                    : topView.postTitle
                                }`}
                              </Typography.Text>
                              <Typography.Text type="secondary" className="pl-3">
                                {topView.viewCount} views
                              </Typography.Text>
                            </Typography.Text>
                          </Link>
                        </Space>
                      ))}
                    </Card>
                  </Space>
                </div>
              </div>
            </div>
          </Skeleton>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Post
