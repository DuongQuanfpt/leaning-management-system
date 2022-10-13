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
}

export default webContactApi
