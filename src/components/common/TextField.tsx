import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import classNames from 'classnames'
import { Clear } from 'assets/icon'

interface Props extends TextInputProps {
  description?: string
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  disabledIcon?: React.ReactNode
  hasClearBtn?: boolean
  color?: string
}

const TextField = ({
  description,
  rightIcon,
  error,
  disabled,
  icon,
  disabledIcon,
  hasClearBtn,
  color,
  ...props
}: Props) => {
  const ref = useRef<TextInput>(null)

  const clear = () => {
    ref.current?.clear()
  }

  return (
    <View className='w-full'>
      <View
        className={classNames(
          'h-16 w-full flex-row items-center overflow-hidden rounded-lg bg-giratina-100 font-app text-body1',
          {
            'focus:border focus:border-giratina-300': !error && !disabled,
            'border border-magikarp-400': error,
            'text-giratina-500': disabled
          }
        )}
      >
        {(icon || disabledIcon) && <View className='ml-4'>{!disabled ? icon : disabledIcon}</View>}
        <TextInput
          {...props}
          ref={ref}
          editable={!disabled}
          className='flex-1 px-4 font-app text-body1'
          placeholderTextColor='#9e9e9e'
          selectionColor='#FEEB70'
          style={{
            color
          }}
        />

        <View className='pr-4'>{rightIcon}</View>

        {hasClearBtn && (
          <TouchableOpacity onPress={clear} disabled={disabled} className='h-12 w-12 items-center justify-center pr-2'>
            <Clear fill={disabled ? '#9e9e9e' : undefined} />
          </TouchableOpacity>
        )}
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
