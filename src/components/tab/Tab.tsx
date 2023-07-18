import { View, Pressable, Animated, Easing } from 'react-native'
import React, { useState } from 'react'

type Props = {
  tab1: React.ReactNode
  tab2: React.ReactNode
}

let indicatorSliceAnim = new Animated.Value(0)
let textAnim = new Animated.Value(0)
const Tab = (props: Props) => {
  const [selected, setSelected] = useState(0)
  const indicatorSliceValues = indicatorSliceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '52%']
  })
  const text1Values = textAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5]
  })
  const text2Values = textAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1]
  })

  const changeTab = (idx: number) => () => {
    setSelected(idx)
    Animated.timing(indicatorSliceAnim, {
      toValue: idx,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.inOut(Easing.ease)
    }).start()
    Animated.timing(textAnim, {
      toValue: idx,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.linear
    }).start()
  }

  return (
    <View className='flex-1'>
      <View className='flex-row justify-between'>
        <Pressable className='flex-1' onPress={changeTab(0)}>
          <Animated.Text
            style={{ opacity: text1Values }}
            className='pr-2 text-center font-app-regular text-body1 text-black transition'
          >
            Vouchers
          </Animated.Text>
        </Pressable>
        <Pressable onPress={changeTab(1)} className='flex-1'>
          <Animated.Text
            style={{
              opacity: text2Values
            }}
            className='pl-2 text-center font-app-regular text-body1 text-black transition'
          >
            Recommend
          </Animated.Text>
        </Pressable>
      </View>
      <View className='h-4'>
        <Animated.View
          className='absolute mt-2 h-1 w-[48%] rounded-full bg-black'
          style={{
            left: indicatorSliceValues
          }}
        />
      </View>

      {selected === 0 ? props.tab1 : props.tab2}
    </View>
  )
}

export default Tab
