import React from 'react'

const ErrorMsg = ({ errorMsg, isError = true }) => {
  return <p className={isError ? 'text-danger h6' : 'text-success h6'}>{errorMsg}</p>
}

export default ErrorMsg
