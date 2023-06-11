import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { AppBar, CustomSafeAreaView, ProductCardBig } from '~/components/common'
import { SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import FlatGrid from '~/layouts/FlatGrid'
import { useNavigation } from '@react-navigation/native'
import { CatalogProp, HomeNavigationProp } from '~/components/navigation/HomeNav'
import Bars from '~/components/navigation/Bars'
import ModalSort from '~/components/modal/ModalSort'
import useProductData from '~/hooks/useProductData'

const CatalogScreen = ({ navigation, route }: CatalogProp) => {
  const { catalog, id } = route.params
  const [sortVisible, setSortVisible] = useState(false)
  const { response: product } = useProductData(id)

  const toggle = () => setSortVisible((prev) => !prev)

  return (
    <CustomSafeAreaView className='items-center bg-white px-4'>
      <ModalSort visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />
      <Bars headerLeft='return' title={catalog} onLeftButtonPress={() => navigation.goBack()} className='mb-2' />
      <SearchBar onPress={() => navigation.navigate('Search')} />
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
    </CustomSafeAreaView>
  )
}

export default CatalogScreen
