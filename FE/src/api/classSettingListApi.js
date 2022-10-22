import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const classSettingListApi = {
  getPage: (params) => {
    const url = `/api/class-setting`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/api/class-setting-filter`
    return axiosClient.get(url, header)
  },

  getDetail: (id) => {
    const url = `/api/class-setting-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/class-setting-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  changeStatus: (id) => {
    const url = `/api/class-setting-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  addClass: (params) => {
    const url = `/api/class-setting-add`
    return axiosClient.post(url, params, header)
  },
}

export default classSettingListApi
