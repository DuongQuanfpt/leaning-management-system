import axios from 'axios'
import queryString from 'query-string'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory({ window })

const axiosClient = axios.create({
  baseURL: 'https://lms-app-1.herokuapp.com',
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
    const { message } = error.response.data

    if (message === 'Missing auth token') {
      //Response return fail by not loggin yet
      //Then logout account and navigate to login page
      localStorage.removeItem('persist:root')
      history.push('/login')
      console.warn('Error 401', error)
    }

    if (message === 'Access denied') {
      //Response return fail by account not have permission
      //Then navigate to access denied page
      history.push('/access-denied')
      console.warn('Error 403', error)
    }
    return Promise.reject(error)
  },
)

export default axiosClient
