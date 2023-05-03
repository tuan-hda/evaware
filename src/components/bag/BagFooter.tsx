import { View, Text } from 'react-native'
import React from 'react'
import { Button, TextField } from '../common'
import { useNavigation } from '@react-navigation/native'
import { BagNavigationProp } from '../navigation/BagNav'

const BagFooter = () => {
  const navigation = useNavigation<BagNavigationProp>()

  return (
    <View className='py-4'>
      <View className='py-4'>
        <Text className='font-app-semibold text-heading2 text-black'>promocode</Text>
      </View>

      <View className='my-2'>
        <TextField />
      </View>

      <View className='pb-4 pt-6'>
        <View className='mt-1 flex-row justify-between'>
          <Text className='text-body1 text-giratina-500'>Subtotal</Text>
          <Text className='text-body1 text-giratina-500'>$440,00</Text>
        </View>
        <View className='mt-1 flex-row justify-between'>
          <Text className='text-body1 text-giratina-500'>Promocode</Text>
          <Text className='text-body1 text-giratina-500'>$-25,00</Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='font-app-semibold text-heading2'>total</Text>
          <Text className='font-app-semibold text-heading2'>$420.50</Text>
        </View>
      </View>

      <View className='pt-4'>
        <Button onPress={() => navigation.navigate('DeliveryDetail')} label='Checkout' />
      </View>
    </View>
  )
}

export default BagFooter
