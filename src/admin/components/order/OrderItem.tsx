import { View, Text } from 'react-native'
import React from 'react'
import Status from './Status'
import { ArrowLeft, ChevronRight } from 'assets/icon'

const OrderItem = () => {
  return (
    <View className='w-full rounded-lg bg-white p-4'>
      <View className='flex-row justify-between'>
        <View>
          <Text className='font-app-semibold text-body2'>ORD102</Text>
          <Text className='font-app'>15 Jul 2020, 16:00</Text>
        </View>
        <View className='flex-row items-center'>
          <Status className='mr-1' />
          <ChevronRight />
        </View>
      </View>

      <View className='mt-4 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
        <Text className='font-app text-sm text-black/60'>Customer</Text>
        <Text className='font-app-regular text-sm text-black'>Hoang Dinh Anh Tuan</Text>
      </View>
      <View className='mt-1 flex-row justify-between rounded-lg p-2'>
        <Text className='font-app text-sm text-black/60'>Orders</Text>
        <Text className='ml-4 font-app-regular text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>
          1 chair, 1 sofa
        </Text>
      </View>
      <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
        <Text className='font-app text-sm text-black/60'>Total</Text>
        <Text className='font-app-regular text-sm text-black'>$90.12</Text>
      </View>
      <View className='mt-1 flex-row justify-between rounded-lg p-2'>
        <Text className='font-app text-sm text-black/60'>Customer</Text>
        <Text className='font-app-regular text-sm text-black'>Hoang Dinh Anh Tuan</Text>
      </View>
    </View>
  )
}

export default OrderItem
