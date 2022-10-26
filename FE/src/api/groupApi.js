import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const groupApi = {
  getFilter: () => {
    const url = `/api/group-filter`
    return axiosClient.get(url, header)
  },

  getDetail: (id) => {
    const url = `/api/group-detail/${id}`
    return axiosClient.get(url, header)
  },
}

export default groupApi
