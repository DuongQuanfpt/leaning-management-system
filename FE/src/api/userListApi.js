import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const userListApi = {
  getFirstPage: (params) => {
    const url = `/admin/user-list`
    return axiosClient.get(url, { ...header, params })
  },

  getPage: (params) => {
    const url = `/admin/user-list`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/admin/user-filter`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/admin/user/status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/admin/user/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/admin/user/${id}`
    return axiosClient.put(url, params, header)
  },
}

export default userListApi
