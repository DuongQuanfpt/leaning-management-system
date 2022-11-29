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

  getAssignmentEvalList: (milestoneId, params) => {
    const url = `api/milestone-eval/${milestoneId}`
    return axiosClient.get(url, { ...header, params })
  },

  getAssignmentEvalFilter: (classCode) => {
    const url = `api/milestone-eval-filter/${classCode}`
    return axiosClient.get(url, header)
  },

  editAssignment: (milestoneId, params) => {
    const url = `api/milestone-eval/${milestoneId}`
    return axiosClient.post(url, params, header)
  },

  getClassEval: (params) => {
    const url = `api/class-evaluate`
    return axiosClient.get(url, { ...header, params })
  },

  editClassEval: (classCode, params) => {
    const url = `api/class-evaluate-update?classCode=${classCode}`
    return axiosClient.put(url, params, header)
  },

  generateClassEval: (classCode, params) => {
    const url = `api/class-evaluate-generate?classCode=${classCode}`
    return axiosClient.put(url, params, header)
  },
}

export default evaluationApi
