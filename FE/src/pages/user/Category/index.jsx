import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Typography, Space, Skeleton, Image, Card } from 'antd'

import postApi from '~/api/postApi'
import Header from '~/components/Homepage/Header'

import Footer from '~/components/Homepage/Footer'
const Category = () => {
  let ITEM_PER_PAGE = 10
  const { id } = useParams()
  const navigateTo = useNavigate()
  const [listPost, setListPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [paginate, setPaginate] = useState({
    totalItem: 0,
    currentPage: 1,
  })
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    loadData(paginate.currentPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEM_PER_PAGE, id])

  useEffect(() => {
    document.title = 'LMS - Category'
    window.scrollTo(0, 0)
  }, [])

  const loadData = async (page) => {
    setLoading(true)

    const params = {
      isNotice: false,
      topView: 10,
      page: page,
      limit: ITEM_PER_PAGE,
      categoryId: id,
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
        return response
      })
      .then((response) => {
        const categorySelected = response.categoryFilter.filter((item) => +item.categoryId === +id)
        if (categorySelected.length === 0) {
          navigateTo('/404')
        }
        setCategoryName(categorySelected[0].categoryName)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
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
                      <Typography.Title level={4}>{`Found ${
                        listPost.listResult?.length ?? 0
                      } result with category ${categoryName}`}</Typography.Title>
                    </Skeleton>
                  </div>
                  <div className="col-lg-12">
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
                                <Link to={`/post/${post.postId}`}>
                                  <Typography.Title
                                    style={{
                                      color: 'black',
                                      wordBreak: 'break-word',
                                    }}
                                    className="p-0 m-0 hover-text-decoration"
                                    level={5}
                                  >
                                    {post.postTitle}
                                  </Typography.Title>
                                </Link>
                              </Space>
                              <Space className="p-0 m-0">
                                <Link to={`/category/${post.categoryId}`}>
                                  <Typography.Text
                                    className="p-0 m-0 hover-text-decoration"
                                    style={{ fontSize: '12px', marginRight: '10px' }}
                                  >
                                    {post.categoryName}
                                  </Typography.Text>
                                </Link>

                                <Typography.Text style={{ fontSize: '12px', marginRight: '10px' }} type="secondary">
                                  {`${post.authorFullName} (${[post.authorName]})`}
                                </Typography.Text>
                              </Space>
                            </Space>
                          }
                          description={<Typography.Text type="primary">{post.excerpt}</Typography.Text>}
                        />
                      </Card>
                    ))}
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
                          <Typography.Link
                            onClick={() => navigateTo(`/post/${topView.postId}`)}
                            style={{ color: 'black' }}
                          >
                            {`${index + 1}. `}
                            <Typography.Text className="hover-text-decoration">
                              {topView.postTitle.length > 100
                                ? topView.postTitle.substring(0, 100) + ` ...`
                                : topView.postTitle}
                            </Typography.Text>
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
          </Skeleton>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Category
