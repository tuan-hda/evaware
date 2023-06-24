import { ProductProps } from './product.type'
import { GenericData } from './service.type'
import { VariationProps } from './variation.type'

export interface BagItemProps {
  id: number
  img: string
  price: number
  desc: string
  qty: number
  createdAt: string
  updatedAt: string
  variation: string
  discount: number
}

export interface CartItemProps extends GenericData {
  qty: number
  created_by: number
  product: ProductProps
  variation: VariationProps
}
