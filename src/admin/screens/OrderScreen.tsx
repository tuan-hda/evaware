import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import Filter from '~/components/filter/Filter'
import { OrderItem } from '../components/order'

const OrderScreen = () => {
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white'
        contentContainerStyle={{
          alignItems: 'center',
          flex: 1
        }}
      >
        {!focus && <Text className='mt-14 h-[58] w-full px-4 text-left font-app-semibold text-heading1'>orders</Text>}
        <View className={classNames(focus && 'mt-14', 'px-4')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>
        <OrderItem />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderScreen
