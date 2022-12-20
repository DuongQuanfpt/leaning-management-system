import axiosClient from './axiosClient'

const authApi = {
  getAuthToken: (params) => {
    const url = `/auth/login`
    return axiosClient.post(url, params)
  },

  getLoginGoogle: (params) => {
    const url = `/auth/login-google`
    return axiosClient.post(url, params)
  },

  resendVerifyMail: (params) => {
    const url = `/auth/resend-verify`
    return axiosClient.put(url, params)
  },
}

export default authApi
