import { appService } from './base'

export interface FilterProps {
  max_price: number
  min_price: number
  width: number[]
  height: number[]
  depth: number[]
  weight: number[]
  material: string[]
  variation: string[]
}

export const getFilterService = async () => {
  return appService.get<FilterProps>('/filter/get-filters')
}
