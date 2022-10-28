import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const groupApi = {
  getGroup: () => {
    const url = `/api/group`
    return axiosClient.get(url, header)
  },

  getFilter: (params) => {
    const url = `/api/group-filter`
    return axiosClient.get(url, { ...header, params })
  },

  getDetail: (id) => {
    const url = `/api/group-detail/${id}`
    return axiosClient.get(url, header)
  },
}

export default groupApi
