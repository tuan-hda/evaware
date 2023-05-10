import { View, Text } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Prop = {
  title: string
  isBig?: boolean
  className?: string
}

const Title = ({ className, title, isBig }: Prop) => {
  return (
    <View className={classNames('h-16 px-4', !isBig && 'justify-center', className)}>
      <Text className={classNames('font-app-semibold text-black', isBig ? 'text-heading1' : 'text-heading2')}>
        {title}
      </Text>
    </View>
  )
}

export default Title
