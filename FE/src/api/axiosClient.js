import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: 'https://lms-app-1.herokuapp.com',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(async (config) => {
  //Will handle token here
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  (error) => {
    console.log(error)
    throw error
  },
)

export default axiosClient
