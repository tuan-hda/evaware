import { View, Text } from 'react-native'
import React from 'react'
import TextField, { TextFieldProps } from './TextField'

type Props = {
  label: string
  containerClassName?: string
  TextfieldClassName?: string
} & TextFieldProps

const TextFieldWithLabel = ({ containerClassName, label, TextfieldClassName, ...props }: Props) => {
  return (
    <View className={containerClassName}>
      <Text className='mb-1 font-app text-body1 text-black'>{label}</Text>
      <TextField {...props} TextfieldClassName={TextfieldClassName} />
    </View>
  )
}

export default TextFieldWithLabel
