import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { BagItemProps } from '~/types/bagItem.type'
import { Clear } from 'assets/icon'
import classNames from 'classnames'
import Status from '../order/Status'
import { useNavigation } from '@react-navigation/native'
import { ProductNavigationProp } from '~/admin/nav/ProductNav'

type Props = BagItemProps & {
  paddingBottom?: number
  disableButton?: boolean
  onRemove?: (id: string) => void
  disabled?: boolean
}

const ProductItem = ({ disabled, img, qty: outerQty, price, desc, paddingBottom }: Props) => {
  const [qty, setQty] = useState(0)
  const navigation = useNavigation<ProductNavigationProp>()

  useEffect(() => {
    setQty(outerQty)
  }, [outerQty])

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetail')}>
      <View className='flex-row' style={{ paddingBottom }}>
        <Image
          source={{
            uri: img
          }}
          className='h-[115] w-[94] rounded-lg'
        />
        <View className={classNames('ml-4 mr-2 flex-1')}>
          <Text className='mr-2 font-app-medium text-body2 text-black' numberOfLines={1} ellipsizeMode='tail'>
            PRO109
          </Text>
          <View className='flex-row justify-between'>
            <Text className='mr-2 font-app-medium text-body1 text-black' numberOfLines={1} ellipsizeMode='tail'>
              Conz Sofa
            </Text>
            {disabled ? (
              <View className='rounded-lg bg-giratina-200 p-1'>
                <Text className='font-app-medium text-body2 text-black/60'>Disabled</Text>
              </View>
            ) : (
              <View className='flex-row items-baseline'>
                <Text className='mr-2 font-app text-body2 text-giratina-500 line-through'>${price}</Text>
                <Text className='font-app-medium text-body1 text-black'>${price}</Text>
              </View>
            )}
          </View>
          <Text numberOfLines={1} ellipsizeMode='tail' className='mt-1 text-body3 text-giratina-500'>
            {desc}
          </Text>

          <Text className='mt-1 text-body3 text-black'>4 variations</Text>
          <Text className='mt-1 text-body3 text-black'>{qty} quantity on hand</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProductItem
