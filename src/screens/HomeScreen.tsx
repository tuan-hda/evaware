import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { HomeCategory } from '~/components/category'
import { Button, CustomSafeAreaView, SearchBar } from '~/components/common'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import useCategoryData from '~/hooks/useCategoryData'

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  const { response: categories } = useCategoryData()

  return (
    <CustomSafeAreaView className='bg-white'>
      <ScrollView
        className='flex-1 bg-white px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        <Text className='mt-14 h-[58] font-app-semibold text-heading1 text-black'>evaware</Text>
        <View className='py-[7]'>
          <SearchBar
            onPress={() => navigation.navigate('Catalog', { catalog: 'All products', id: -1, action: 'search' })}
            className='w-full'
          />
        </View>

        <View className='w-full py-4'>
          {categories?.results.map((item, index) => (
            <View key={item.id}>
              <TouchableOpacity onPress={() => navigation.navigate('Catalog', { catalog: item.name, id: item.id })}>
                <HomeCategory name={item.name} img_url={item.img_url} key={item.id} />
              </TouchableOpacity>
              {index !== categories.results.length - 1 && <View className='h-4' />}
            </View>
          ))}
        </View>

        <Button label='View all categories' onPress={() => navigation.navigate('Category')} />

        <View className='w-full py-4'>
          <Text className='font-app-semibold text-heading2 text-black'>popular</Text>
        </View>

        {/* <View className='flex-row flex-wrap justify-between py-4'>
          {items.map((item, index) => (
            <View key={index} className='mb-6 w-[calc(50%)] flex-row'>
              {index % 2 === 1 && <View className='w-2' />}
              <ProductCardBig onPress={() => navigation.navigate('Product')} />
              {index % 2 === 0 && <View className='w-2' />}
            </View>
          ))}
        </View> */}
        <Button
          label='View all products'
          onPress={() => navigation.navigate('Catalog', { catalog: 'All products', id: -1 })}
        />
        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default HomeScreen
