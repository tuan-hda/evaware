import { View, Text, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { Button, Cell, CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import { ProductItem } from '../components/product'
import { BagItemProps } from '~/types/bagItem.type'
import SortFilter from '~/components/common/SortFilter'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'
import { AddCategory } from '../components/categories'
import { FlatList } from 'react-native-gesture-handler'
import useCategoryData from '~/hooks/useCategoryData'
import { ProductNavigationProp } from '../nav/ProductNav'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

const CategoriesScreen = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  const { response: categories, fetch } = useCategoryData()
  useRefetchOnFocus(fetch)

  const navigation = useNavigation<ProductDrawerNavigationProp & ProductNavigationProp>()

  return (
    <CustomSafeAreaView className='flex-1 bg-white pb-4'>
      <AddCategory show={show} toggle={toggleShow} />
      <View className='mt-14 w-full  flex-row items-center justify-between  px-4'>
        <Text className='h-[58] text-left font-app-semibold text-heading1'>categories</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name='menu-open' size={32} />
        </TouchableOpacity>
      </View>
      <FlatList
        className='w-full flex-1'
        data={categories?.results}
        renderItem={({ item }) => (
          <Cell
            icon={
              <Image
                source={{
                  uri: item.img_url
                }}
                className='h-9 w-9 rounded-full'
              />
            }
            text={item.name}
            onPress={() => navigation.navigate('CategoryProduct', { id: item.id })}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='h-4' />}
      />
      <View className='w-full p-4'>
        <Button onPress={toggleShow} label='Add category' />
      </View>
    </CustomSafeAreaView>
  )
}

export default CategoriesScreen
