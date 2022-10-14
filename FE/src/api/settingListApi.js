import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const settingListApi = {
  getAll: () => {
    const url = `/api/setting`
    return axiosClient.get(url, header)
  },

  getPage: (params) => {
    const url = `/api/setting`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/api/setting-filter`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/api/setting-status/${id}`
    return axiosClient.put(url, {}, header)
  },

  getDetail: (id) => {
    const url = `/api/setting-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/setting-detail/${id}`
    return axiosClient.put(url, params, header)
  },

  addSetting: (params) => {
    const url = `/api/setting-add`
    return axiosClient.post(url, params, header)
  },
}

export default settingListApi
