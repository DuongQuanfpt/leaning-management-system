import axios from 'axios'
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
}

export default submitApi
