import { FlatList, View } from 'react-native'
import React, { useCallback } from 'react'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { AddressItem } from '~/components/address'
import { useNavigation } from '@react-navigation/native'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import useShowNav from '~/hooks/useShowNav'
import { useQuery } from '@tanstack/react-query'
import { getAddressesService } from '~/services/address'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

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
  },
  {
    id: 'abcd',
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

const AddressBookScreen = () => {
  const navigation = useNavigation<UserNavigationProp>()
  useShowNav(navigation, false)
  const { data: temp, refetch } = useQuery({
    queryKey: ['address'],
    queryFn: getAddressesService
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)

  const Footer = useCallback(
    () => (
      <View className='mt-6 px-4'>
        <Button onPress={() => navigation.navigate('AddAddress', {})} label='Add new address' type='secondary' />
      </View>
    ),
    [navigation]
  )

  return (
    <CustomSafeAreaView className='bg-white'>
      <AppBar title='Address book' />
      <FlatList
        ListFooterComponent={Footer}
        data={data?.results}
        renderItem={({ item }) => (
          <AddressItem
            onPress={() =>
              navigation.navigate('AddAddress', {
                address: item,
                isEdit: true
              })
            }
            hideCheck
            {...item}
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default AddressBookScreen
