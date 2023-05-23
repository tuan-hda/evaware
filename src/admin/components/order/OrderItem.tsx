import { View, Text, ViewProps, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Status from './Status'
import { ArrowLeft, ChevronRight } from 'assets/icon'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderNavigationProp } from '~/admin/nav/OrderNav'

type Props = ViewProps

const OrderItem = ({ ...props }: Props) => {
  const navigation = useNavigation<OrderNavigationProp>()

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderDetail')}>
      <View className={classNames('w-full bg-white p-4', props.className)}>
        <View className='flex-row justify-between'>
          <View>
            <Text className='font-app-semibold text-body2'>ORD102</Text>
            <Text className='font-app'>15 Jul 2020, 16:00</Text>
          </View>
          <View className='flex-row items-center'>
            <Status status='success' className='mr-1' />
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
          <Text className='font-app text-sm text-black/60'>Address</Text>
          <Text className='font-app-regular text-sm text-black'>KTX Khu A</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default OrderItem
