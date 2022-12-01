import axiosClient from './axiosClient'

const userApi = {
  getProfile: (token) => {
    const url = `/user`
    const header = {
      headers: { Authorization: `Bearer ${token}` },
    }

    return axiosClient.get(url, header)
  },

  updateProfile: (params, token) => {
    const url = `/user/update-profile`
    return axiosClient.put(url, params, { headers: { Authorization: `Bearer ${token}` } })
  },
}

export default userApi
