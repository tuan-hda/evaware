import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { AppBar, CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import useCategoryData from '~/hooks/useCategoryData'

const data = ['Furniture', 'Lightning', 'Rugs', 'Mirrors', 'Blankets', 'Cushions', 'Curtains', 'Curtains']

const Header = (navigation: HomeNavigationProp) => (
  <View className='mx-4 justify-center'>
    <SearchBar className='my-2' onPress={() => navigation.navigate('Search')} />
    <View className='h-16 justify-center'>
      <Text className='font-app-semibold text-heading2'>categories</Text>
    </View>
  </View>
)

const Footer = () => <View className='h-4' />

const CategoriesScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  const { response: categories } = useCategoryData()

  return (
    <CustomSafeAreaView className='h-full w-full bg-white'>
      <AppBar title='Living room' />
      <FlatList
        ListHeaderComponent={Header(navigation)}
        ListFooterComponent={Footer}
        data={categories?.results}
        renderItem={({ item }) => (
          <TouchableOpacity
            className='mx-4 h-16 flex-row items-center'
            onPress={() => navigation.navigate('Catalog', { catalog: item.name, id: item.id })}
          >
            <Image
              source={{
                uri: item.img_url
              }}
              className='h-9 w-9 rounded-full'
            />
            <Text className='ml-4 font-app text-body1 text-black'>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </CustomSafeAreaView>
  )
}

export default CategoriesScreen
