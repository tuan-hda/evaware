import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import RoleChip from './RoleChip'

type Props = {
  role?: string
} & TouchableOpacityProps

const UserItem = ({ role = 'customer', ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className='w-full flex-row items-center py-3'>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg'
        }}
        className='h-10 w-10 rounded-full bg-black'
      />
      <View className='ml-4'>
        <Text className='font-app-regular text-body1 text-black'>Tim Cook</Text>
        <Text className='font-app text-body2 text-black'>timcook@gmail.com</Text>
      </View>
      <View className='flex-1' />

      <RoleChip role={role} />
    </TouchableOpacity>
  )
}

export default UserItem
