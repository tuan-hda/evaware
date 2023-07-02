import { View, Text, Pressable } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type Props = {
  data: number
  points: number
  selected: boolean
  onPress: () => void
}

const RewardItem = (props: Props) => {
  return (
    <Pressable
      className={classNames(
        'h-20 w-20 items-center justify-center rounded-lg  border-gengar-100',
        props.selected ? 'border-none bg-gengar-400' : 'border-2'
      )}
      onPress={props.onPress}
    >
      <Text
        className={classNames('mb-1 font-app-semibold text-body1', props.selected ? 'text-white' : 'text-gengar-500')}
      >
        {props.data}%
      </Text>
      <Text className={classNames('mb-1 font-app text-body2', props.selected ? 'text-white' : 'text-gengar-500')}>
        {props.points}p
      </Text>
    </Pressable>
  )
}

export default RewardItem
