import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { utils, writeFileXLSX } from 'xlsx'

import { CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilSync, cilCloudDownload, cilCloudUpload } from '@coreui/icons'

import { Table, Button, Space, Breadcrumb, Tooltip, Modal, Tag, Pagination, DatePicker } from 'antd'
import {
  CloseOutlined,
  CheckOutlined,
  EyeOutlined,
  ExclamationCircleOutlined,
  RollbackOutlined,
  DisconnectOutlined,
} from '@ant-design/icons'

import traineeListApi from '~/api/traineeListApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const TraineeList = () => {
  const ITEM_PER_PAGE = 10

  const navigateTo = useNavigate()
  const currentClass = useSelector((state) => state.profile.currentClass)

  const [listTrainee, setListTrainee] = useState([])
  const [listStatus, setListStatus] = useState([])

  const [totalItem, setTotalItem] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [dateDropout, setDateDropout] = useState('')

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All Status')
  const [filter, setFilter] = useState({
    filterClasses: currentClass,
    filterStatus: '',
  })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [traineeSelected, setTraineeSelected] = useState({})

  useEffect(() => {
    traineeListApi
      .getPage(1)
      .then((response) => {
        setListStatus(response.statuFilter)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    loadData(currentPage, filter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentClass])

  const loadData = async (page, filter, q = '') => {
    const params = {
      page: page,
      limit: ITEM_PER_PAGE,
      filterClass: currentClass,
    }

    if (q !== '') {
      params.q = q.trim()
    }
    if (filter.statusFilter !== '') {
      params.filterStatus = filter.statusFilter
    }
    setLoading(true)

    await traineeListApi
      .getPage(params)
      .then((response) => {
        console.log(response)
        setCurrentPage(page)
        setListTrainee(response.listResult)
        setTotalItem(response.totalItem)
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleSearch = () => {
    loadData(1, filter, search)
  }

  const handleFilterStatus = (status) => {
    setFilter({ ...filter, statusFilter: status.value })
    setStatus(status.name)
  }

  const handleReload = () => {
    setFilter({ statusFilter: '' })
    setSearch('')
    setStatus('All Status')
    loadData(currentPage, filter)
  }

  const handleExport = async () => {
    const params = {
      filterClass: currentClass,
    }
    if (filter.statusFilter !== '') {
      params.filterStatus = filter.statusFilter
    }
    await traineeListApi
      .getAll(params)
      .then((response) => {
        console.log(response)
        const listExport = response.listResult
        for (let i = 0; i < listExport.length; i++) {
          delete listExport[i].userId
          listExport[i]['Full name'] = listExport[i].fullName
          listExport[i]['User name'] = listExport[i].username
          listExport[i]['Email'] = listExport[i].email
          listExport[i]['Mobile'] = listExport[i].mobile
          listExport[i]['Status'] = listExport[i].status
          listExport[i]['Note'] = listExport[i].note
          listExport[i]['Class'] = listExport[i].classes
          listExport[i]['Dropout Date'] = listExport[i].dropDate
          delete listExport[i].fullName
          delete listExport[i].username
          delete listExport[i].email
          delete listExport[i].mobile
          delete listExport[i].status
          delete listExport[i].note
          delete listExport[i].classes
          delete listExport[i].dropDate
        }
        const ws = utils.json_to_sheet(listExport)
        const wb = utils.book_new()
        utils.sheet_add_aoa(
          ws,
          [['Full name', 'User name', 'Email', 'Mobile', 'Status', 'Note', 'Class', 'Dropout Date']],
          { origin: 'A1' },
        )
        ws['!cols'] = [
          { wch: 20 },
          { wch: 20 },
          { wch: 20 },
          { wch: 10 },
          { wch: 10 },
          { wch: 20 },
          { wch: 10 },
          { wch: 15 },
        ]

        utils.book_append_sheet(wb, ws, 'Data')
        writeFileXLSX(wb, 'ListClassInformation.xlsx')
      })
      .catch((error) => {
        console.log(error)
        modalError('Failed to export excel file, try again please')
      })
  }

  const handleChangePage = (pageNumber) => {
    loadData(pageNumber, filter)
  }

  const handleChangeStatus = async (trainee) => {
    setLoading(true)
    await traineeListApi
      .updateStatus(trainee.userId, trainee.classes)
      .then((response) => {
        console.log(response)
        loadData(currentPage, filter, search)
      })
      .catch((error) => {
        modalError(error)
      })
      .finally(() => setLoading(false))
  }

  const handleDropout = async (trainee) => {
    const params = {
      dropoutDate: dateDropout.dateString.replaceAll('/', '-'),
    }
    setLoading(true)
    await traineeListApi
      .setDropout(trainee.userId, trainee.classes, params)
      .then((response) => {
        loadData(currentPage, filter, search)
      })
      .catch((error) => {
        modalError(error)
      })
      .finally(() => {
        setLoading(false)
        setOpen(false)
      })
  }

  const modalError = (error) => {
    Modal.error({
      title: 'Error',
      content: `${error}`,
    })
  }

  const modalConfirm = (trainee) => {
    Modal.confirm({
      title: `Are you want to ${
        trainee.status === 'Active' ? 'Deactivate' : trainee.status === 'Inactive' ? 'Reactivate' : 'Reactivate'
      } ${trainee.username}?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleChangeStatus(trainee)
      },
      onCancel() {},
    })
  }

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: (a, b) => a.username?.length - b.username?.length,
      width: '12.5%',
    },

    {
      title: 'Fullname',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName?.length - b.fullName?.length,
      width: '12.5%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      width: '20%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: (a, b) => a.status?.length - b.status?.length,
      width: '10%',
      render: (_, { status }) => (
        <Tag color={status === 'Active' ? 'blue' : status === 'Inactive' ? 'red' : 'grey'} key={status}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Dropout Date',
      dataIndex: 'dropDate',
      sorter: (a, b) => a.dropDate?.length - b.dropDate?.length,
      width: '12.5%',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      sorter: (a, b) => a.note?.length - b.note?.length,
      width: '22.5%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '10%',
      render: (_, setting) => (
        <Space size="middle">
          {setting.status !== 'Dropout' ? (
            <Tooltip title="Dropout" placement="top">
              <Button
                type="danger"
                shape="circle"
                icon={<DisconnectOutlined />}
                onClick={() => {
                  setTraineeSelected(setting)
                  setOpen(true)
                }}
              ></Button>
            </Tooltip>
          ) : (
            <Button disabled />
          )}
          <Tooltip
            title={
              setting.status === 'Active' ? 'Deactivate' : setting.status === 'Inactive' ? 'Reactivate' : 'Reactivate'
            }
            placement="top"
          >
            <Button
              type={setting.status === 'Active' ? 'danger' : setting.status === 'Inactive' ? 'primary' : 'primary'}
              shape="circle"
              ghost
              icon={
                setting.status === 'Active' ? (
                  <CloseOutlined />
                ) : setting.status === 'Inactive' ? (
                  <CheckOutlined />
                ) : (
                  <RollbackOutlined />
                )
              }
              onClick={() => {
                modalConfirm(setting)
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="View" placement="top">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={() => {
                navigateTo(`/trainee-detail/${currentClass}/${setting?.userId}`)
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
        <div className="body flex-grow-1 px-3 m-b30">
          <div className="col-lg-12 m-b30">
            <div className="row">
              <div className="col-2 d-flex align-items-center">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link to="/dashboard">Dashboard</Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Trainee List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-6 d-flex w-80">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  placeholder="Searching by fullname, username and email...."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <CButton color="primary" type="submit" className="text-light ml-10" onClick={handleSearch}>
                  <CIcon icon={cilSearch} />
                </CButton>
              </div>
              <div className="col-4 d-flex justify-content-end">
                <CDropdown className="ml-4">
                  <CDropdownToggle color="secondary">{status}</CDropdownToggle>
                  <CDropdownMenu style={{ maxHeight: '300px', overflow: 'auto' }}>
                    {listStatus.map((status) => (
                      <CDropdownItem onClick={() => handleFilterStatus(status)}>{status.name}</CDropdownItem>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
                <Tooltip title="Reload">
                  <CButton color="success" type="submit" className="text-light ml-4" onClick={handleReload}>
                    <CIcon icon={cilSync} />
                  </CButton>
                </Tooltip>
                <Tooltip title="Export">
                  <CButton color="warning" type="submit" className="text-light ml-4" onClick={handleExport}>
                    <CIcon icon={cilCloudDownload} />
                  </CButton>
                </Tooltip>

                <Tooltip title="Import">
                  <CButton
                    color="danger"
                    type="submit"
                    className="text-light ml-4"
                    onClick={() => navigateTo('/trainee-import')}
                  >
                    <CIcon icon={cilCloudUpload} />
                  </CButton>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <Table bordered dataSource={listTrainee} columns={columns} pagination={false} loading={loading} />
            <Modal
              title={`Are you want to dropout ${traineeSelected.username} ? `}
              open={open}
              onOk={() => {
                if (!dateDropout) {
                  modalError('Dropout date must not empty')
                  return
                }
                handleDropout(traineeSelected)
              }}
              onCancel={() => setOpen(false)}
            >
              <>
                <p>Select date please: </p>
                <DatePicker
                  size={'large'}
                  format={'YYYY/MM/DD'}
                  onChange={(date, dateString) => setDateDropout({ date, dateString })}
                />
              </>
            </Modal>
          </div>
          <div className="col-lg-12 d-flex justify-content-end mt-3">
            <Pagination current={currentPage} total={totalItem} onChange={handleChangePage} />;
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default TraineeList
