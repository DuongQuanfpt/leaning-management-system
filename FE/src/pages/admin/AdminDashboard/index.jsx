import React, { useState, useEffect } from 'react'
import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import postApi from '~/api/postApi'
import { Button, Card, Image, Pagination, Skeleton, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
  let ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()
  const { roles } = useSelector((state) => state.profile)
  const searchQueryDashboard = useSelector((state) => state.sidebar.searchQueryDashboard)
  const [listPost, setListPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [paginate, setPaginate] = useState({
    totalItem: 0,
    currentPage: 1,
  })

  useEffect(() => {
    loadData(paginate.currentPage, searchQueryDashboard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ITEM_PER_PAGE, searchQueryDashboard])

  const loadData = async (page, q = undefined) => {
    setLoading(true)
    const params = {
      isNotice: true,
      topView: 5,
      page: page,
      limit: ITEM_PER_PAGE,
      q: q,
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
              <Skeleton loading={loading}>
                <div className="col-lg-12">
                  <Space>
                    <Typography.Title level={4} className="mb-3">
                      {!searchQueryDashboard
                        ? `Notice Board`
                        : `Found ${listPost?.listResult?.length} results with keyword '${searchQueryDashboard}'`}
                    </Typography.Title>
                  </Space>
                  {roles.includes('trainer') && (
                    <Space className="ml-3">
                      <Button type="primary" onClick={() => navigateTo(`/new-notice`)}>
                        Create Notice
                      </Button>
                    </Space>
                  )}

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
                                onClick={() => navigateTo(`/notice/${post.postId}`)}
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
                  <div className="col-lg-12 d-flex justify-content-end">
                    <Pagination
                      total={paginate?.totalItem}
                      current={paginate.currentPage}
                      onChange={(pageNumber) => {
                        setPaginate((prev) => ({ ...prev, currentPage: pageNumber }))
                      }}
                      showSizeChanger
                      onShowSizeChange={(current, pageSize) => {
                        ITEM_PER_PAGE = pageSize
                        loadData(paginate.currentPage)
                      }}
                    />
                  </div>
                </div>
              </Skeleton>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default AdminDashboard
