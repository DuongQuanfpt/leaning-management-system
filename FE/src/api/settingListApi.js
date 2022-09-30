import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const settingListApi = {
  getFirstPage: (params) => {
    const url = `/admin/setting`
    return axiosClient.get(url, { ...header, params })
  },

  getPage: (params) => {
    const url = `/admin/setting`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: () => {
    const url = `/admin/setting-filter`
    return axiosClient.get(url, header)
  },

  changeActive: (id) => {
    const url = `/admin/setting/status/${id}`
    return axiosClient.put(url, header)
  },

  getDetail: (id) => {
    const url = `/admin/setting/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/admin/setting/${id}`
    return axiosClient.put(url, params, header)
  },
}

export default settingListApi
