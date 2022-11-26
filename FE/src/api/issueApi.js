import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const contactUsApi = {
  getIssue: (classCode, params) => {
    const url = `/api/issue/${classCode}`
    return axiosClient.get(url, { ...header, params })
  },

  getIssueDetail: (id) => {
    const url = `/api/issue-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeIssueDetail: (id, params) => {
    const url = `/api/issue-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getListFilter: (classCode, params) => {
    const url = `/api/issue-list-filter/${classCode}`
    return axiosClient.get(url, { ...header, params })
  },

  getAddFilter: (classCode) => {
    const url = `/api/issue-add-filter/${classCode}`
    return axiosClient.get(url, header)
  },

  getRequirementAddFilter: (classCode) => {
    const url = `api/requirement-add-filter/${classCode}`
    return axiosClient.get(url, header)
  },

  addIssue: (classCode, params) => {
    const url = `/api/issue-add/${classCode}`
    return axiosClient.post(url, params, header)
  },

  changeBatch: (params) => {
    const url = `/api/issue-batch-update`
    return axiosClient.put(url, params, header)
  },
}

export default contactUsApi
