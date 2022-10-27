import axiosClient from './axiosClient'

const currentAccessToken = JSON.parse(JSON.parse(localStorage.getItem('persist:LMS')).auth).token

const header = {
  headers: { Authorization: `Bearer ${currentAccessToken}` },
}

const groupApi = {
  getGroup: (params) => {
    const url = `/api/group`
    return axiosClient.get(url, { ...header, params })
  },

  getFilter: (params) => {
    const url = `/api/group-filter`
    return axiosClient.get(url, { ...header, params })
  },

  getDetail: (id) => {
    const url = `/api/group-detail/${id}`
    return axiosClient.get(url, header)
  },

  setLeader: (username, groupId) => {
    const url = `/api/group-set-leader/${username}/${groupId}`
    return axiosClient.put(url, {}, header)
  },

  remove: (username, groupCode, milestoneId) => {
    const url = `/api/group-member-remove/${username}/${groupCode}/${milestoneId}`
    return axiosClient.delete(url, header)
  },

  addFromWaitingList: (userName, groupId, milestoneId) => {
    const url = `/api/group-member-add/${userName}/${groupId}/${milestoneId}`
    return axiosClient.post(url, {}, header)
  },

  detachGroup: (groupId, milestoneId) => {
    const url = `/api/group-detach/${groupId}/${milestoneId}`
    return axiosClient.put(url, {}, header)
  },
}

export default groupApi
