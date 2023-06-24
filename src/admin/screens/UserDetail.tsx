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
import { UserChangeRoleProps } from '../nav/SuperUserNav'
import { updateUserAdminService } from '~/services/user'
import { isError } from '~/utils/callAxios'

type Props = ViewProps

const UserDetailScreen = ({ route, ...props }: Props & UserChangeRoleProps) => {
  const role: string = 'admin'
  const { data } = route.params
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow((prev) => !prev)
  }
  const navigation = useNavigation<OrderNavigationProp>()
  useShowNav(navigation, false)

  const update = async (value: string) => {
    let res
    if (value === 'Admin') {
      res = await updateUserAdminService(data.id, {
        is_staff: false,
        is_superuser: true
      })
    } else if (value === 'Staff') {
      res = await updateUserAdminService(data.id, {
        is_staff: true,
        is_superuser: false
      })
    } else {
      res = await updateUserAdminService(data.id, {
        is_staff: false,
        is_superuser: false
      })
    }
    if (!isError(res)) {
      navigation.goBack()
    }
  }

  const items = [
    {
      value: 'Admin',
      action: () => {
        update('Admin')
      }
    },
    {
      value: 'Staff',
      action: () => {
        update('Staff')
      }
    },
    {
      value: 'Customer',
      action: () => {
        update('Customer')
      }
    }
  ]
  return (
    <CustomSafeAreaView>
      <AppBar title='User detail' />
      <SelectModal
        selected={data.is_superuser ? 'admin' : data.is_staff ? 'staff' : 'user'}
        show={show}
        items={items}
        toggle={toggleShow}
        title='Choose role'
      />
      <View className='mb-6 w-full items-center justify-center'>
        <Image
          source={{
            uri: data.avatar || 'https://d2xnk96i50sp3r.cloudfront.net/user_default.png'
          }}
          className='h-20 w-20 rounded-full bg-black'
        />
      </View>

      <View className='px-4'>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Name</Text>
          <Text className='font-app-regular text-sm text-black'>{data.full_name}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='font-app text-sm text-black/60'>Email</Text>
          <Text className='font-app-regular text-sm text-black'>{data.email}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Phone</Text>
          <Text className='font-app-regular text-sm text-black'>{data.phone}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg p-2'>
          <Text className='font-app text-sm text-black/60'>Date of birth</Text>
          <Text className='font-app-regular text-sm text-black'>{data.dob}</Text>
        </View>
        <View className='mt-1 flex-row justify-between rounded-lg bg-giratina-100 p-2'>
          <Text className='font-app text-sm text-black/60'>Role</Text>
          {data.is_superuser && <Text className='font-app-semibold text-venusaur-500'>Admin</Text>}
          {!data.is_superuser && data.is_staff && <Text className='font-app-semibold text-gengar-500'>Staff</Text>}
          {!data.is_superuser && !data.is_staff && <Text className='font-app-semibold text-black'>User</Text>}
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
