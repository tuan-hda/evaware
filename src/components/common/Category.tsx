import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RadioButton } from '.'
import { Check } from 'assets/icon'
import classNames from 'classnames'

interface Props {
  left: string
  right: boolean | string
  action?: () => void
  rounded?: boolean
}

const Category = ({ rounded = false, left, right, action }: Props) => {
  const checked = typeof right === 'boolean' ? right : false
  const [isChecked, setIsChecked] = useState(checked)
  useEffect(() => {
    const checked = typeof right === 'boolean' ? right : false
    setIsChecked(checked)
  }, [right])

  return (
    <Pressable className='w-full flex-row py-5' onPress={action}>
      <Text className='flex-1 font-app-light text-body1'>{left}</Text>
      {typeof right === 'boolean' ? (
        <Pressable onPress={action}>
          {isChecked ? (
            <View
              className={classNames(
                'ml-4 h-6 w-6 items-center justify-center  bg-charizard-400',
                rounded ? 'rounded-full' : 'rounded-md'
              )}
            >
              <Check />
            </View>
          ) : (
            <View className={classNames('ml-4 h-6 w-6 bg-giratina-100', rounded ? 'rounded-full' : 'rounded-md')} />
          )}
        </Pressable>
      ) : (
        <Text className='text-right font-app-light text-body1 text-giratina-500'>{right}</Text>
      )}
    </Pressable>
  )
}

export default Category
