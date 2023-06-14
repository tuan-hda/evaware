import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import Filter from '~/components/filter/Filter'
import { OrderItem } from '../components/order'
import SortFilter from '~/components/common/SortFilter'
import { useQuery } from '@tanstack/react-query'
import { getAltCurrentUserProfileService } from '~/services/user'
import { getOrdersService } from '~/services/order'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

const OrderScreen = () => {
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)

  const { data: temp, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getOrdersService
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)

  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white'
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1
        }}
      >
        {!focus && <Text className='mt-14 h-[58] w-full px-4 text-left font-app-semibold text-heading1'>orders</Text>}
        <View className={classNames(focus && 'mt-4', 'px-4')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>
        <SortFilter className='mx-4' />

        <View className='mt-4 w-full flex-1 bg-giratina-200 py-2'>
          {Array.isArray(data?.results) &&
            data?.results.map((item, index) => (
              <View key={item.id}>
                <OrderItem data={item} />
                <View className='h-2' />
              </View>
            ))}
          {/* <OrderItem />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' /> */}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderScreen
