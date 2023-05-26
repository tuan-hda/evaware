import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from '.'
import { Check } from 'assets/icon'

interface Props {
  left: string
  right: boolean | string
  action?: () => void
}

const Category = ({ left, right, action }: Props) => {
  const checked = typeof right === 'boolean' ? right : false
  const [isChecked, setIsChecked] = useState(checked)
  useEffect(()=>{
    const checked = typeof right === 'boolean' ? right : false
    setIsChecked(checked)
  },[right])

  return (
    <Pressable className='w-full flex-row py-5' onPress={action}>
      <Text className='flex-1 font-app-light text-body1'>{left}</Text>
      {typeof right === 'boolean' ? (
        <Pressable onPress={action}>
          {isChecked ? (
            <View className='ml-4 h-6 w-6 items-center justify-center rounded-full bg-charizard-400'>
              <Check />
            </View>
          ) : (
            <View className='ml-4 h-6 w-6 rounded-full bg-giratina-100' />
          )}
        </Pressable>
      ) : (
        <Text className='text-right font-app-light text-body1 text-giratina-500'>{right}</Text>
      )}
    </Pressable>
  )
}

export default Category
