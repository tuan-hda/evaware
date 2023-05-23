import { View, Text, ViewProps } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  className?: string
  status?: 'success' | 'delivering' | 'cancelled'
  type?: 'text' | 'normal'
} & ViewProps

const Status = ({ className, status = 'success', type = 'normal', ...props }: Props) => {
  const getColor = () => {
    if (status === 'cancelled') return ['bg-magikarp-100', 'text-magikarp-500']
    if (status === 'delivering') return ['bg-gengar-100', 'text-gengar-500']
    return ['bg-venusaur-100', 'text-venusaur-500']
  }

  return (
    <View
      className={classNames('rounded-lg ', className, type === 'normal' && 'p-2', type === 'normal' && getColor()[0])}
      {...props}
    >
      <Text className={classNames('font-app-medium', getColor()[1])}>{status[0].toUpperCase() + status.slice(1)}</Text>
    </View>
  )
}

export default Status
