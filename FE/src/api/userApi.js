import axiosClient from './axiosClient'

const userApi = {
  getAll: (params) => {
    const url = `/user`
    return axiosClient.get(url, { params })
  },

  get: (email) => {
    const url = `/user/${email}`
    return axiosClient.get(url)
  },
}

export default userApi
