import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Breadcrumb, Segmented, Select } from 'antd'

import submitApi from '~/api/submitApi'
import { useSelector } from 'react-redux'

import Group from './Group'
import Individual from './Individual'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'
import { useEffect } from 'react'

const SubmitList = () => {
  const [mode, setMode] = useState('Group')

  const { currentClass } = useSelector((state) => state.profile)

  const [listFilter, setListFilter] = useState([])
  const [milestoneSelected, setMilestoneSelected] = useState(null)

  useEffect(() => {
    setListFilter([])
    setMilestoneSelected(null)
    loadMilestone()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClass])

  const loadMilestone = async () => {
    await submitApi
      .getListfilter(currentClass)
      .then((response) => {
        setListFilter(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChangeMilestone = (id) => {
    setMilestoneSelected(id)
  }

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
                  <div className="col-4 d-flex align-items-center">
                    <Breadcrumb>
                      <Breadcrumb.Item>
                        <Link to="/dashboard">Dashboard</Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Submit List</Breadcrumb.Item>
                    </Breadcrumb>
                  </div>
                  <div className="col-4 d-flex align-items-center"></div>
                  <div className="col-4 d-flex align-items-center">
                    <Select
                      className="w-100"
                      placeholder="Select Milestone"
                      options={listFilter?.milestoneFilter?.map((milestone) => ({
                        value: milestone.milestoneId,
                        label: milestone.milestoneTitle,
                      }))}
                      value={milestoneSelected}
                      onChange={(value) => handleChangeMilestone(value)}
                    ></Select>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12 m-b30">
                  <Segmented
                    options={[
                      {
                        label: 'Group',
                        value: 'Group',
                      },
                      {
                        label: 'Individual',
                        value: 'Individual',
                      },
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                  <div className="widget-box">
                    {mode === 'Group' && <Group milestoneId={milestoneSelected} />}
                    {mode === 'Individual' && <Individual milestoneId={milestoneSelected} />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AdminFooter />
      </div>
    </div>
  )
}

export default SubmitList
