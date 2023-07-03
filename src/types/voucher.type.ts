import { GenericData, SoftGenericData } from './service.type'

export interface VoucherProps extends SoftGenericData {
  code: string
  discount: number|string
  from_date: string
  to_date: string
  level?: number
  owner_id?: number
  inventory?:number|string
}
