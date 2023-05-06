import { View, Text } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Sad } from 'assets/icon'

const NoInternetScreen = () => {
  return (
    <CustomSafeAreaView className='items-center bg-white px-4 pb-1'>
      <Text className='mt-14 font-app-semibold text-heading1'>Evaware</Text>

      <View className='flex-1' />

      <View className='items-center'>
        <Sad />
        <Text className='mt-4 font-app-semibold text-heading2'>No connection</Text>
        <Text className='text-center font-app-light text-body1 text-giratina-500' numberOfLines={2}>
          So, it’s looks like you don’t have an intternet connection right now
        </Text>
      </View>

      <View className='flex-1' />

      <Button label={'Retry'} />
    </CustomSafeAreaView>
  )
}

export default NoInternetScreen
