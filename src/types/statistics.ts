import { CategoryProps } from './category.type'

export interface SalesProps {
  total: number
  monthly_totals: Record<string, number>
  growth: number
}
export interface TopCategoriesProps {
  data: {
    category: CategoryProps
    qty: number
    percentage: number
  }[]
  new_buyers_percent: number
  returning_percent: number
}
