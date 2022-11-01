import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Breadcrumb, Button, DatePicker, Pagination, Space, Table, Tag, Tooltip } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import scheduleApi from '~/api/scheduleApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { CButton, CDropdown, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilReload, cilSearch } from '@coreui/icons'
import moment from 'moment'

const ScheduleList = () => {
  const ITEM_PER_PAGE = 10
  const navigateTo = useNavigate()

  const [schedule, setSchedule] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const [search, setSearch] = useState('')
  const [listFilter, setListFilter] = useState([])
  const [filter, setFilter] = useState({
    date: [moment(new Date(), 'YYYY-MM-DD').subtract(3, 'd'), moment(new Date(), 'YYYY-MM-DD').add(3, 'd')],
    status: 'Select Attendance Status',
  })

  useEffect(() => {
    //Load filter
    scheduleApi
      .getFilter()
      .then((response) => {
        console.log(response)
        setListFilter((prev) => ({}))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const params = {}
    await scheduleApi
      .getSchedule(params)
      .then((response) => {
        console.log(response)
        setSchedule(response.listResult)
        setListFilter((prev) => ({}))
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChangePage = (pageNumber) => {}

  const handleSearch = () => {}

  const handleAdd = () => {}

  const handleReload = () => {}

  const columns = [
    {
      title: 'Slot',
      dataIndex: 'modules',
      width: '10%',
      render: (_, { modules }) => modules.slot,
    },
    {
      title: 'Topic',
      dataIndex: 'modules',
      width: '20%',
      render: (_, { modules }) => modules.topic,
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
      // Active : Đã điểm danh hôm đó, click vào thì cho sửa
      // Inactive: Chưa điểm danh hôm đó
      // Attendance taken: ?
      render: (_, { status }) => (status === 'Active' ? 'Edit Attendance' : status === 'Inactive' ? 'Take' : ''),
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
                  <div className="col-3 d-flex w-80">
                    <input
                      type="search"
                      id="form1"
                      className="form-control"
                      placeholder="Searching by name, email, message and response...."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                      <CIcon icon={cilSearch} />
                    </CButton>
                  </div>
                  <div className="col-7 d-flex justify-content-end">
                    <CDropdown className="ml-3 mr-3 ">
                      <CDropdownToggle color="secondary">{filter.status}</CDropdownToggle>
                      <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}></CDropdownMenu>
                    </CDropdown>

                    <DatePicker.RangePicker
                      className="w-50"
                      size={'large'}
                      format={'YYYY-MM-DD'}
                      defaultValue={filter.date}
                      onChange={(dateString) => {
                        setFilter((prev) => ({ ...prev, date: dateString }))
                      }}
                      allowClear={false}
                    />

                    <Tooltip title="Add New Class Eval Criteria" placement="right">
                      <CButton color="danger" type="submit" className="text-light ml-4" onClick={handleAdd}>
                        <CIcon icon={cilPlus} />
                      </CButton>
                    </Tooltip>
                    <Tooltip title="Reload" placement="right">
                      <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                        <CIcon icon={cilReload} />
                      </CButton>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <Table bordered dataSource={schedule} columns={columns} pagination={false} />
              </div>
              <div className="col-lg-12 d-flex justify-content-end">
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
