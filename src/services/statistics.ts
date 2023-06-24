import { StatisticProductProps } from '~/types/product.type'
import { appService } from './base'
import { SalesProps, TopCategoriesProps } from '~/types/statistics'

export const getTopProductService = async (range_type: 'yearly' | 'monthly' | 'quarterly' | 'weekly') => {
  return appService.get<StatisticProductProps[]>('/statistics/top-product?range_type=' + range_type)
}

export const getSalesService = async (from_date: string, to_date: string) => {
  return appService.get<SalesProps>('/statistics/sales', {
    params: { from_date, to_date }
  })
}

export const getTopCategoriesService = async () => {
  return appService.get<TopCategoriesProps>('/statistics/top-categories')
}
