import { View, Text, ViewProps } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
} & ViewProps

const Status = ({ className, ...props }: Props) => {
  return (
    <View className={classNames('rounded-lg bg-magikarp-100 p-2', className)} {...props}>
      <Text className='font-app-medium text-magikarp-500'>Cancelled</Text>
    </View>
  )
}

export default Status
