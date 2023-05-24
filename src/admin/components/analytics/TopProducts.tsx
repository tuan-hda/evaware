import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AnalyticsHeader from './AnalyticsHeader'
import classNames from 'classnames'
import SelectModal from '~/components/common/SelectModal'

const TopProducts = () => {
  const list = [1, 2, 3, 4, 5]
  const [show, setShow] = useState(false)
  const toggle = () => {
    setShow((prev) => !prev)
  }

  const items = [
    {
      value: 'Monthly',
      action: () => {}
    },
    {
      value: 'Quarterly',
      action: () => {}
    },
    {
      value: 'Yearly',
      action: () => {}
    }
  ]

  return (
    <View>
      <AnalyticsHeader title='top products' time='Monthly' changeTime={toggle} />
      <SelectModal show={show} items={items} toggle={toggle} title='Choose period of time' />
      <View className={classNames('flex-row items-center justify-between rounded-lg py-2')}>
        <Text className='font-app text-body2'>Product</Text>
        <View className='flex-1' />
        <Text className='mr-2 w-14 text-right font-app text-body2 text-black'>Sales</Text>
        <Text className='w-[70] text-right font-app text-body2 text-black'>Revenue</Text>
      </View>
      {list.map((item, index) => (
        <View key={index}>
          <View
            className={classNames(
              'flex-row items-center justify-between rounded-lg p-2',
              index % 2 === 0 && 'bg-giratina-100'
            )}
          >
            <View className='h-8 w-8 rounded-md bg-black' />
            <Text className='ml-2 font-app-regular text-body1'>Sofia Sofa</Text>
            <View className='flex-1' />
            <Text className='mr-2 w-14 text-right font-app text-body1 text-black'>2345</Text>
            <Text className='w-16 text-right font-app text-body1 text-black'>$2345</Text>
          </View>
          {index !== list.length - 1 && <View className='h-1' />}
        </View>
      ))}
    </View>
  )
}

export default TopProducts
