import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { CartItemProps } from '~/types/bagItem.type'

const path = '/cart'

export const addToCartService = async (product: number, variation: number) => {
  return await callAxios<CartItemProps>(
    appService.post(path + '/add-to-cart', {
      product,
      variation
    })
  )
}
