import { Animated, Easing, Pressable } from 'react-native'
import React, { useEffect, useMemo } from 'react'
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
type Props = {
  show: boolean
}

const LoadingScreen = ({ show }: Props) => {
  const animated = useMemo(() => {
    if (show) return new Animated.Value(0)
    return new Animated.Value(1)
  }, [show])
  const spin = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  useEffect(() => {
    if (animated) {
      Animated.loop(
        Animated.timing(animated, {
          toValue: 1,
          useNativeDriver: true,
          duration: 2000,
          easing: Easing.linear
        })
      ).start()
    }
  }, [animated])

  return (
    <Modal isVisible={show} className='m-0'>
      <Pressable className='h-full w-full items-center justify-center bg-transparent'>
        <Pressable className='h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-white p-4'>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign size={36} name='loading2' />
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default LoadingScreen
