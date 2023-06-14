import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { CreateVariationProps, VariationProps } from '~/types/variation.type'

const path = '/variation'

export const addVariationService = async (data: CreateVariationProps) => {
  return callAxios(appService.post(path + '/create', data))
}

export const updateVariationService = async (id: number, data: CreateVariationProps) => {
  return callAxios(appService.patch(path + '/' + id, data))
}

export const deleteVariationService = async (id: number) => {
  return callAxios(appService.delete(path + '/' + id))
}
