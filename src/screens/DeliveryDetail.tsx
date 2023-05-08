import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView, NavBar } from '~/components/common'
import { useNavigation } from '@react-navigation/native'
import { BagNavigationProp } from '~/components/navigation/BagNav'
import { AddressItem } from '~/components/address'
import useShowNav from '~/hooks/useShowNav'

const data = [
  {
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
]

const Header = () => (
  <View className='h-16 justify-center px-4'>
    <Text className='font-app-semibold text-heading2 text-black'>delivery address</Text>
  </View>
)

const Footer = () => {
  const navigation = useNavigation<BagNavigationProp>()
  useShowNav(navigation, false)

  return (
    <View>
      <View className='mt-10 px-4'>
        <Button label='Add new address' type='secondary' />
      </View>
      <View className='mt-4 px-4 pb-4'>
        <Button onPress={() => navigation.navigate('PaymentMethod')} label='Continue' />
      </View>
    </View>
  )
}

const DeliveryDetail = () => {
  const [selected, setSelected] = useState(0)

  return (
    <CustomSafeAreaView className='bg-white'>
      <NavBar step={1} total={3} />

      <FlatList
        data={data}
        ListFooterComponent={Footer}
        ListHeaderComponent={Header}
        renderItem={({ item, index }) => (
          <AddressItem {...item} index={index} selected={selected} setSelected={setSelected} />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default DeliveryDetail
