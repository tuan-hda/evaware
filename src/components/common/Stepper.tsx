import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Minus, Plus } from 'assets/icon'

interface Props {
  number: number
  disableButton?: boolean
  onUpdate: (value: number) => void
}

const Stepper = ({ onUpdate, number, disableButton }: Props) => {
  const dec = () => {
    if (number > 1) {
      onUpdate(-1)
    }
  }
  const inc = () => onUpdate(1)

  return (
    <View className='h-[36] w-[98] flex-row justify-between rounded-lg bg-giratina-100 p-2'>
      <TouchableOpacity onPress={dec}>
        <Minus disabled={disableButton} className='p-2' fill={number === 0 || disableButton ? '#9e9e9e' : '#000'} />
      </TouchableOpacity>
      <Text className='font-app-medium text-body2 text-black'>{number}</Text>
      <TouchableOpacity onPress={inc}>
        <Plus fill={disableButton ? '#9e9e9e' : '#000'} disabled={disableButton} />
      </TouchableOpacity>
    </View>
  )
}

export default Stepper
