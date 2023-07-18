import { ProductProps } from '~/types/product.type'

export const convertMoney = (money: number) => {
  return Math.round(money * 100) / 100
}

export const getPrice = (product: ProductProps) => {
  return convertMoney(product.price * (1 - product.discount / 100))
}
