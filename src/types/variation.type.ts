import { SoftGenericData } from './service.type'

export interface VariationProps extends SoftGenericData {
  inventory: number
  name: string
  img_urls: string[]
  product: number
}
