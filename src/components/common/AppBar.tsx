import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'assets/icon'
import { useNavigation } from '@react-navigation/native'

type Props = {
  title?: string
}

const AppBar = ({ title }: Props) => {
  const navigation = useNavigation()

  return (
    <View className='relative h-[58] w-full flex-row items-center justify-center p-4'>
      <TouchableOpacity onPress={() => navigation.goBack()} className='absolute left-4'>
        <ArrowLeft />
      </TouchableOpacity>
      <Text className='font-app-medium text-body1 text-black'>{title}</Text>
    </View>
  )
}

export default AppBar
