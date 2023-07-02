import { CategoryProps } from '~/types/category.type'
import { ListProps } from '~/types/service.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'



export const getAllCategoriesService = async () => {
  return await callAxios<ListProps<CategoryProps>>(appService.get('/category'))
}
export const getCategoryService = async (id:number) => {
  return await callAxios<CategoryProps>(appService.get('/category' + '/' + id))
}
export const addCategoryService = async (data:CategoryProps) => {
  return await callAxios<CategoryProps>(appService.post('/category/create',data))
}
export const updateCategoryService = async (data:CategoryProps) => {
  return await callAxios<CategoryProps>(appService.patch('/category/' + data.id,data))
}