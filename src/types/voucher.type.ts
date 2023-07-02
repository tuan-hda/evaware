import { GenericData, SoftGenericData } from './service.type'

export interface VoucherProps extends SoftGenericData {
  code: string
  discount: number
  from_date: string
  to_date: string
  level?: number
  owner_id?: number
}
