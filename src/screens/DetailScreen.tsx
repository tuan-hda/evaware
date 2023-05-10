import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'

const DetailScreen = () => {
  return (
    <View className='flex-1 items-center bg-white px-4'>
      <Pressable className='items-center py-4'>
        <Image
          className='h-14 w-14'
          resizeMode='cover'
          source={{
            uri: 'https://dthezntil550i.cloudfront.net/86/latest/861911302007288750002221253/05f85cab-dc3a-48e3-81ff-b7347d2e450b.png'
          }}
        />
        <Text className='mt-2 py-[7.5px] font-app-medium text-body2'>Change photo</Text>
      </Pressable>

      {/* text field */}

      {/* Full name */}
      <TextFieldWithLabel label='Full name' containerClassName='mt-2' />

      {/* Phone */}
      <TextFieldWithLabel label='Phone' containerClassName='mt-4' />

      {/* Email */}
      <TextFieldWithLabel label='Email' containerClassName='mt-4' />

      {/* Date of birth */}
      <TextFieldWithLabel label='Date of birth' containerClassName='mt-4' />
    </View>
  )
}

export default DetailScreen
