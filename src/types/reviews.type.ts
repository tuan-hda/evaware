import { UserProps } from '~/types/user.type'
import { ProductProps } from './product.type'
import { GenericData } from './service.type'
import { VariationProps } from './variation.type'

export interface ReviewProps extends GenericData {
  variation: VariationProps
  product: ProductProps
  created_by: UserProps
  content: string
  rating: number
  img_urls: string[]
}

export interface CreateReviewProps
  extends Omit<ReviewProps, 'created_by' | 'variation' | 'product' | keyof GenericData> {
  variation: number
  product: number
}
