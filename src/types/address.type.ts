import { GenericData } from './service.type'

export interface AddressItemProps {
  id: string
  province: string
  district: string
  ward: string
  street: string
  name: string
  phone: string
}

export interface AddressProps extends GenericData {
  province: string
  district: string
  ward: string
  email: string
  street: string
  full_name: string
  province_code: number
  phone: string
  district_code: number
  ward_code: number
}
