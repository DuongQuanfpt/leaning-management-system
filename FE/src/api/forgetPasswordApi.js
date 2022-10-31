import axiosClient from './axiosClient'

const forgetPasswordApi = {
  forgetPassword: (params) => {
    const url = `/user/forgot-processing`
    return axiosClient.put(url, params)
  },

  resetPassword: (params) => {
    const url = `/user/forgot-pass`
    return axiosClient.put(url, params)
  },
}

export default forgetPasswordApi
