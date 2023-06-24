import { BagItemProps, CartItemProps } from '~/types/bagItem.type'
import { PaymentItemProps, PaymentMethodProps } from '~/types/payment.type'

export const translatePaymentMethod = (data: PaymentMethodProps): PaymentItemProps => {
  return {
    ...data,
    img: data?.provider?.img_url,
    provider: data?.provider?.name
  }
}

export const translateCartItem = (item: CartItemProps): BagItemProps => {
  return {
    ...item,
    createdAt: item.created_at,
    id: item.id,
    desc: item.product.desc,
    img: item.product.thumbnail,
    price: item.product.price,
    updatedAt: item.updated_at,
    qty: item.qty,
    variation: item.variation.name,
    discount: item.product.discount
  }
}
