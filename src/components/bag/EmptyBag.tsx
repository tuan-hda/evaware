import { View, Text } from 'react-native'
import React from 'react'
import { Button } from '../common'
import { Surprised } from 'assets/icon'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationProp } from '../navigation/HomeNav'

const EmptyBag = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  return (
    <View className='flex-1 items-center px-4'>
      <Text className='mt-14 h-[58] w-full font-app-semibold text-heading1'>bag</Text>

      <View className='flex-1 items-center justify-center'>
        <Surprised />
        <Text className='mt-4 font-app-semibold text-heading2'>your bag is empty</Text>
        <Text className='mt-1 px-2 text-center font-app text-body1 text-giratina-500'>
          go find something for you now
        </Text>
      </View>

      <View className='mb-4 w-full'>
        <Button label='Start shopping' onPress={() => navigation.navigate('HomeScreen')} />
      </View>
    </View>
  )
}

export default EmptyBag
