import axiosClient from './axiosClient'

const userApi = {
  getToken: (params) => {
    const url = `https://lms-app-1.herokuapp.com/auth/login`
    return axiosClient.post(url, { params })
  },
}

export default userApi
