import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const classEvalCriteriaApi = {
  getPage: (params) => {
    const url = `/api/class-criteria`
    return axiosClient.get(url, { ...header, params })
  },

  changeStatus: (id) => {
    const url = `/api/class-criteria-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/class-criteria-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/class-criteria-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getFilter: () => {
    const url = `/api/class-criteria-filter`
    return axiosClient.get(url, header)
  },

  addClassCriteria: (params) => {
    const url = `/api/class-criteria-add`
    return axiosClient.post(url, params, header)
  },
}

export default classEvalCriteriaApi
