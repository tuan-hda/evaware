import { UserProps } from '~/types/user.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'

export const getCurrentUserProfileService = async () => {
  let res = await callAxios<UserProps>(appService.get('/user/current'))
  return res
}

export const getAltCurrentUserProfileService = async () => {
  return appService.get<UserProps>('/user/current')
}

export const updateUserProfileService = async (id: number, data: Partial<UserProps>) => {
  return callAxios(appService.patch('/user/' + id, data))
}
