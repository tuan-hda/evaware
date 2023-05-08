import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Search } from '~/components/search'
import { Slider } from '~/components/slider'
import { HomeCategory } from '~/components/category'
import { CustomSafeAreaView, ProductCardBig } from '~/components/common'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const HomeScreen = () => {
  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <Text className='mt-14 h-[58] font-app-semibold text-heading1 text-black'>evaware</Text>
        <View className='py-[7]'>
          <Search className='w-full' />
        </View>

        <View className='py-2'>
          <Slider />
        </View>

        <View className='w-full py-4'>
          {items.map((item, index) => (
            <View key={index}>
              <HomeCategory key={index} />
              {index !== items.length - 1 && <View className='h-4' />}
            </View>
          ))}
        </View>

        <View className='w-full py-4'>
          <Text className='font-app-semibold text-heading2 text-black'>popular</Text>
        </View>

        <View className='flex-row flex-wrap justify-between py-4'>
          {items.map((item, index) => (
            <View key={index} className='mb-6 w-[calc(50%)] flex-row'>
              {index % 2 === 1 && <View className='w-2' />}
              <ProductCardBig />
              {index % 2 === 0 && <View className='w-2' />}
            </View>
          ))}
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default HomeScreen
