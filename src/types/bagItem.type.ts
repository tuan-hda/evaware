import { ProductProps } from './product.type'
import { GenericData } from './service.type'
import { VariationProps } from './variation.type'

export interface BagItemProps {
  id: string
  img: string
  price: number
  desc: string
  qty: number
  createdAt: Date
  updatedAt: Date
  variation: string
}

export interface CartItemProps extends GenericData {
  qty: number
  created_by: number
  product: ProductProps
  variation: VariationProps
}
