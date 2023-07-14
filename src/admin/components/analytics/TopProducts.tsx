import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import AnalyticsHeader from './AnalyticsHeader'
import classNames from 'classnames'
import SelectModal from '~/components/common/SelectModal'
import { useQuery } from '@tanstack/react-query'
import { getTopProductService } from '~/services/product'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

const TopProducts = () => {
  const list = [1, 2, 3, 4, 5]
  const [show, setShow] = useState(false)
  const toggle = () => {
    setShow((prev) => !prev)
  }
  const [range, setRange] = useState('yearly')

  const { data: temp, refetch } = useQuery({
    queryKey: ['top-products', range],
    queryFn: () => getTopProductService(range)
  })
  const data = temp?.data || []

  useRefetchOnFocus(refetch)
  const items = [
    {
      value: 'Monthly',
      action: () => {
        setRange('monthly')
      }
    },
    {
      value: 'Quarterly',
      action: () => {
        setRange('quarterly')
      }
    },
    {
      value: 'Yearly',
      action: () => {
        setRange('yearly')
      }
    },
    {
      value: 'Weekly',
      action: () => {
        setRange('weekly')
      }
    }
  ]

  return (
    <View>
      <AnalyticsHeader
        title='top products'
        time={range[0].toUpperCase() + range.slice(1).toLocaleLowerCase()}
        changeTime={toggle}
      />
      <SelectModal show={show} items={items} toggle={toggle} title='Choose period of time' />
      <View className={classNames('flex-row items-center justify-between rounded-lg py-2')}>
        <Text className='font-app text-body2'>Product</Text>
        <View className='flex-1' />
        <Text className='mr-2 w-14 text-right font-app text-body2 text-black'>Sales</Text>
        <Text className='w-[70] text-right font-app text-body2 text-black'>Revenue</Text>
      </View>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <View key={index}>
            <View
              className={classNames(
                'flex-row items-center justify-between rounded-lg p-2',
                index % 2 === 0 && 'bg-giratina-100'
              )}
            >
              <View className='h-8 w-8 rounded-md'>
                <Image source={{ uri: item.product.thumbnail }} className='h-8 w-8' />
              </View>
              <Text className='ml-2 font-app-regular text-body1'>{item.product.name}</Text>
              <View className='flex-1' />
              <Text className='mr-2 w-14 text-right font-app text-body1 text-black'>{item.sales}</Text>
              <Text className='w-16 text-right font-app text-body1 text-black'>${item.revenue}</Text>
            </View>
            {index !== list.length - 1 && <View className='h-1' />}
          </View>
        ))}
    </View>
  )
}

export default TopProducts
