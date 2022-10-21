import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const subjectListApi = {
  getPage: (params) => {
    const url = `/api/subject-setting`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/api/subject-setting-filter`
    return axiosClient.get(url, header)
  },

  getDetail: (id) => {
    const url = `/api/subject-setting-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/subject-setting-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  addSubject: (params) => {
    const url = `/api/subject-setting-add`
    return axiosClient.post(url, params, header)
  },
}

export default subjectListApi
