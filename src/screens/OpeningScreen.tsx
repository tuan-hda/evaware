import { View, Text, Image } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'

const OpeningScreen = () => {
  return (
    <CustomSafeAreaView>
      <View className='flex-1 justify-evenly'>
        <View className='items-center justify-center'>
          <Image source={require('assets/image/opening_ill.png')} />
        </View>

        <View className='mb-4 items-center px-5'>
          <Text className='font-app-semibold text-heading1'>Explore the app</Text>
          <Text className='mt-[11] text-body1 text-black/70'>Build your dream house</Text>
        </View>
      </View>

      <View className='px-5 pb-5'>
        <Button label='Sign In' />
        <Button className='mt-[14]' type='outline' label='Create account' />
      </View>
    </CustomSafeAreaView>
  )
}

export default OpeningScreen
