import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const assignmentApi = {
  getPage: (params) => {
    const url = `/api/assignment`
    return axiosClient.get(url, { ...header, params })
  },

  changeActive: (id) => {
    const url = `/api/assignment-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/assignment-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/assignment-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getFilter: () => {
    const url = `/api/assignment-filter`
    return axiosClient.get(url, header)
  },

  addAssignment: (params) => {
    const url = `/api/assignment-add`
    return axiosClient.post(url, params, header)
  },
}

export default assignmentApi
