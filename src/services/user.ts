import { UserProps } from '~/types/user.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'

export const getCurrentUserProfileService = async () => {
  let res = await callAxios<UserProps>(appService.get('/user/current'))
  return res
}
