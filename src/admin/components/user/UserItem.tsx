import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import RoleChip from './RoleChip'
import { GeneralUserProps } from '~/types/user.type'

type Props = {
  role?: string
  data: GeneralUserProps
} & TouchableOpacityProps

const UserItem = ({ role = 'customer', ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className='w-full flex-row items-center py-3'>
      <Image
        source={{
          uri: props.data.avatar || 'https://d2xnk96i50sp3r.cloudfront.net/user_default.png'
        }}
        className='h-10 w-10 rounded-full bg-black'
      />
      <View className='ml-4'>
        <Text className='font-app-regular text-body1 text-black'>{props.data.full_name}</Text>
        <Text className='font-app text-body2 text-black'>{props.data.email}</Text>
      </View>
      <View className='flex-1' />

      <RoleChip role={props.data.is_superuser ? 'admin' : props.data.is_staff ? 'staff' : 'User'} />
    </TouchableOpacity>
  )
}

export default UserItem
