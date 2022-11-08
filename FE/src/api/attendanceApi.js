import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const attendanceApi = {
  getAttendanceDetail: (params) => {
    const url = `/api/attendance-tracking`
    return axiosClient.get(url, { ...header, params })
  },
}

export default attendanceApi
