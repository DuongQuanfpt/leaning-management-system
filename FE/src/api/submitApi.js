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

  getListfilter: (classCode) => {
    const url = `/api/submit-list-filter/${classCode}`
    return axiosClient.get(url, header)
  },
}

export default submitApi
