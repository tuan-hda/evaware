import { OrderProps } from './order.type'
import { GenericData } from './service.type'
import { VoucherProps } from './voucher.type'

export interface UserProps extends GenericData {
  email: string
  token: string
  is_superuser: boolean
  is_staff: boolean
  avatar: string
  full_name: string
  gender: string
  phone: string
  dob: string
  orders?: OrderProps[]
  points: number
  reward_vouchers: VoucherProps[]
}

export interface GeneralUserProps extends Omit<UserProps, 'orders'> {}
