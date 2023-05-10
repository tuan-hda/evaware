import { View, Text, Animated, Easing } from 'react-native'
import React, { useEffect } from 'react'
import { Loader } from 'assets/icon'
import { TouchableOpacity } from 'react-native-gesture-handler'
import classNames from 'classnames'
import CustomSafeAreaView from './CustomSafeAreaView'

type Props = {
  onCancel?: () => void
  className?: string
  containerClassName?: string
}

const spinAnim = new Animated.Value(0)

const SnackBar = ({ containerClassName, className, onCancel }: Props) => {
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
        easing: Easing.linear
      })
    ).start()
  }, [])

  return (
    <CustomSafeAreaView className={classNames('absolute', containerClassName)}>
      <View className={classNames('first-letter h-16 flex-row items-center rounded-lg bg-black px-4', className)}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Loader />
        </Animated.View>
        <Text className='ml-4 font-app text-body1 text-white'>Item removed</Text>
        <View className='flex-1' />
        <TouchableOpacity onPress={onCancel}>
          <Text className='font-app text-body1 text-charizard-400'>Cancel</Text>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

export default SnackBar
