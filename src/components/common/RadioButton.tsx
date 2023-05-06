import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Check } from 'assets/icon'
import { Pressable } from 'react-native'

interface Props {
  checked: boolean
}

export default function RadioButton({ checked }: Props) {
  return (
    <Pressable onPress={() => {}}>
      {checked ? (
        <View className='ml-4 h-6 w-6 items-center justify-center rounded-full bg-charizard-400'>
          <Check />
        </View>
      ) : (
        <View className='ml-4 h-6 w-6 rounded-full bg-giratina-100' />
      )}
    </Pressable>
  )
}
