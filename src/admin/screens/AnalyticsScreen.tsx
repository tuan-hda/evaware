import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { ScrollView } from 'react-native-gesture-handler'
import { CustomerRate, Sales } from '../components/analytics'
import TopProducts from '../components/analytics/TopProducts'
import TopCategories from '../components/analytics/TopCategories'

const AnalyticsScreen = () => {
  const [open, setOpen] = useState(false)
  const [times, setTimes] = useState({
    sales: 'June 1 - August 10'
  })

  const openModal = (name: string) => () => {
    // setTimes((prev) => ({
    //   ...prev,
    //   [name]: value
    // }))
  }

  return (
    <CustomSafeAreaView className='px-4'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className='mt-14 w-full text-left font-app-semibold text-heading1'>analytics</Text>
        <Sales time={times.sales} changeTime={openModal('sales')} />
        <TopProducts />
        <TopCategories />
        <CustomerRate />
        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default AnalyticsScreen
