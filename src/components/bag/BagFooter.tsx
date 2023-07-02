import { View, Text } from 'react-native'
import React from 'react'
import { Button, TextField } from '../common'
import { useNavigation } from '@react-navigation/native'
import { BagNavigationProp } from '../navigation/BagNav'
import { useQuery } from '@tanstack/react-query'
import { getCartItemsService } from '~/services/cart'
import { convertMoney } from '~/utils/money'

const BagFooter = () => {
  const navigation = useNavigation<BagNavigationProp>()
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })

  let subtotal = convertMoney(
    data?.data.results.reduce((prev, curr) => {
      return prev + curr.product.price * (1 - curr.product.discount / 100) * curr.qty
    }, 0) || 0
  )

  return (
    <View className='bg-white px-4 pb-4'>
      <View className='pb-4 pt-2'>
        <View className='flex-row justify-between'>
          <Text className='font-app-semibold text-heading2'>total</Text>
          <Text className='font-app-semibold text-heading2'>${subtotal}</Text>
        </View>
      </View>

      <View className='pt-4'>
        <Button onPress={() => navigation.navigate('DeliveryDetail')} label='Checkout' />
      </View>
    </View>
  )
}

export default BagFooter
