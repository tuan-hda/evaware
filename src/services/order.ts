import { CreateOrderProps, OrderProps } from '~/types/order.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'

const path = '/order'

export const createOrderFromCartService = async (data: CreateOrderProps) => {
  return callAxios(appService.post(`${path}/make-order-from-cart`, data))
}
