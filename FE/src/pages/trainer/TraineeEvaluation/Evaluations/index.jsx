import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Typography } from 'antd'

const Evaluations = () => {
  const navigateTo = useNavigate()
  return (
    <div className="widget-inner">
      <div className="row">
        <div className="col-lg-12 m-b30">
          <div className="col-lg-12">
            <Typography.Text strong>Total Assignment Evaluation (/10): (scorehere)</Typography.Text>
          </div>
          <div className="col-lg-12">
            <Typography.Text>Criteria Name 1</Typography.Text>
          </div>
          <div className="col-lg-12">
            <Input.TextArea />
          </div>
          <div className="col-lg-12">
            <Typography.Text strong>
              Work Evaluation (%here): (sorehere) (number evaluated requirements)
            </Typography.Text>
          </div>
          <div className="col-lg-12">
            <Typography.Text>Bonus/Penalty: (score) {`<reasonhere>`}</Typography.Text>
          </div>
          <div className="col-lg-12">
            <Input.TextArea />
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
