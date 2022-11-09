import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const attendanceApi = {
  getAttendanceTracking: (params) => {
    const url = `/api/attendance-tracking`
    return axiosClient.get(url, { ...header, params })
  },

  getAttendanceDetail: (id) => {
    const url = `/api/attendance-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeAttendanceDetail: (id, params) => {
    const url = `/api/attendance-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  getScheduleAttendance: (params) => {
    const url = `/api/attendance-schedule`
    return axiosClient.get(url, { ...header, params })
  },
}

export default attendanceApi
