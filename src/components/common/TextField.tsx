import { Text, TextInput, TextInputProps, View } from 'react-native'
import React from 'react'
import classNames from 'classnames'

interface Props extends TextInputProps {
  description?: string
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  disabledIcon?: React.ReactNode
  hasClearBtn?: boolean
}

const TextField = ({ description, error, disabled, icon, disabledIcon, hasClearBtn, ...props }: Props) => {
  return (
    <View className='w-full'>
      <View
        className={classNames(
          'h-16 w-full flex-row items-center overflow-hidden rounded-lg bg-giratina-100 px-4 font-app text-body1',
          {
            'focus:border focus:border-giratina-300': !error && !disabled,
            'border border-magikarp-400': error,
            'text-giratina-500': disabled
          }
        )}
      >
        {(icon || disabledIcon) && <View className='mr-4'>{!disabled ? icon : disabledIcon}</View>}
        <TextInput
          {...props}
          editable={!disabled}
          className='flex-1 font-app text-body1'
          placeholderTextColor='#9e9e9e'
          selectionColor='#FEEB70'
        />
      </View>

      {(error || description) && (
        <Text
          className={classNames('ml-4 mt-2 font-app text-body2', {
            'text-giratina-500': description,
            'text-magikarp-400': error
          })}
        >
          {error || description}
        </Text>
      )}
    </View>
  )
}

export default TextField
