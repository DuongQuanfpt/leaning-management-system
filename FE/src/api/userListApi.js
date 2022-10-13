import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const userListApi = {
  getPage: (params) => {
    const url = `/api/user`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/api/user-filter`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/api/user-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/user-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/user-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  addUser: (params) => {
    const url = `/api/user-add`
    return axiosClient.post(url, params, header)
  },
}

export default userListApi
