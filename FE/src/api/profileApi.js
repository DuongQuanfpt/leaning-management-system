import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const userApi = {
  getProfile: (token) => {
    const url = `/user`
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    }

    return axiosClient.get(url, header)
  },
  updateProfile: (params) => {
    const url = `/user/update-profile`
    return axiosClient.put(url, params, header)
  },
}

export default userApi
