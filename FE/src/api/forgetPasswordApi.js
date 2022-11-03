import axiosClient from './axiosClient'

const forgetPasswordApi = {
  forgetPassword: (params, token) => {
    const url = `/user/forgot-processing?token=${token}`
    return axiosClient.put(url, params)
  },

  resetPassword: (params) => {
    const url = `/user/forgot-pass`
    return axiosClient.put(url, params)
  },
}

export default forgetPasswordApi
