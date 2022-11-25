import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, Typography } from 'antd'
import evaluationApi from '~/api/evaluationApi'

const Evaluations = () => {
  const navigateTo = useNavigate()
  const { id } = useParams()
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
        console.log(response)
        setTraineeEval(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="widget-inner">
      <div className="row">
        <div className="col-lg-12 m-b30">
          <div className="col-lg-12">
            <Typography.Text strong>Total Assignment Evaluation (/10): {traineeEval.milestoneGrade}</Typography.Text>
          </div>
          {traineeEval?.evaluatedCriteria?.map((item) => (
            <>
              <div className="col-lg-12">
                <Typography.Text>
                  {item.criteriaTitle} ({item.weight}%): <Typography.Text strong>{item.grade}</Typography.Text>
                </Typography.Text>
              </div>
              <div className="col-lg-12">
                <Input.TextArea value={item.comment} readOnly />
              </div>
            </>
          ))}

          <div className="col-lg-12 mt-3">
            <Typography.Text strong>
              Work Evaluation ({traineeEval.workWeight}%): {traineeEval.workGrade} ({traineeEval.workCount} evaluated
              requirements)
            </Typography.Text>
          </div>
          <div className="col-lg-12">
            <Typography.Text strong>Bonus/Penalty: {traineeEval.bonusGrade ?? 0}</Typography.Text>
          </div>
          <div className="col-lg-12">
            <Input.TextArea value={traineeEval.milestoneComment} readOnly />
          </div>
          <div className="col-lg-12 mt-3">
            <Button type="primary" onClick={() => navigateTo('/submit-list')}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Evaluations
