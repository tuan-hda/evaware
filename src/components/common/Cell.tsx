import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  icon?: React.ReactNode
  text?: string
  subtext?: string
  rightIcon?: React.ReactNode
  rightText?: string
} & TouchableOpacityProps

const Cell = ({ icon, text, subtext, rightIcon, rightText, ...props }: Props) => {
  return (
    <TouchableOpacity {...props} className={classNames('h-16 flex-row items-center px-4', props.className)}>
      {icon}
      <View className='ml-4 min-w-0 flex-1'>
        <Text className='font-app text-body1 text-black'>{text}</Text>
        {subtext && <Text className='font-app text-body2 text-giratina-500'>{subtext}</Text>}
      </View>
      {(rightIcon || rightText) && (
        <View className='ml-4'>
          {rightIcon}
          <Text className='font-app text-body1 text-giratina-500'>{rightText}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Cell
