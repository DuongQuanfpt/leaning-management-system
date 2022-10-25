import axiosClient from './axiosClient'

const contactUsApi = {
  getSubject: () => {
    const url = `/api/contact-subjects`
    return axiosClient.get(url)
  },
}

export default contactUsApi
