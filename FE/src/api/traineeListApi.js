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

  getDetail: (id, code) => {
    const url = `/api/trainee-detail/${id}/${code}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, code, params) => {
    const url = `/api/trainee-detail/${id}/${code}`
    return axiosClient.put(url, params, header)
  },

  updateStatus: (id, code) => {
    const url = `/api/trainee-status/${id}/${code}`
    return axiosClient.put(url, {}, header)
  },

  setDropout: (id, code, params) => {
    const url = `/api/trainee-dropout/${id}/${code}`
    return axiosClient.put(url, params, header)
  },

  importTrainee: (code, params) => {
    const url = `/api/trainee-import/${code}`
    return axiosClient.post(url, params, header)
  },
}

export default traineeListApi
