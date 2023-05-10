import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { ChevronRight } from 'assets/icon'

type Props = {
  text?: string
  subtext?: string
} & TouchableOpacityProps

const Select = ({ text, subtext, ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className='h-16 flex-row items-center'>
      <View>
        <Text className='font-app text-body1 text-black'>{text}</Text>
        <Text className='font-app text-body2 text-giratina-500'>{subtext}</Text>
      </View>
      <View className='flex-1' />
      <ChevronRight />
    </TouchableOpacity>
  )
}

export default Select
