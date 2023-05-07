import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView, NavBar, TextField } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import { BagItem } from '~/components/bag'
import { AddressItem } from '~/components/address'
import { PaymentItem } from '~/components/payment'

const Header = () => (
  <View className='h-16 justify-center px-4'>
    <Text className='font-app-semibold text-heading1 text-black'>confirm order</Text>
  </View>
)

const ConfirmOrder = () => {
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

  const delivery = {
    id: 'abc',
    province: 'TP HCM',
    address: 'Phường Linh Trung',
    city: 'HCM',
    ward: 'Phường Linh Trung',
    description: 'KTX Khu A DHQG',
    district: 'Thủ Đức',
    email: 'hdatdragon2@gmail.com',
    phone: '0987654321',
    zip: 123123,
    name: 'Hanna Gouse',
    street: 'Tạ Quang Bửu'
  }

  const payment = {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
    provider: 'Mastercard',
    number: '9833',
    exp: '12/29'
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <NavBar step={3} total={3} />
      <ScrollView>
        <Header />
        <View className='justify-center p-4'>
          <Text className='font-app-semibold text-heading2 text-black'>bag</Text>
        </View>
        <View className='px-4'>
          {bagItems.map((item, index) => (
            <BagItem {...item} key={index} disableButton paddingBottom={index < bagItems.length - 1 ? 24 : 16} />
          ))}
        </View>

        <View className='justify-center px-4 pt-4'>
          <Text className='font-app-semibold text-heading2 text-black'>delivery address</Text>
        </View>
        <AddressItem isPlain {...delivery} />

        <View className='justify-center px-4 pt-4'>
          <Text className='font-app-semibold text-heading2 text-black'>payment method</Text>
        </View>
        <PaymentItem isPlain {...payment} />

        <View className='justify-center px-4 pt-4'>
          <Text className='mb-4 font-app-semibold text-heading2 text-black'>promocode</Text>
          <TextField color='#000' disabled value='EVAW2023' placeholder='EVAW2020' />
        </View>

        <View className='px-4 pb-4 pt-6'>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-app text-body1 text-giratina-500'>Subtotal</Text>
            <Text className='font-app text-body1 text-giratina-500'>$440,00</Text>
          </View>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-app text-body1 text-giratina-500'>Delivery fee</Text>
            <Text className='font-app text-body1 text-giratina-500'>$10,00</Text>
          </View>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-app text-body1 text-giratina-500'>Promocode</Text>
            <Text className='font-app text-body1 text-giratina-500'>$-25,00</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='font-app-semibold text-heading2'>total</Text>
            <Text className='font-app-semibold text-heading2'>$420.50</Text>
          </View>
        </View>

        <View className='px-4 pb-4 pt-6'>
          <Button label='Pay $420,50' />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ConfirmOrder
