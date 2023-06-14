import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { BagItemProps } from '~/types/bagItem.type'
import { Clear, YellowStar } from 'assets/icon'
import classNames from 'classnames'
import Status from '../order/Status'
import { useNavigation } from '@react-navigation/native'
import { ProductNavigationProp } from '~/admin/nav/ProductNav'
import { ConvertedProductProps } from '~/types/product.type'

type Props = ConvertedProductProps & {
  paddingBottom?: number
  disableButton?: boolean
  onRemove?: (id: string) => void
  disabled?: boolean
}

const ProductItem = ({ is_deleted, thumbnail, price, desc, paddingBottom, ...data }: Props) => {
  const [qty, setQty] = useState(0)
  const navigation = useNavigation<ProductNavigationProp>()

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('ProductDetail', {
          id: data.id,
          isEdit: true
        })
      }
    >
      <View className='flex-row' style={{ paddingBottom }}>
        <Image
          source={{
            uri: thumbnail
          }}
          className='h-[115] w-[94] rounded-lg'
        />
        <View className={classNames('ml-4 mr-2 flex-1')}>
          <View className='flex-row justify-between'>
            <Text className='mr-2 font-app text-body2 text-black' numberOfLines={1} ellipsizeMode='tail'>
              #{data.id}
            </Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='mr-2 font-app-medium text-body1 text-black' numberOfLines={1} ellipsizeMode='tail'>
              {data.name}
            </Text>
            {is_deleted && (
              <View className='rounded-lg bg-giratina-200 p-1'>
                <Text className='font-app-medium text-body2 text-black/60'>Disabled</Text>
              </View>
            )}
          </View>
          <View className='flex-row items-baseline'>
            <Text className='font-app-medium text-body1 text-black'>${Number((1 - data.discount / 100) * price)}</Text>
            {data.discount !== 0 && (
              <Text className='ml-2 text-right font-app text-body2 text-giratina-500 line-through'>
                ${Number(price)}
              </Text>
            )}
          </View>
          <Text numberOfLines={1} ellipsizeMode='tail' className='mt-1 font-app text-body3 text-giratina-500'>
            {desc}
          </Text>

          <Text className='mt-1 font-app text-body3 text-black'>{data.variations_count} variations</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProductItem
