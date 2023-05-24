import { View, Text, Pressable, ViewProps } from 'react-native'
import React from 'react'
import { DirectionVertical } from 'assets/icon'

type Props = ViewProps

const SortFilter = (props: Props) => {
  return (
    <View className='mt-4 flex-row' {...props}>
      <Pressable className='mr-[15px] flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'>
        <Text className='my-2 mr-1 font-app-medium text-body2'>Sort</Text>
        <DirectionVertical />
      </Pressable>
      <Pressable className='flex-1 flex-row items-center justify-center rounded bg-giratina-100'>
        <Text className='my-2 mr-1 font-app-medium text-body2'>Filter</Text>
      </Pressable>
    </View>
  )
}

export default SortFilter
