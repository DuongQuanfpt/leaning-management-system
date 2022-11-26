import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Input, Skeleton, Typography } from 'antd'
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
          <Skeleton loading={loading}>
            <div className="col-lg-12">
              <Typography.Text strong>
                Total Assignment Evaluation (/10): {traineeEval.milestoneGrade ?? 0}
              </Typography.Text>
            </div>
            {traineeEval?.evaluatedCriteria?.map((item) => (
              <>
                <div className="col-lg-12">
                  <Typography.Text>
                    {item.criteriaTitle} ({item.weight ?? 0}%):{' '}
                    <Typography.Text strong>{item.grade ?? 0}</Typography.Text>
                  </Typography.Text>
                </div>
                <div className="col-lg-12">
                  <Input.TextArea value={item.comment} readOnly />
                </div>
              </>
            ))}
            <div className="col-lg-12 mt-3">
              <Typography.Text strong>
                Work Evaluation ({traineeEval.workWeight ?? 0}%): {traineeEval.workGrade ?? 0} (
                {traineeEval.workCount ?? 0} evaluated requirements)
              </Typography.Text>
            </div>
            <div className="col-lg-12">
              <Typography.Text strong>Bonus/Penalty: {traineeEval.bonusGrade ?? 0}</Typography.Text>
            </div>
            <div className="col-lg-12">
              <Input.TextArea value={traineeEval.milestoneComment} readOnly />
            </div>
          </Skeleton>

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
