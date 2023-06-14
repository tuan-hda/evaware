import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { BagItemProps } from '~/types/bagItem.type'
import { Stepper } from '../common'
import { Clear } from 'assets/icon'
import classNames from 'classnames'
import { changeCartQtyService, deleteCartItemService, getCartItemsService } from '~/services/cart'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { isAxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

type Props = BagItemProps & {
  paddingBottom?: number
  disableButton?: boolean
  onRemove?: (id: number) => void
  onPress?: () => void
}

const BagItem = ({
  id,
  discount,
  img,
  qty,
  price,
  desc,
  paddingBottom,
  disableButton,
  onRemove,
  variation,
  onPress
}: Props) => {
  const { refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })

  const updateQty = async (value: number) => {
    try {
      if (value === 1) {
        await changeCartQtyService(id, 'inc')
      } else if (value === -1) {
        await changeCartQtyService(id, 'dec')
      }
      refetch()
    } catch (error) {
      if (isAxiosError(error) && error.response?.data[0]?.toLowerCase()?.includes('insufficient inventory')) {
        Toast.show({
          type: 'error',
          text1: "Can't update quantity",
          text2: 'Insufficient inventory. Reset quantity'
        })
      } else {
        console.log('CHANGE CART QTY')
        console.log(JSON.stringify(error))
      }
    }
  }

  const deleteCartItem = async () => {
    const res = await deleteCartItemService(id)
    if (!isError(res)) {
      refetch()
    }
  }

  return (
    <View className='flex-row' style={{ paddingBottom }}>
      <Pressable onPress={onPress}>
        <Image
          source={{
            uri: img
          }}
          className='h-[115] w-[94] rounded-lg'
        />
      </Pressable>
      <View className={classNames('ml-4 mr-2 flex-1', !disableButton && 'justify-between')}>
        <View>
          <View className='flex-row'>
            <Text className='font-app-medium text-body1 text-black'>${Number(price)}</Text>
            {discount !== 0 && (
              <Text className='ml-2 font-app-medium text-body2 text-giratina-500 line-through'>
                ${price * (1 - discount / 100)}
              </Text>
            )}
          </View>
          <Text className='mt-1 font-app text-body3 text-giratina-500' numberOfLines={1}>
            {desc}
          </Text>
          <Text className='mt-1 font-app text-body3 text-giratina-500'>Variation: {variation}</Text>
        </View>

        {disableButton ? (
          <View>
            <Text className='mt-1 font-app text-body3 text-black'>Variation: Hel</Text>
            <Text className='mt-1 font-app text-body3 text-black'>Qty: {qty}</Text>
          </View>
        ) : (
          <Stepper number={qty} onUpdate={updateQty} />
        )}
      </View>

      {!disableButton && <Clear onPress={deleteCartItem} fill='#9e9e9e' />}
    </View>
  )
}

export default BagItem
