import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, DatePicker, Pagination, Space, Table, Tooltip, Typography } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import scheduleApi from '~/api/scheduleApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCalendar, cilPlus, cilReload, cilSearch } from '@coreui/icons'
import moment from 'moment'
import { useSelector } from 'react-redux'

const ScheduleList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()
  const currentClass = useSelector((state) => state.profile.currentClass)

  const [schedule, setSchedule] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState({
    statusFilter: [],
  })
  const [filter, setFilter] = useState({
    date: [moment(new Date(), 'YYYY-MM-DD').subtract(7, 'd'), moment(new Date(), 'YYYY-MM-DD').add(7, 'd')],
    status: { name: 'Select Attendance Status', value: null },
    class: currentClass,
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    //Load filter
    scheduleApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({
          ...prev,
          ...response,
        }))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    loadData(1, filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  const loadData = async (page, filter, q = '') => {
    setLoading(true)
    const [filterDateFrom, filterDateTo] = filter.date

    const params = {
      limit: ITEM_PER_PAGE,
      page: page,
      filterClass: currentClass,
      filterDateFrom: filterDateFrom.format('YYYY-MM-DD'),
      filterDateTo: filterDateTo.format('YYYY-MM-DD'),
    }
    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.status.name !== 'Select Attendance Status') {
      params.filterStatus = filter.status.value
    }

    console.log(params)
    await scheduleApi
      .getSchedule(params)
      .then((response) => {
        console.log(response)
        setCurrentPage(page)
        setTotalItem(response.totalItem)
        setSchedule(response.listResult)
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterStatus = (status) => {
    console.log(status)
    setFilter((prev) => ({ ...prev, status: status }))
  }

  const handleAdd = () => {
    navigateTo('/schedule-add')
  }

  const handleReload = () => {
    setFilter((prev) => ({
      ...prev,
      date: [moment(new Date(), 'YYYY-MM-DD').subtract(7, 'd'), moment(new Date(), 'YYYY-MM-DD').add(7, 'd')],
      status: { name: 'Select Attendance Status', value: null },
      class: currentClass,
    }))
    setSearch('')
  }

  const columns = [
    {
      title: 'Slot',
      dataIndex: 'slot',
      width: '10%',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      width: '20%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '17%',
    },
    {
      title: 'From',
      dataIndex: 'fromTime',
      width: '11%',
    },
    {
      title: 'To',
      dataIndex: 'toTime',
      width: '11%',
    },
    {
      title: 'Room',
      dataIndex: 'room',
      width: '11%',
      render: (_, { room }) => room?.title,
    },
    {
      title: 'Take Attendance',
      dataIndex: 'status',
      width: '15%',
      // Active : Đã điểm danh hôm đó, click vào thì cho sửa -> không đc sửa
      // Inactive: Trong tương lai, Chưa điểm danh -> đc sửa
      // Sửa date chỉ đc chọn date hôm nay và những hôm sau
      // Sửa from to chỉ đc chọn tương lai
      // Attendance taken: điểm danh rồi, không đc điểm danh nữa -> không đc sửa
      render: (_, { status, id }) =>
        status === 'Active' ? (
          <Button type="link" className="p-0 m-0" onClick={() => navigateTo(`/attendance-tracking/${id}`)}>
            <Typography.Link underline>Edit Attendance</Typography.Link>
          </Button>
        ) : status === 'Inactive' ? (
          <Button type="link" className="p-0 m-0" onClick={() => navigateTo(`/attendance-tracking/${id}`)}>
            <Typography.Link underline>Take Attendance</Typography.Link>
          </Button>
        ) : (
          'Attendance Taken'
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: '5%',
      render: (_, subject) => (
        <Space size="middle" align="baseline">
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/schedule-detail/${subject?.id}`)
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ]

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
                  <div className="col-2 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Schedule List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by Topic..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-6 d-flex justify-content-end">
                    <CDropdown className="ml-3 mr-3 ">
                      <CDropdownToggle color="secondary">{filter.status.name}</CDropdownToggle>
                      <CDropdownMenu style={{ width: '100%', maxHeight: '300px', overflow: 'auto' }}>
                        {listFilter?.statusFilter?.map((status) => (
                          <CDropdownItem value={status.value} onClick={() => handleFilterStatus(status)}>
                            {status.name}
                          </CDropdownItem>
                        ))}
                      </CDropdownMenu>
                    </CDropdown>

                    <DatePicker.RangePicker
                      className="w-30"
                      size={'large'}
                      format={'YYYY-MM-DD'}
                      value={filter.date}
                      onChange={(dateString) => {
                        setFilter((prev) => ({ ...prev, date: dateString }))
                      }}
                      allowClear={false}
                    />
                    <Tooltip title="Reload" placement="top">
                      <CButton color="success" type="submit" className="text-light ml-3" onClick={handleReload}>
                        <CIcon icon={cilReload} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Add New Schedule" placement="top">
                      <CButton color="danger" type="submit" className="text-light ml-3" onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Attendance Reports" placement="top">
                      <CButton
                        color="warning"
                        type="submit"
                        className="text-light ml-3"
                        onClick={() => navigateTo('/attendance-report')}
                      >
                        <CIcon icon={cilCalendar} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={schedule} columns={columns} pagination={false} loading={loading} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end mt-3">
                <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default ScheduleList
