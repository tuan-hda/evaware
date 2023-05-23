import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { AppBar, CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'

const data = ['Furniture', 'Lightning', 'Rugs', 'Mirrors', 'Blankets', 'Cushions', 'Curtains', 'Curtains']

const Header = () => (
  <View className='mx-4 justify-center'>
    <SearchBar className='my-2' />
    <View className='h-16 justify-center'>
      <Text className='font-app-semibold text-heading2'>categories</Text>
    </View>
  </View>
)

const Footer = () => <View className='h-4' />

const CategoriesScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()

  return (
    <CustomSafeAreaView className='h-full w-full bg-white'>
      <AppBar title='Living room' />
      <FlatList
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity className='mx-4 h-16 flex-row items-center' onPress={() => navigation.navigate('Catalog')}>
            <Image
              source={{
                uri: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg'
              }}
              className='h-9 w-9 rounded-full'
            />
            <Text className='ml-4 font-app text-body1 text-black'>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </CustomSafeAreaView>
  )
}

export default CategoriesScreen
