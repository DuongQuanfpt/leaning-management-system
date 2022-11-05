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

  getListFilter: (classCode) => {
    const url = `/api/issue-list-filter/${classCode}`
    return axiosClient.get(url, header)
  },

  getAddFilter: (classCode) => {
    const url = `/api/issue-add-filter/${classCode}`
    return axiosClient.get(url, header)
  },

  addIssue: (classCode, params) => {
    const url = `/api/issue-add/${classCode}`
    return axiosClient.post(url, params, header)
  },
}

export default contactUsApi
