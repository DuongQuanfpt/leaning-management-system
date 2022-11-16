import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const postApi = {
  getListPost: (params) => {
    const url = `/api/post`
    return axiosClient.get(url, { params })
  },

  getPost: (postId) => {
    const url = `/api/post-view/${postId}`
    return axiosClient.get(url, header)
  },

  editPost: (postId, params) => {
    const url = `/api/post-view/${postId}`
    return axiosClient.put(url, params, header)
  },

  createPost: (params) => {
    const url = `/api/post-upload`
    return axiosClient.post(url, params, header)
  },
}

export default postApi
