import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const subjectListApi = {
  getPage: (params) => {
    const url = `/api/subjects`
    return axiosClient.get(url, { ...header, params })
  },

  changeActive: (id) => {
    const url = `/api/subjects-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getFilter: () => {
    const url = `/api/subjects-filter`
    return axiosClient.get(url, header)
  },

  // getDetail: (id) => {
  //   const url = `/api/setting/${id}`
  //   return axiosClient.get(url, header)
  // },

  // changeDetail: (id, params) => {
  //   const url = `/api/setting/${id}`
  //   return axiosClient.put(url, params, header)
  // },
}

export default subjectListApi
