import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const evaluationApi = {
  getTraineeEvaluation: (submitId) => {
    const url = `api/trainee-result/${submitId}`
    return axiosClient.get(url, header)
  },

  getWorkUpdateForm: (submitId, workId) => {
    const url = `/api/work-update/${submitId}/${workId}`
    return axiosClient.get(url, header)
  },

  addWorkUpdate: (submitId, workId, params) => {
    const url = `/api/work-update/${submitId}/${workId}`
    return axiosClient.post(url, params, header)
  },

  editWorkUpdate: (updateId, params) => {
    const url = `/api/work-update/${updateId}`
    return axiosClient.put(url, params, header)
  },

  deleteWorkUpdate: (updateId) => {
    const url = `/api/work-update/${updateId}`
    return axiosClient.delete(url, { ...header })
  },
}

export default evaluationApi
