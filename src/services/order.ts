import { CreateOrderProps, OrderProps } from '~/types/order.type'
import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { ListProps } from '~/types/service.type'

const path = '/order'

export const createOrderFromCartService = async (data: CreateOrderProps) => {
  return callAxios(appService.post(`${path}/make-order-from-cart`, data))
}

export const getOrdersService = async () => {
  return appService.get<ListProps<OrderProps>>(`${path}`, {
    params: {
      count: 100,
      ordering: '-id'
    }
  })
}

export const cancelOrderService = async (id: number) => {
  return callAxios(
    appService.patch(`${path}/${id}`, {
      status: 'Cancelled'
    })
  )
}

export const updateStatusOrderService = async (id: number, status: string) => {
  return callAxios(
    appService.patch(`${path}/${id}`, {
      status
    })
  )
}
