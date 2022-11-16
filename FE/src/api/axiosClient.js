import axios from 'axios'
import queryString from 'query-string'
import { message } from 'antd'

const url = process.env.REACT_APP_LMS_API_URL

const axiosClient = axios.create({
  baseURL: url,
  withCredentials: false,
  'Access-Control-Allow-Origin': '*',
  'Content-type': 'application/json; charset=utf-8',
  Accept: 'application/json; charset=utf-8',
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use(
  async (requestConfig) => {
    let interceptedConfig = { ...requestConfig }

    if (interceptedConfig.anonymousRequest) console.log('Anonymous request')

    //Can handle token more in here
    return interceptedConfig
  },
  (requestError) => {
    // TODO : Send this over to a logging facility
    return Promise.reject(requestError)
  },
)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  async (error) => {
    // Handle exceptions/invalid logs here
    if (error.code === 'ERR_NETWORK') {
      message.error('You are offline. Check your internet connection again', 10)
      return
    }

    if (error?.response?.data?.message === 'Missing auth token') {
      //Response return fail by not loggin yet
      //Then logout account and navigate to login page
      localStorage.removeItem('persist:LMS')
      window.location.replace('/login')
      console.warn('Error 401', error)
    }

    if (error?.response?.data?.message === 'Access denied') {
      //Response return fail by account not have permission to access
      //Then navigate to access denied page
      window.location.replace('/access-denied')
      console.warn('Error 403', error)
    }
    return Promise.reject(error)
  },
)

export default axiosClient
