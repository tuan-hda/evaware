import { CategoryProps } from './category.type'

export interface ProductProps {
  id: number
  created_at: Date
  updated_at: Date
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
  createdAt: Date
  updatedAt: Date
  isDeleted: boolean
  reviewsCount: number
  avgRating: number
  variationsCount: number
  imageURL: string
  badge: string
  isFavorited: boolean
}
