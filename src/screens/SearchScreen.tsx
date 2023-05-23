import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomSafeAreaView, SearchBar } from '~/components/common'
import { Clear, Clock, Dissatisfied } from 'assets/icon'

const data = ['Wood chaid', 'Dark wood']

const SearchScreen = () => {
  return (
    <CustomSafeAreaView className='relative bg-white'>
      <View className='w-full px-4 py-2'>
        <SearchBar isSearching />
      </View>
      <View className='h-2' />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View className='flex-row items-center pr-4' key={index}>
            <TouchableOpacity className='h-16 min-w-0 flex-1 flex-row items-center pl-4'>
              <Clock />
              <Text className='ml-4 min-w-0 font-app text-body1 text-black'>{item}</Text>
              <View className='flex-1' />
            </TouchableOpacity>
            <TouchableOpacity>
              <Clear className='flex-shrink-0' fill='#9e9e9e' />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity className='h-16 min-w-0 flex-1 justify-center pl-4' key={index}>
            <Text className='min-w-0 font-app text-body1 text-black'>{item}</Text>
            <Text className='font-app text-body2 text-giratina-500'>living room / furniture</Text>
          </TouchableOpacity>
        )}
      /> */}

      {/* <View className='flex-1 items-center justify-center'>
        <View className='items-center'>
          <Dissatisfied />
          <Text className='max-w-[300] text-center font-app-semibold text-heading2 text-black'>
            nothing found, try something else
          </Text>
        </View>
      </View> */}
    </CustomSafeAreaView>
  )
}

export default SearchScreen
