import { OrderProps } from './order.type'
import { GenericData } from './service.type'

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
}

export interface GeneralUserProps extends Omit<UserProps, 'orders'> {}
