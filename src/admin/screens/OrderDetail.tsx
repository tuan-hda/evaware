import { View, Text, ViewProps, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Status from '../components/order/Status'
import { ChevronRight } from 'assets/icon'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderDetailProp, OrderNavigationProp } from '~/admin/nav/OrderNav'
import { AppBar, Button, CustomSafeAreaView, SmallCard } from '~/components/common'
import { BagItem } from '~/components/bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import SelectModal from '~/components/common/SelectModal'
import moment from 'moment'
import { createOrderFromCartService, getOrdersService, updateStatusOrderService } from '~/services/order'
import { useQuery } from '@tanstack/react-query'
import { convertMoney } from '~/utils/money'
import { refundPayPalPayment } from '~/services/payment'

type Props = ViewProps

const OrderDetail = ({ route, ...props }: Props & OrderDetailProp) => {
  const navigation = useNavigation<OrderNavigationProp>()
  useShowNav(navigation, false)
  const [show, setShow] = useState(false)
  const [status, setStatus] = useState('')
  const { order } = route.params

  useEffect(() => {
    setStatus(order.status)
  }, [order])
  const { refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getOrdersService
  })
  const toggle = () => setShow((prev) => !prev)

  const update = async (status: string) => {
    await updateStatusOrderService(order.id, status)
    if (status === 'Cancelled') {
      const paymentInfo = JSON.parse(order.payment)
      await refundPayPalPayment(paymentInfo.captureId)
    }
    refetch()
    setStatus(status)
  }
  const items = [
    {
      value: 'Success',
      className: 'text-venusaur-500',
      action: async () => {
        update('Success')
      }
    },
    {
      value: 'Delivering',
      className: 'text-gengar-500',
      action: async () => {
        update('Delivering')
      }
    },
    {
      value: 'Cancelled',
      className: 'text-magikarp-500',
      action: async () => {
        update('Cancelled')
      }
    },
    {
      value: 'In progress',
      className: 'text-charizard-500',
      action: async () => {
        update('Cancelled')
      }
    }
  ]

  const subtotal = convertMoney(
    order.order_details.reduce((prev, curr) => {
      return prev + curr.product.price * (1 - curr.product.discount / 100) * curr.qty
    }, 0) || 0
  )
  const discountAmount = ((order?.voucher?.discount || 0) / 100) * subtotal

  return (
    <CustomSafeAreaView>
      <AppBar title='ORDER102' />
      <SelectModal selected={status} title='Update status' show={show} toggle={toggle} items={items} />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View className={classNames('w-full px-4')}>
          <View className='mb-2 flex-row items-center justify-between'>
            <View>
              <Text className='font-app-medium text-body1'>Status</Text>
              <Status type='text' status={status} className='mr-1' />
            </View>

            <Button size='small' onPress={toggle} label='Update' />
          </View>

          <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Current status</Text>
            <Text className='font-app-regular text-sm text-black'>
              {moment.utc(order.updated_at).format('YYYY-MM-DD HH:mm')}
            </Text>
          </View>
          {/* <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Shipping date</Text>
            <Text className='font-app-regular text-sm text-black'>12 Jul 2020</Text>
          </View> */}
          <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Order date</Text>
            <Text className='font-app-regular text-sm text-black'>
              {moment.utc(order.created_at).format('YYYY-MM-DD HH:mm')}
            </Text>
          </View>

          <Text className='mb-2 mt-6 font-app-medium text-body1'>Detail</Text>

          <View className='flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Customer</Text>
            <Text className='font-app-regular text-sm text-black'>{order.full_name}</Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Email</Text>
            <Text className='ml-4 font-app-regular text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>
              {order.email}
            </Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Phone</Text>
            <Text className='font-app-regular text-sm text-black'>{order.phone}</Text>
          </View>
          <View className='mt-1 justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Address</Text>
            <Text className='font-app-regular text-sm text-black'>
              {order.province}, {order.district}, {order.ward}, {order.street}
            </Text>
          </View>

          <Text className='mb-2 mt-6 font-app-medium text-body1'>Order</Text>

          {order.order_details.map((item, index) => (
            <View key={index} className='mb-6 w-full'>
              <SmallCard
                qty={item.qty}
                noOrderAgain
                variation={item.variation.name}
                price={item.price}
                desc={item.product.desc}
                image={item.variation.img_urls[0]}
                // onPress={() =>
                //   navigation.navigate('Product', {
                //     id: item.product.id
                //   })
                // }
              />
            </View>
          ))}
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-sm text-black/60'>Subtotal</Text>
            <Text className='font-app-regular text-sm text-black'>${subtotal}</Text>
          </View>
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-sm text-black/60'>Delivery fee</Text>
            <Text className='font-app-regular text-sm text-black'>$10</Text>
          </View>
          {order.voucher && (
            <View className='mt-2 flex-row justify-between rounded-lg'>
              <Text className='font-app text-sm text-black/60'>Discount ({order.voucher.code})</Text>
              <Text className='font-app-regular text-sm text-black'>-${discountAmount}</Text>
            </View>
          )}
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-heading2 text-black/60'>Total</Text>
            <Text className='font-app-regular text-heading2 text-black'>${order.total}</Text>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderDetail
