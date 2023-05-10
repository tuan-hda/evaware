import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Check, CheckBlack } from 'assets/icon'
import { Pressable } from 'react-native'
import classNames from 'classnames'

interface Props {
  checked?: boolean
  black?: boolean
  width?: number
  height?: number
}

export default function RadioButton({ checked, black, width = 24, height = 24 }: Props) {
  return (
    <Pressable onPress={() => {}}>
      {checked ? (
        <View
          className='ml-4 h-6 w-6 items-center justify-center rounded-full bg-charizard-400'
          style={{ width: width, height: height }}
        >
          {black ? <CheckBlack height={height} width={width} /> : <Check height={height} width={width} />}
        </View>
      ) : (
        <View className='ml-4 h-6 w-6 rounded-full bg-giratina-100' style={{ width: width, height: height }} />
      )}
    </Pressable>
  )
}
