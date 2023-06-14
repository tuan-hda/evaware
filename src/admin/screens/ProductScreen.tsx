import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import { ProductItem } from '../components/product'
import { BagItemProps } from '~/types/bagItem.type'
import SortFilter from '~/components/common/SortFilter'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'

const ProductScreen = () => {
  const bagItems: BagItemProps[] = [
    {
      id: '1',
      createdAt: '2002-12-12',
      updatedAt: '2002-12-12',
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: '1af',
      createdAt: '2002-12-12',
      updatedAt: '2002-12-12',
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'av1',
      createdAt: '2002-12-12',
      updatedAt: '2002-12-12',
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'xav1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'av1d',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    }
  ]

  const navigation = useNavigation<ProductDrawerNavigationProp>()

  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        {!focus && (
          <View className='mt-14 w-full  flex-row items-center justify-between'>
            <Text className='h-[58] text-left font-app-semibold text-heading1'>products</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <MaterialCommunityIcons name='menu-open' size={32} />
            </TouchableOpacity>
          </View>
        )}
        <View className={classNames(focus && 'mt-4', 'mb-4s')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>
        <SortFilter />

        {bagItems.map((item, index) => (
          <View key={index} className='w-full'>
            <View className='h-4' />
            <ProductItem disabled={index % 2 === 0} {...item} />
          </View>
        ))}
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ProductScreen
