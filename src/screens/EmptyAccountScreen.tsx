import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '~/components/common'
import { Smiley, Surprised } from 'assets/icon'

const EmptyAccountScreen = () => {
  return (
    <View className='flex-1 bg-white px-4 pb-4'>
      <Text className='pb-4 font-app-semibold text-heading1'>my account</Text>
      <View className='flex-1 items-center justify-center'>
        <Smiley />
        <Text className='mb-1 mt-6 font-app-semibold text-heading2'>come on in</Text>
        <Text className='font-app-light text-body1 text-giratina-500'>view orders and update your details</Text>
      </View>
      <Button label={'Add phone number'} />
    </View>
  )
}

export default EmptyAccountScreen
