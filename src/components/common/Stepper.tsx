import { View, Text } from 'react-native'
import React from 'react'
import { Minus, Plus } from 'assets/icon'

interface Props {
  number: number
  setNumber: React.Dispatch<React.SetStateAction<number>>
  disableButton?: boolean
}

const Stepper = ({ number, setNumber, disableButton }: Props) => {
  const dec = () => {
    if (number >= 1) {
      setNumber((prev) => prev - 1)
    }
  }
  const inc = () => setNumber((prev) => prev + 1)

  return (
    <View className='h-[36] w-[98] flex-row justify-between rounded-lg bg-giratina-100 p-2'>
      <Minus
        disabled={disableButton}
        className='p-2'
        fill={number === 0 || disableButton ? '#9e9e9e' : '#000'}
        onPress={dec}
      />
      <Text className='font-app-medium text-body2 text-black'>{number}</Text>
      <Plus fill={disableButton ? '#9e9e9e' : '#000'} disabled={disableButton} onPress={inc} />
    </View>
  )
}

export default Stepper
