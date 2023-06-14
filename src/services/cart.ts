import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { CartItemProps } from '~/types/bagItem.type'
import { ListProps } from '~/types/service.type'

const path = '/cart'

export const addToCartService = async (product: number, variation: number) => {
  return await callAxios<CartItemProps>(
    appService.post(path + '/add-to-cart', {
      product,
      variation
    })
  )
}

export const getCartItemsService = async () => {
  return await appService.get<ListProps<CartItemProps>>(path)
}

export const changeCartQtyService = async (id: number, action: string) => {
  return appService.patch(`${path}/${id}/change-qty?action=${action}`)
}

export const deleteCartItemService = async (id: number) => {
  return callAxios(appService.delete(`${path}/${id}`))
}
