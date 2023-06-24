import { CategoryProps } from './category.type'
import { ReviewProps } from './reviews.type'
import { GenericData } from './service.type'
import { VariationProps } from './variation.type'

export interface ProductProps extends GenericData {
  is_deleted: boolean
  name: string
  desc: string
  discount: number
  price: number
  thumbnail: string
  reviews_count: number
  avg_rating: number
  variations_count: number
  category: CategoryProps
  is_favorited: boolean
  width?: number
  height?: number
  length?: number
  weight?: number
  material?: string
  more_info?: string
}

export interface CreateProductProps {
  name: string
  desc: string
  discount?: number | string
  price: number | string
  thumbnail: string
  width?: number | string
  height?: number | string
  length?: number | string
  weight?: number | string
  material?: string
  more_info?: string
  category: number
}

export interface ConvertedProductProps extends ProductProps {
  createdAt: string
  updatedAt: string
  isDeleted: boolean
  reviewsCount: number
  avgRating: number
  variationsCount: number
  imageURL: string
  badge: string
  isFavorited: boolean
}

export interface ConvertedProductDetailProps extends ConvertedProductProps {
  variations: (VariationProps | undefined)[]
  reviews: (ReviewProps | undefined)[]
}

export interface StatisticProductProps {
  product: ConvertedProductProps
  sales: number
  revenue: number
}
