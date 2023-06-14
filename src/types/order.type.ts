import { ConvertedProductDetailProps, ProductProps } from './product.type'
import { GenericData } from './service.type'
import { VariationProps } from './variation.type'
import { VoucherProps } from './voucher.type'

export interface OrderDetailProps extends GenericData {
  variation: VariationProps
  product: ConvertedProductDetailProps
  price: number
  qty: number
}

export interface OrderProps extends GenericData {
  order_details: OrderDetailProps[]
  email: string
  phone: string
  full_name: string
  province: string
  province_code: number
  district: string
  district_code: number
  ward: string
  ward_code: number
  street: string
  status: string
  total: number
  payment: string
  shipping_date: string
  voucher?: VoucherProps
}

export interface CreateOrderProps
  extends Omit<OrderProps, 'order_details' | 'voucher' | 'status' | 'shipping_date' | keyof GenericData> {
  email: string
  phone: string
  full_name: string
  province: string
  province_code: number
  district: string
  district_code: number
  ward: string
  ward_code: number
  street: string
  total: number
  payment: string
  voucher?: number
  voucher_code?: string
}
