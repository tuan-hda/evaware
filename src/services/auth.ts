import { UserProps } from '~/types/user.type'
import { service } from './base'
import { callAxios } from '~/utils/callAxios'

const path = '/auth'

export const loginService = async (email: string, password: string) => {
  return await callAxios<UserProps>(service.post(path + '/login', { email, password }))
}

export const signUpService = async (email: string, password: string) => {
  return await callAxios(service.post(path + '/register', { email, password }))
}
