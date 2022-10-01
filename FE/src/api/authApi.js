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
}

export default authApi
