import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  icon?: React.ReactNode
  text?: string
  subtext?: string
  rightIcon?: React.ReactNode
  rightText?: string
  noPadding?: boolean
  textClassName?: string
} & TouchableOpacityProps

const Cell = ({ icon, noPadding, textClassName, text, subtext, rightIcon, rightText, ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      className={classNames('h-16 flex-row items-center', props.className, !noPadding && 'px-4')}
    >
      {icon}
      <View className={classNames('min-w-0 flex-1', icon && 'ml-4')}>
        <Text className={classNames('text-body1 text-black', textClassName || 'font-app')}>{text}</Text>
        {subtext && <Text className='font-app text-body2 text-giratina-500'>{subtext}</Text>}
      </View>
      {(rightIcon || rightText) && (
        <View className='ml-4'>
          {rightIcon}
          {rightText && <Text className='font-app text-body1 text-giratina-500'>{rightText}</Text>}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default Cell
