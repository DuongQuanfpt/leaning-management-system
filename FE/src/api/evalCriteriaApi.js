import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const evalCriteriaApi = {
  getPage: (params) => {
    const url = `/api/criteria`
    return axiosClient.get(url, { ...header, params })
  },

  changeActive: (id) => {
    const url = `/api/criteria-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/criteria-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/criteria-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getFilter: () => {
    const url = `/api/criteria-filter`
    return axiosClient.get(url, header)
  },

  getFilterWithClass: (params) => {
    const url = `/api/criteria-filter`
    return axiosClient.get(url, { ...header, params })
  },

  addCriteria: (params) => {
    const url = `/api/criteria-add`
    return axiosClient.post(url, params, header)
  },
}

export default evalCriteriaApi
