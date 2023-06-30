import { UserProps } from '~/types/user.type'
import { service } from './base'
import { callAxios } from '~/utils/callAxios'
import axios from 'axios'

const path = '/auth'

export const loginService = async (email: string, password: string) => {
  // return await callAxios<UserProps>(service.post(path + '/login', { email, password }))
  return await callAxios<UserProps>(axios.post('192.168.11.149:8000/api/auth/login', { email, password }))
  
}

export const signUpService = async (email: string, password: string) => {
  return await callAxios(service.post(path + '/register', { email, password }))
}
