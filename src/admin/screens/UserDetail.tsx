import { View, Text, ViewProps, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderNavigationProp } from '~/admin/nav/OrderNav'
import { AppBar, Button, CustomSafeAreaView, SearchBar } from '~/components/common'
import { BagItem } from '~/components/bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import SelectModal from '~/components/common/SelectModal'

type Props = ViewProps

const UserDetailScreen = ({ ...props }: Props) => {
  const role: string = 'admin'
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow((prev) => !prev)
  }
  const navigation = useNavigation<OrderNavigationProp>()
  useShowNav(navigation, false)

  const items = [
    {
      value: 'Admin',
      action: () => {}
    },
    {
      value: 'Staff',
      action: () => {}
    },
    {
      value: 'Customer',
      action: () => {}
    }
  ]
  return (
    <CustomSafeAreaView>
      <AppBar title='User detail' />
      <SelectModal selected='admin' show={show} items={items} toggle={toggleShow} title='Choose role' />
      <View className='mb-6 w-full items-center justify-center'>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg'
          }}
          className='h-20 w-20 rounded-full bg-black'
        />
      </View>

      <View className='px-4'>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Name</Text>
          <Text className='font-app-regular text-sm text-black'>Hoang Dinh Anh Tuan</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='font-app text-sm text-black/60'>Email</Text>
          <Text className='font-app-regular text-sm text-black'>hdatdragon2@gmail.com</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Phone</Text>
          <Text className='font-app-regular text-sm text-black'>0123456789</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='font-app text-sm text-black/60'>Date of birth</Text>
          <Text className='font-app-regular text-sm text-black'>18 Apr 2002</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Role</Text>
          {role === 'admin' && <Text className='font-app-semibold text-venusaur-500'>Admin</Text>}
          {role === 'staff' && <Text className='font-app-semibold text-gengar-500'>Staff</Text>}
        </View>
      </View>

      <View className='flex-1' />
      <View className='mx-4 pb-4'>
        <Button onPress={toggleShow} label={'Change role'} />
        <View className='h-2' />
      </View>
    </CustomSafeAreaView>
  )
}

export default UserDetailScreen
