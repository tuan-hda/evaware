import { View, Text, Pressable, FlatList } from 'react-native'
import React from 'react'
import { CustomSafeAreaView, ProductCardBig } from '~/components/common'
import { Search } from '~/components/search'
import { DirectionVertical, Filter } from 'assets/icon'
import FlatGrid from '~/layouts/FlatGrid'

const DATA = [
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  }
]

const CatalogScreen = () => {
  return (
    <CustomSafeAreaView className='items-center bg-white px-4'>
      <Search className='mb-2' />
      {/* Sort and filter */}
      <View className='my-2 flex-row'>
        <Pressable
          className='mr-[15px] h-9 flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Sort')}
        >
          <Text className='mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
        <Pressable
          className='h-9 flex-1 flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Filter')}
        >
          <Text className='mr-1 font-app-medium text-body2'>Filter</Text>
          <Filter />
        </Pressable>
      </View>
      {/* Gridview */}
      <FlatGrid data={DATA} numColumns={2} verticalGap={24} horizontalGap={15} />
    </CustomSafeAreaView>
  )
}

export default CatalogScreen
