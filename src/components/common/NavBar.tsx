import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'assets/icon'
import { useNavigation } from '@react-navigation/native'

interface Props {
  step?: number
  total?: number
}

const NavBar = ({ step, total }: Props) => {
  const navigation = useNavigation()

  return (
    <View className='h-14 flex-row items-center justify-between px-4'>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeft />
      </TouchableOpacity>
      <View className='items-center'>
        <Text className='font-app-medium text-body1 text-black'>Checkout</Text>
        {step && total && (
          <Text className='font-app-medium text-body3 text-giratina-500'>
            {step} of {total}
          </Text>
        )}
      </View>
      <View className='w-6' />
    </View>
  )
}

export default NavBar
