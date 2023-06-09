import axios from 'axios'
import { BASE_URL } from '@env'
import useUserStore from '~/store/user'

export const service = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

export const appService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

appService.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().user?.token

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
