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

  getFilter: () => {
    const url = `/api/group-filter`
    return axiosClient.get(url, header)
  },

  getDetail: (id) => {
    const url = `/api/group-detail/${id}`
    return axiosClient.get(url, header)
  },

  changeDetail: (id, params) => {
    const url = `/api/group-detail/${id}`
    return axiosClient.put(url, params, header)
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
    const url = `/api/group-member-add/${userName}/${groupId}`
    return axiosClient.post(url, {}, header)
  },

  detachGroup: (groupId, milestoneId) => {
    const url = `/api/group-detach/${groupId}/${milestoneId}`
    return axiosClient.put(url, {}, header)
  },

  moveFromGroupToExistGroup: (userName, groupId, newGroupId) => {
    const url = `/api/group-change/${userName}/${groupId}/${newGroupId}`
    return axiosClient.put(url, {}, header)
  },

  moveFromWaitingListToExistGroup: (userName, newGroupId) => {
    const url = `/api/group-change/${userName}/${newGroupId}`
    return axiosClient.post(url, {}, header)
  },

  changeActiveStudent: (userName, groupId) => {
    const url = `/api/group-member-status/${userName}/${groupId}`
    return axiosClient.put(url, {}, header)
  },

  changeActiveGroup: (groupId) => {
    const url = `/api/group-status/${groupId}`
    return axiosClient.put(url, {}, header)
  },

  createGroup: (username, milestoneId, params) => {
    const url = `/api/group-add/${username}/${milestoneId}`
    return axiosClient.post(url, params, header)
  },

  removeAllGroups: (id) => {
    const url = `/api/group-removes/${id}`
    return axiosClient.delete(url, header)
  },
}

export default groupApi
