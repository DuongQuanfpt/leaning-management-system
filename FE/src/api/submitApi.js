import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const submitApi = {
  getListSubmit: (classCode, params) => {
    const url = `/api/submit/${classCode}`
    return axiosClient.get(url, { ...header, params })
  },

  getListfilter: (classCode, params) => {
    const url = `/api/submit-list-filter/${classCode}`
    return axiosClient.get(url, { ...header, params })
  },

  getListSubmitFilter: (submitId) => {
    const url = `api/new-submit/${submitId}`
    return axiosClient.get(url, header)
  },

  submitFile: (submitId, params) => {
    const url = `api/new-submit/${submitId}`
    return axiosClient.post(url, params, {
      headers: { Authorization: `Bearer ${currentAccessToken}`, 'content-type': 'multipart/form-data' },
    })
  },

  requirementChange: (params) => {
    const url = `/api/issue-multichange`
    return axiosClient.put(url, params, header)
  },

  getSubmitDetail: (submitId) => {
    const url = `/api/submit-detail/${submitId}`
    return axiosClient.get(url, header)
  },

  getWorkEval: (submitId, workId) => {
    const url = `api/work-eval/${submitId}/${workId}`
    return axiosClient.get(url, header)
  },
}

export default submitApi
