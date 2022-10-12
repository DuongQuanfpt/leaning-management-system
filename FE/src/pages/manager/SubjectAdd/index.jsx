import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'

import {
  CContainer,
  CRow,
  CCol,
  CForm,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react'
import { Breadcrumb, Radio, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import ErrorMsg from '~/components/Common/ErrorMsg'
import subjectListApi from '~/api/subjectListApi'
import { useSelector } from 'react-redux'

const SubjectAdd = () => {
  const [listManager, setListManager] = useState([])
  const [listExpert, setListExpert] = useState([])

  const [manager, setManager] = useState('Select Manager')
  const [expert, setExpert] = useState('Select Expert')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState(0)
  const [body, setBody] = useState('')
  const [error, setError] = useState('')

  const { roles } = useSelector((state) => state.profile)

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    subjectListApi
      .getFilter()
      .then((response) => {
        setListManager(response.managerFilter)
        setListExpert(response.expertFilter)
      })
      .catch((error) => setError('Something went wrong, please try again'))
  }

  const handleAdd = async () => {
    const params = {
      subjectCode: code,
      subjectName: name,
      managerUsername: manager,
      expertUsername: expert,
      subjectStatus: status,
      body: body,
    }

    await subjectListApi
      .addSubject(params)
      .then((response) => {
        setError('You have successfully add new subject')
      })
      .catch((error) => {
        setError('Something went wrong, please try again')
      })
  }

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const modalConfirm = () => {
    setError('')
    Modal.confirm({
      title: `Are you want to add new Subject?`,
      icon: <ExclamationCircleOutlined />,
      okText: 'OK',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk() {
        handleAdd()
      },
      onCancel() {},
    })
  }

  return (
    <>
      <AdminSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AdminHeader />
        <div className="body flex-grow-1 px-3">
          <div className="col-lg-12 m-b30">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/subject-list">Subject List</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Subject Detail</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <CContainer>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <div className="row">
                    <div className="col-lg-12 m-b30">
                      <div className="widget-box">
                        <div className="widget-inner">
                          <div className="row">
                            <div className="form-group col-6">
                              <label className="col-form-label">Code</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Name</label>
                              <div>
                                <input
                                  className="form-control"
                                  type="text"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Manager</label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{manager}</CDropdownToggle>
                                <CDropdownMenu className="w-100">
                                  {listManager.map((manager) => (
                                    <CDropdownItem onClick={() => setManager(manager)}>{manager}</CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Expert</label>
                              <CDropdown className="w-100">
                                <CDropdownToggle color="warning">{expert}</CDropdownToggle>
                                <CDropdownMenu className="w-100">
                                  {listExpert.map((expert) => (
                                    <CDropdownItem onClick={() => setExpert(expert)}>{expert}</CDropdownItem>
                                  ))}
                                </CDropdownMenu>
                              </CDropdown>
                            </div>
                            <div className="form-group col-6">
                              <label className="col-form-label">Status</label>
                              <div>
                                <Radio.Group onChange={handleChangeStatus} value={status}>
                                  <Radio value={1}>Active</Radio>
                                  <Radio value={0}>Inactive</Radio>
                                </Radio.Group>
                              </div>
                            </div>
                            <div className="form-group col-12">
                              <label className="col-form-label">Description</label>
                              <div>
                                <textarea
                                  className="form-control"
                                  type="text"
                                  value={body}
                                  onChange={(e) => setBody(e.target.value)}
                                />
                              </div>
                            </div>
                            <ErrorMsg errorMsg={error} />
                            <div className="d-flex">
                              <CButton size="md" className="mr-5" color="warning" onClick={modalConfirm}>
                                Add
                              </CButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </div>
      </div>
    </>
  )
}

export default SubjectAdd
