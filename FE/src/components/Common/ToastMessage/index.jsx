import { message } from 'antd'

const ToastMessage = (type, mes, paddingTop = 8) =>
  message[type]({
    content: mes,
    style: {
      transform: `translate(0, ${paddingTop}vh)`,
    },
  })

export default ToastMessage
