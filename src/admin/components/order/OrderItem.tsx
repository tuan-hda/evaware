import { View, Text, ViewProps, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Status from './Status'
import { ArrowLeft, ChevronRight } from 'assets/icon'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderNavigationProp } from '~/admin/nav/OrderNav'
import { OrderProps } from '~/types/order.type'
import moment from 'moment'

type Props = ViewProps & {
  data: OrderProps
}

const OrderItem = ({ ...props }: Props) => {
  const navigation = useNavigation<OrderNavigationProp>()

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate('OrderDetail', {
          order: props.data
        })
      }
    >
      <View className={classNames('w-full bg-white p-4', props.className)}>
        <View className='flex-row justify-between'>
          <View>
            <Text className='font-app-semibold text-body2'>#{props.data.id}</Text>
            <Text className='font-app'>{moment.utc(props.data.created_at).format('YYYY-MM-DD HH:mm')}</Text>
          </View>
          <View className='flex-row items-center'>
            <Status status={props.data.status} className='mr-1' />
            <ChevronRight />
          </View>
        </View>

        <View className='mt-4 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Customer</Text>
          <Text className='font-app-regular text-sm text-black'>{props.data.full_name}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='font-app text-sm text-black/60'>Orders</Text>
          <Text className='ml-4 font-app-regular text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>
            {props.data.order_details.reduce((prev, curr) => prev + curr.product.name, '')}
          </Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Total</Text>
          <Text className='font-app-regular text-sm text-black'>${props.data.total}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='mr-2 font-app text-sm text-black/60'>Address</Text>
          <Text numberOfLines={1} className='flex-1 font-app-regular text-sm text-black'>
            {props.data.province}, {props.data.district}, {props.data.ward}, {props.data.street}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default OrderItem
