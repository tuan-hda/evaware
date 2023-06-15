import { View, Text } from 'react-native'
import React from 'react'
import AnalyticsHeader from './AnalyticsHeader'
import { useQuery } from '@tanstack/react-query'
import { getTopCategoriesService } from '~/services/statistics'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

const CustomerRate = () => {
  const { data: temp, refetch } = useQuery({
    queryKey: ['categories'],
    queryFn: getTopCategoriesService
  })
  const data = [temp?.data.new_buyers_percent, temp?.data.returning_percent]
  useRefetchOnFocus(refetch)

  if (!data || data.length === 0) return <View />

  return (
    <View>
      <AnalyticsHeader changeTime={() => {}} title='customer rate' />
      <View className='mt-4 flex-row'>
        <View
          style={{
            width: (data[0] || '50') + '%'
          }}
          className='h-3 w-[70%] bg-charizard-200'
        />
        <View
          style={{
            width: (data[1] || '50') + '%'
          }}
          className='h-3 w-[30%] bg-charizard-400'
        />
      </View>
      <View className='mt-1 flex-row'>
        <View className='flex-1'>
          <Text className='font-app text-body3'>First time buying</Text>
          <Text className='font-app-regular text-body1'>{data[0]}%</Text>
        </View>
        <View className='flex-1 items-end'>
          <Text className='font-app text-body3'>Returning</Text>
          <Text className='font-app-regular text-body1'>{data[1]}%</Text>
        </View>
      </View>
    </View>
  )
}

export default CustomerRate
