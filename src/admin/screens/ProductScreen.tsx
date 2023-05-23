import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import { ProductItem } from '../components/product'
import { BagItemProps } from '~/types/bagItem.type'

const ProductScreen = () => {
  const bagItems: BagItemProps[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: '1af',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'av1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    }
  ]

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
        {!focus && <Text className='mt-14 h-[58] w-full text-left font-app-semibold text-heading1'>products</Text>}
        <View className={classNames(focus && 'mt-4', 'mb-4s')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>

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
