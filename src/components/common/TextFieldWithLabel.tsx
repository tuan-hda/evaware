import { View, Text } from 'react-native'
import React from 'react'
import TextField, { TextFieldProps } from './TextField'

type Props = {
  label: string
  containerClassName?: string
} & TextFieldProps

const TextFieldWithLabel = ({ containerClassName, label, ...props }: Props) => {
  return (
    <View className={containerClassName}>
      <Text className='mb-1 font-app text-body1 text-black'>{label}</Text>
      <TextField {...props} />
    </View>
  )
}

export default TextFieldWithLabel
