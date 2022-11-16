import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const webContactApi = {
  getSchedule: (params) => {
    const url = `/api/schedule`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/api/schedule-filter`
    return axiosClient.get(url, header)
  },

  getDetail: (id) => {
    const url = `/api/schedule-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/schedule-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  addSchedule: (params) => {
    const url = `/api/schedule-add`
    return axiosClient.post(url, params, header)
  },

  getMySchedule: () => {
    const url = `/api/my-schedule`
    return axiosClient.get(url, header)
  },
}

export default webContactApi
