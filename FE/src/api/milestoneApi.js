import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const milestoneApi = {
  getPage: (params) => {
    const url = `/api/milestone`
    return axiosClient.get(url, { ...header, params })
  },

  changeActive: (id) => {
    const url = `/api/milestone-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/milestone-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/milestone-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getFilter: () => {
    const url = `/api/milestone-filter`
    return axiosClient.get(url, header)
  },

  addMilestone: (params) => {
    const url = `/api/milestone-add`
    return axiosClient.post(url, params, header)
  },
}

export default milestoneApi
