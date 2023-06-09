import { CategoryProps } from '~/types/category.type'
import { ListProps } from '~/types/service.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'

export const getAllCategoriesService = async () => {
  return await callAxios<ListProps<CategoryProps>>(appService.get('/category'))
}
