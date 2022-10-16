import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const traineeListApi = {
  getAll: (params) => {
    const url = `/api/trainee`
    return axiosClient.get(url, { ...header, params })
  },
  getPage: (params) => {
    const url = `/api/trainee`
    return axiosClient.get(url, { ...header, params })
  },

  getDetail: (id) => {
    const url = `/api/trainee/${id}`
    return axiosClient.get(url, header)
  },
}

export default traineeListApi
