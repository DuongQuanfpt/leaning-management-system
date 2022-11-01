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
}

export default webContactApi
