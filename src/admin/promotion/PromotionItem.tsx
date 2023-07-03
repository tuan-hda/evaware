import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { VoucherProps } from '~/types/voucher.type'

type Props = { data: VoucherProps } & TouchableOpacityProps

const PromotionItem = ({ data, ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className='h-16 flex-row items-center justify-between'>
      <View>
        <Text className='font-app-medium text-body1'>{data.code}</Text>
        <Text className='font-app text-body3'>
          {data.from_date} - {data.to_date}
        </Text>
      </View>

      <View className='items'>
        <Text className='text-right font-app text-body1 text-gengar-400'>{data.discount}%</Text>
        <Text className='text-right font-app text-body3'>{data.inventory} left</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PromotionItem
