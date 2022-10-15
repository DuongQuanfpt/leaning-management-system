import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const webContactApi = {
  addContact: (params) => {
    const url = `/api/contact-add`
    return axiosClient.post(url, params)
  },
  getPage: (params) => {
    const url = `/api/contact`
    return axiosClient.get(url, { ...header, params })
  },

  getDetail: (id) => {
    const url = `/api/contact-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/contact-detail/${id}`
    return axiosClient.put(url, params, header)
  },
}

export default webContactApi
