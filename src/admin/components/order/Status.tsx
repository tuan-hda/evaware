import { View, Text, ViewProps } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  status?: 'Success' | 'Delivering' | 'Cancelled' | 'In progress' | string
  type?: 'text' | 'normal'
} & ViewProps

const Status = ({ className, status = 'Success', type = 'normal', ...props }: Props) => {
  const getColor = () => {
    if (status === 'Cancelled') return ['bg-magikarp-100', 'text-magikarp-500']
    if (status === 'Delivering') return ['bg-gengar-100', 'text-gengar-500']
    if (status === 'Success') return ['bg-venusaur-100', 'text-venusaur-500']
    return ['bg-black/80', 'text-charizard-500']
  }

  return (
    <View
      className={classNames('rounded-lg ', className, type === 'normal' && 'p-2', type === 'normal' && getColor()[0])}
      {...props}
    >
      <Text className={classNames('font-app-medium', getColor()[1])}>{status}</Text>
    </View>
  )
}

export default Status
