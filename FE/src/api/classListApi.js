import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const classListApi = {
  getAll: () => {
    const url = `/api/class`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/api/class-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/class-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/class-detail/${id}`
    return axiosClient.put(url, params, header)
  },
}

export default classListApi
