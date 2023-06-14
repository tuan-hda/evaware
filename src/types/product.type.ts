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
