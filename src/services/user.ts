import { GeneralUserProps, UserProps } from '~/types/user.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { ListProps } from '~/types/service.type'

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

export const updateUserAdminService = async (id: number, data: Partial<GeneralUserProps>) => {
  return callAxios(appService.patch('/user/' + id + '/admin', data))
}

export const getAllUsersService = async () => {
  return appService.get<ListProps<GeneralUserProps>>('/user', {
    params: {
      count: 100
    }
  })
}
