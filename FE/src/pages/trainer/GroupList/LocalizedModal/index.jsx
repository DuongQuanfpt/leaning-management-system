import { Radio, Modal } from 'antd'
import React, { useState } from 'react'

const LocalizedModal = (trainee) => {
  const [value, setValue] = useState(1)
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const hideModal = () => {
    setOpen(false)
  }

  return (
    // <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
    //   <Radio value={1}>A</Radio>
    //   <Radio value={2}>B</Radio>
    // </Radio.Group>
    <Modal title="Modal" open={open} onOk={hideModal} onCancel={hideModal} okText="确认" cancelText="取消">
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Modal>
  )
}

export default LocalizedModal
