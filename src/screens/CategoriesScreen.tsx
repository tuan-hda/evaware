import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { AppBar, CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import useCategoryData from '~/hooks/useCategoryData'
import useShowNav from '~/hooks/useShowNav'
import { CategoryProps } from '~/types/category.type'

const data = ['Furniture', 'Lightning', 'Rugs', 'Mirrors', 'Blankets', 'Cushions', 'Curtains', 'Curtains']

const Footer = () => <View className='h-4' />

const CategoriesScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  const { response: categories } = useCategoryData()
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState('')
  const [res, setRes] = useState<CategoryProps[]>([])

  const show = () => setIsSearching(true)
  const hide = () => setIsSearching(false)

  const filter = (value: string) => {
    if (categories) setRes(categories?.results.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())))
  }

  return (
    <CustomSafeAreaView className='h-full w-full bg-white'>
      <AppBar title='Living room' />
      <FlatList
        ListHeaderComponent={
          <View className='mx-4 justify-center'>
            <SearchBar
              value={text}
              onChangeText={(str) => {
                setText(str)
                filter(str)
              }}
              isSearching={isSearching}
              onBack={() => {
                setText('')
                hide()
              }}
              onPress={show}
            />
            <View className='h-16 justify-center'>
              <Text className='font-app-semibold text-heading2'>categories</Text>
            </View>
          </View>
        }
        ListFooterComponent={Footer}
        data={res.length > 0 ? res : categories?.results}
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
