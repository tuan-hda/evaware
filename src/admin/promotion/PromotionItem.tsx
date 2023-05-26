import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'

type Props = TouchableOpacityProps

const PromotionItem = ({ ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className='h-16 flex-row items-center justify-between'>
      <View>
        <Text className='font-app-medium text-body1'>QOH123</Text>
        <Text className='font-app text-body3'>12/07/23 - 12/07/23</Text>
      </View>

      <View className='items'>
        <Text className='text-right font-app text-body1 text-gengar-400'>10%</Text>
        <Text className='text-right font-app text-body3'>230 left</Text>
      </View>
    </TouchableOpacity>
  )
}

export default PromotionItem
