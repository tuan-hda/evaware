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
  message: string
  hasLoading?: boolean
}

const spinAnim = new Animated.Value(0)

const SnackBar = ({ hasLoading = true, containerClassName, message, className, onCancel }: Props) => {
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

    const timeout = setTimeout(() => onCancel && onCancel(), 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [onCancel])

  return (
    <CustomSafeAreaView className={classNames('absolute z-10 w-full bg-transparent px-4', containerClassName)}>
      <View className={classNames('first-letter h-16 flex-row items-center rounded-lg bg-black px-4', className)}>
        {hasLoading && (
          <Animated.View style={{ transform: [{ rotate: spin }], marginRight: 16 }}>
            <Loader />
          </Animated.View>
        )}
        <Text className='font-app text-body1 text-white'>{message}</Text>
        <View className='flex-1' />
        <TouchableOpacity onPress={onCancel}>
          <Text className='font-app text-body1 text-charizard-400'>Close</Text>
        </TouchableOpacity>
      </View>
    </CustomSafeAreaView>
  )
}

export default SnackBar
