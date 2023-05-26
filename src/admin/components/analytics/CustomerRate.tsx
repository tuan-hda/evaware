import { View, Text } from 'react-native'
import React from 'react'
import AnalyticsHeader from './AnalyticsHeader'

const CustomerRate = () => {
  return (
    <View>
      <AnalyticsHeader changeTime={() => {}} title='customer rate' />
      <View className='mt-4 flex-row'>
        <View className='h-3 w-[70%] bg-charizard-200' />
        <View className='h-3 w-[30%] bg-charizard-400' />
      </View>
      <View className='mt-1 flex-row'>
        <View className='w-[70%]'>
          <Text className='font-app text-body3'>First time buying</Text>
          <Text className='font-app-regular text-body1'>70%</Text>
        </View>
        <View className='w-[30%]'>
          <Text className='font-app text-body3'>Returning</Text>
          <Text className='font-app-regular text-body1'>30%</Text>
        </View>
      </View>
    </View>
  )
}

export default CustomerRate
