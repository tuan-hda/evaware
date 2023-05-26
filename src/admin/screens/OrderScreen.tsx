import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import Filter from '~/components/filter/Filter'
import { OrderItem } from '../components/order'
import SortFilter from '~/components/common/SortFilter'

const OrderScreen = () => {
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
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
          <OrderItem />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' />
          <OrderItem className='mt-2' />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderScreen
