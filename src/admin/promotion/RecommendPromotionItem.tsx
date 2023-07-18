import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { ProductProps } from '~/types/product.type'
import { getPrice } from '~/utils/money'
import moment from 'moment'
import { VoucherProps } from '~/types/voucher.type'

type Props = {
  product: ProductProps
  checkSelected: (item?: VoucherProps) => void
}

const RecommendPromotionItem = (props: Props) => {
  const diff = moment().diff(moment(props.product.created_at), 'M')
  return (
    <Pressable onPress={() => props.checkSelected()} className='flex-row items-center py-2'>
      <Image
        className='h-14 w-14 rounded-lg'
        source={{
          uri: props.product.thumbnail
        }}
      />

      <View className='ml-4'>
        <Text className='font-app text-body2'>{props.product.category.name}</Text>
        <Text className='font-app text-body1'>{props.product.name}</Text>
        <Text className='font-app-semibold text-body1'>${getPrice(props.product)}</Text>
        <Text className='font-app text-giratina-500'>* No one buys this item for {diff} months</Text>
      </View>
    </Pressable>
  )
}

export default RecommendPromotionItem
