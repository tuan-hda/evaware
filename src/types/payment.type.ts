import { GenericData, SoftGenericData } from './service.type'

export interface PaymentItemProps {
  provider: string
  number?: string
  exp?: string
  img: string
}

export interface ProviderProps extends SoftGenericData {
  img_url: string
  name: string
  method: string
}

export interface PaymentMethodProps extends GenericData {
  name: string
  exp?: string
  number?: string
  provider: ProviderProps
}

export interface CreatePaymentMethod {
  name: string
  exp?: string
  number?: string
  provider: number
}
