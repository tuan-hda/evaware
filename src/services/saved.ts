import { ListProps } from '~/types/service.type'
import { appService } from './base'
import { SavedItemProps } from '~/types/saved.type'
import { callAxios } from '~/utils/callAxios'

const path = '/favorite'

export const getSavedItemsService = async () => {
  return await appService.get<ListProps<SavedItemProps>>(path)
}

export const deleteSavedItemsService = async (id: number) => {
  return callAxios(appService.delete(`${path}/${id}`))
}
