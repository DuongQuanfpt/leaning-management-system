import React, { useState, useEffect } from 'react'
import postApi from '~/api/postApi'
import { Card, Image, Pagination, Space, Typography, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Header from '~/components/Homepage/Header'
import ContactUs from '~/components/Homepage/ContactUs'
import Footer from '~/components/Homepage/Footer'
import { useSelector } from 'react-redux'

const HomePage = () => {
  let ITEM_PER_PAGE = 10

  const navigateTo = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [listPost, setListPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [paginate, setPaginate] = useState({
    totalItem: 0,
    currentPage: 1,
  })
  const searchQueryHomepage = useSelector((state) => state.sidebar.searchQueryHomepage)

  useEffect(() => {
    document.title = 'LMS - Homepage'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    loadData(paginate.currentPage, searchQueryHomepage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEM_PER_PAGE, searchQueryHomepage])

  const loadData = async (page, q = undefined) => {
    setLoading(true)
    const params = {
      isNotice: false,
      topView: 10,
      page: page,
      limit: ITEM_PER_PAGE,
      q: q,
    }

    await postApi
      .getListPost(params)
      .then((response) => {
        console.log(response)
        setListPost(response)
        setPaginate((prev) => ({ ...prev, totalItem: response.totalItem }))
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <>
      <Header isPost={true} />
      <div className="page-content bg-white">
        <div style={{ height: '90px', backgroundColor: '#ebedef' }}></div>
        <div className="content-block" id="content-area">
          <div className="body flex-grow-1 px-3 py-3" style={{ backgroundColor: '#ebedef' }}>
            <div className="col-lg-12 m-b30">
              <div className="row">
                <div className="col-lg-9 mt-3">
                  <div className="col-lg-12">
                    <Space>
                      {!searchQueryHomepage ? null : (
                        <Typography.Title level={4} className="mb-3">
                          {`Found ${listPost?.listResult?.length} results with keyword '${searchQueryHomepage}'`}
                        </Typography.Title>
                      )}
                    </Space>
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
                  <div className="col-lg-12 d-flex justify-content-end ">
                    {token && (
                      <Button type="primary" className="mb-3" onClick={() => navigateTo(`/new-post`)}>
                        Create Post
                      </Button>
                    )}
                  </div>
                  <div className="col-lg-12 d-flex justify-content-end">
                    <Pagination
                      total={paginate.totalItem}
                      current={paginate.currentPage}
                      onChange={(pageNumber) => {
                        setPaginate((prev) => ({ ...prev, currentPage: pageNumber }))
                        loadData(pageNumber)
                      }}
                      showSizeChanger
                      onShowSizeChange={(current, pageSize) => {
                        ITEM_PER_PAGE = pageSize
                        loadData(paginate.currentPage)
                      }}
                    />
                  </div>
                </div>
                <div className="col-lg-3">
                  <Space className="w-100">
                    <Card
                      title={<Typography.Title level={5}>Category</Typography.Title>}
                      className="w-100 p-0 m-0"
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
          </div>
          <ContactUs />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
