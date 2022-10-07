import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const subjectListApi = {
  getAll: () => {
    const url = `/api/subjects`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/api/subjects-status/${id}`
    return axiosClient.put(url, {}, header)
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
