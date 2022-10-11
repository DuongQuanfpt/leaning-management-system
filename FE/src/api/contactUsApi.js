import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const contactUsApi = {
  getSubject: () => {
    const url = `/api/contact-subjects`
    return axiosClient.get(url)
  },
}

export default contactUsApi
