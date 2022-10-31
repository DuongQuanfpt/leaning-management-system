import axiosClient from './axiosClient'

const registerApi = {
  register: (params) => {
    const url = `/auth/register`
    return axiosClient.post(url, params)
  },

  verify: (params) => {
    const url = `/auth/verify`
    return axiosClient.get(url, params)
  },
}

export default registerApi
