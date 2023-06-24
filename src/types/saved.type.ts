import { ConvertedProductDetailProps, ProductProps } from './product.type'
import { GenericData } from './service.type'

export interface SavedItemProps extends GenericData {
  qty: number
  created_by: number
  product: ConvertedProductDetailProps
}
