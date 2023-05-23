import { View, Text, ViewProps, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React from 'react'
import Status from '../components/order/Status'
import { ChevronRight } from 'assets/icon'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderNavigationProp } from '~/admin/nav/OrderNav'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { BagItem } from '~/components/bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'

type Props = ViewProps

const OrderDetail = ({ ...props }: Props) => {
  const navigation = useNavigation<OrderNavigationProp>()
  useShowNav(navigation, false)

  const bagItems: BagItemProps[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: '1af',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'av1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    }
  ]

  return (
    <CustomSafeAreaView>
      <AppBar title='ORDER102' />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View className={classNames('w-full px-4')}>
          <View className='mb-2 flex-row items-center justify-between'>
            <View>
              <Text className='font-app-medium text-body1'>Status</Text>
              <Status type='text' status='success' className='mr-1' />
            </View>

            <Button size='small' label='Update' />
          </View>

          <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Current status</Text>
            <Text className='font-app-regular text-sm text-black'>12 Jul 2020</Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Shipping date</Text>
            <Text className='font-app-regular text-sm text-black'>12 Jul 2020</Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Order date</Text>
            <Text className='font-app-regular text-sm text-black'>12 Jul 2020</Text>
          </View>

          <Text className='mb-2 mt-6 font-app-medium text-body1'>Detail</Text>

          <View className='flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Customer</Text>
            <Text className='font-app-regular text-sm text-black'>Hoang Dinh Anh Tuan</Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Email</Text>
            <Text className='ml-4 font-app-regular text-sm text-black' numberOfLines={1} ellipsizeMode='tail'>
              hdatdragon2@gmail.com
            </Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
            <Text className='font-app text-sm text-black/60'>Phone</Text>
            <Text className='font-app-regular text-sm text-black'>0849167234</Text>
          </View>
          <View className='mt-1 flex-row justify-between rounded-lg p-2'>
            <Text className='font-app text-sm text-black/60'>Address</Text>
            <Text className='font-app-regular text-sm text-black'>KTX Khu A</Text>
          </View>

          <Text className='mb-2 mt-6 font-app-medium text-body1'>Order</Text>

          {bagItems.map((item, index) => (
            <View key={index}>
              <BagItem disableButton {...item} key={index} />
              {index !== bagItems.length - 1 && <View className='h-2' />}
            </View>
          ))}
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-sm text-black/60'>Subtotal</Text>
            <Text className='font-app-regular text-sm text-black'>$90.5</Text>
          </View>
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-sm text-black/60'>Delivery fee</Text>
            <Text className='font-app-regular text-sm text-black'>$10.5</Text>
          </View>
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-sm text-black/60'>Discount</Text>
            <Text className='font-app-regular text-sm text-black'>-$20.5</Text>
          </View>
          <View className='mt-2 flex-row justify-between rounded-lg'>
            <Text className='font-app text-heading2 text-black/60'>Total</Text>
            <Text className='font-app-regular text-heading2 text-black'>$200.5</Text>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderDetail
