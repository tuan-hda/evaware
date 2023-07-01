import { appService } from './base'

export interface FilterProps {
  max_price: number
  min_price: number
  width: number[]
  height: number[]
  length: number[]
  weight: number[]
  material: string[]
  variation: string[]
}

export const getFilterService = async (id?: number) => {
  if (!id || id === -1) return appService.get<FilterProps>('/filter/get-filters')
  return appService.get<FilterProps>('/filter/get-filters/' + id)
}
