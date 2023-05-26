import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '~/components/common'

type Props = {
  title: string
  time?: string
  changeTime: () => void
  time1?: string
  changeTime1?: () => void
}

const AnalyticsHeader = ({ title, time = '', changeTime, time1 = '', changeTime1 }: Props) => {
  return (
    <View className='mb-1 mt-4 flex-row items-baseline justify-between'>
      <Text className='mt-4 text-left font-app-semibold text-heading2'>{title}</Text>
      <View className='flex-row'>
        {time && <Button onPress={changeTime} type='secondary' size='small' label={time} />}
        {time1 && (
          <View className='flex-row items-center'>
            <Text className='mx-2 font-app text-body1'>-&gt;</Text>
            <Button onPress={changeTime1} type='secondary' size='small' label={time1} />
          </View>
        )}
      </View>
    </View>
  )
}

export default AnalyticsHeader
