import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { AppBar, CustomSafeAreaView, ProductCardBig } from '~/components/common'
import { SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import FlatGrid from '~/layouts/FlatGrid'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { CatalogProp, HomeNavigationProp } from '~/components/navigation/HomeNav'
import Bars from '~/components/navigation/Bars'
import ModalSort from '~/components/modal/ModalSort'
import useProductData from '~/hooks/useProductData'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { useDebounce } from 'use-debounce'

const CatalogScreen = ({ navigation, route }: CatalogProp) => {
  const { catalog, id } = route.params
  const [sortVisible, setSortVisible] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState('')
  const [value] = useDebounce(text, 1000)
  const [sort, setSort] = useState<string | undefined>()
  const { response: product, fetch } = useProductData(id, value, sort)
  useRefetchOnFocus(fetch)

  const toggle = () => setSortVisible((prev) => !prev)

  const show = () => setIsSearching(true)
  const hide = () => setIsSearching(false)

  const applySort = (sortType: string) => {
    switch (sortType) {
      case 'New first':
        setSort('-created_at')
        break
      case 'Price: high to low':
        setSort('-price')
        break
      case 'Price: low to high':
        setSort('price')
        break
      case 'Popular first':
        setSort('-price')
        break
    }
  }

  return (
    <CustomSafeAreaView className='items-center bg-white px-4'>
      <ModalSort applySort={applySort} visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />
      <Bars headerLeft='return' title={catalog} onLeftButtonPress={() => navigation.goBack()} className='mb-2' />
      <SearchBar
        value={text}
        onChangeText={(str) => setText(str)}
        isSearching={isSearching}
        onBack={() => {
          setText('')
          hide()
        }}
        onPress={show}
      />
      {/* Sort and filter */}
      <View className='my-2 flex-row'>
        <Pressable
          className='mr-[15px] h-9 flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => setSortVisible(true)}
        >
          <Text className='mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
        <Pressable
          className='h-9 flex-1 flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => navigation.navigate('Filter')}
        >
          <Text className='mr-1 font-app-medium text-body2'>Filter</Text>
          <Filter />
        </Pressable>
      </View>
      {/* Gridview */}
      {product?.results && (
        <FlatGrid
          data={product?.results}
          numColumns={2}
          verticalGap={24}
          horizontalGap={15}
          onItemPress={(item) =>
            navigation.navigate('Product', {
              id: item.id
            })
          }
        />
      )}
      {/* {product && (
        <View className='flex-row flex-wrap justify-between py-4'>
          {product?.results.map((item, index) => (
            <View key={index} className='mb-6 w-[calc(50%)] flex-row'>
              {index % 2 === 1 && <View className='w-2' />}
              <ProductCardBig
                data={item}
                onPress={() =>
                  navigation.navigate('Product', {
                    id: item.id
                  })
                }
              />
              {index % 2 === 0 && <View className='w-2' />}
            </View>
          ))}
        </View>
      )} */}
    </CustomSafeAreaView>
  )
}

export default CatalogScreen
