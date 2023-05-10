import { View, Text, Animated } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import classNames from 'classnames'
import CustomSafeAreaView from './CustomSafeAreaView'
import { Subtract } from 'assets/icon'

type Props = {
  onCancel?: () => void
  className?: string
  containerClassName?: string
}

const NoConnectionSnack = ({ containerClassName, className, onCancel }: Props) => {
  return (
    <CustomSafeAreaView className={classNames('absolute z-10', containerClassName)}>
      <View
        className={classNames('first-letter h-16 flex-row items-center rounded-lg bg-magikarp-400 px-4', className)}
      >
        <Subtract />
        <View className='ml-4'>
          <Text className='font-app text-body1 text-white'>No connection</Text>
          <Text className='font-app text-body2 text-white'>Check your wi-fi</Text>
        </View>
        <View className='flex-1' />
        <TouchableOpacity onPress={onCancel}>
          <Text className='font-app text-body1 text-white'>Retry</Text>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

export default NoConnectionSnack
