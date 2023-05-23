import { Text, TextInput, TextInputProps, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import classNames from 'classnames'
import { Clear } from 'assets/icon'
import { Control, Controller, FormProvider, useController } from 'react-hook-form'

export interface TextFieldProps extends TextInputProps {
  description?: string
  error?: string
  disabled?: boolean
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  onRightIconPress?: () => void
  disabledIcon?: React.ReactNode
  hasClearBtn?: boolean
  color?: string
  TextfieldClassName?: string
  control?: Control<any, any>
  name?: string
  onLeftIconPress?: () => void
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
  onLeftIconPress,
  onRightIconPress,
  TextfieldClassName,
  control,
  name = '',
  ...props
}: TextFieldProps) => {
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
          },
          TextfieldClassName
        )}
      >
        <TouchableOpacity className='ml-4' onPress={onLeftIconPress}>
          {(icon || disabledIcon) && <View>{!disabled ? icon : disabledIcon}</View>}
        </TouchableOpacity>
        {control ? (
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <TextInput
                {...props}
                value={field.value}
                onChangeText={field.onChange}
                ref={ref}
                editable={!disabled}
                className='flex-1 px-4 font-app text-body1'
                placeholderTextColor='#9e9e9e'
                selectionColor='#FEEB70'
                style={{
                  color
                }}
              />
            )}
          />
        ) : (
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
        )}

        <TouchableOpacity className='pr-4' onPress={onRightIconPress}>
          <View>{rightIcon}</View>
        </TouchableOpacity>

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
