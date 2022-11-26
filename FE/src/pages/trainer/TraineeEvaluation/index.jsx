import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Breadcrumb, Segmented, Skeleton, Typography } from 'antd'

import Evaluations from './Evaluations'
import WorkEvaluations from './WorkEvaluations'

import evaluationApi from '~/api/evaluationApi'

import AdminHeader from '~/components/AdminDashboard/AdminHeader'
import AdminSidebar from '~/components/AdminDashboard/AdminSidebar'
import AdminFooter from '~/components/AdminDashboard/AdminFooter'

const TraineeEvaluation = () => {
  const { id } = useParams()
  const [mode, setMode] = useState('Evaluations')
  const [loading, setLoading] = useState(false)
  const [traineeEval, setTraineeEval] = useState({})

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    setLoading(true)
    await evaluationApi
      .getTraineeEvaluation(id)
      .then((response) => {
        setTraineeEval(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
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
                <div className="col-lg-12">
                  <Breadcrumb>
                    <Breadcrumb.Item>
                      <Link to="/dashboard">Dashboard</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                      <Link to="/submit-list">Submit List</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Trainee Evaluation</Breadcrumb.Item>
                  </Breadcrumb>
                </div>
              </div>
              <div className="col-lg-12 m-b30">
                <div className="col-lg-12 m-b30">
                  <Skeleton loading={loading} paragraph={{ rows: 0 }}>
                    <Typography.Title level={4}>{`${traineeEval.fullName} (${traineeEval.userName}), Assignment: <${
                      traineeEval.milestoneName
                    }> ${traineeEval.groupName ? `[${traineeEval.groupName}]` : ``}`}</Typography.Title>
                  </Skeleton>
                </div>
                <div className="col-lg-12 m-b30">
                  <Segmented
                    options={[
                      {
                        label: 'Evaluations',
                        value: 'Evaluations',
                      },
                      {
                        label: 'Work Evaluations',
                        value: 'Work Evaluations',
                      },
                    ]}
                    value={mode}
                    onChange={setMode}
                  />
                  <div className="widget-box">
                    {mode === 'Evaluations' && <Evaluations />}
                    {mode === 'Work Evaluations' && <WorkEvaluations />}
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

export default TraineeEvaluation
