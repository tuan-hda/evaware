import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'
import { ProductItem } from '../components/product'
import { BagItemProps } from '~/types/bagItem.type'
import SortFilter from '~/components/common/SortFilter'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'
import { useDebounce } from 'use-debounce'
import useProductData from '~/hooks/useProductData'
import useSortFilterStore from '~/store/sort_filter'
import { shallow } from 'zustand/shallow'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { ProductNavigationProp } from '../nav/ProductNav'
import ModalSort from '~/components/modal/ModalSort'
import { DirectionVertical } from 'assets/icon'

const ProductScreen = () => {
  const [sortVisible, setSortVisible] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [text, setText] = useState('')
  const [value] = useDebounce(text, 1000)
  const [
    setFilterData,
    filterList,
    filterClear,
    setMinPrice,
    setMaxPrice,
    minPrice,
    maxPrice,
    sort,
    setSort,
    filteredProducts,
    filterData,
    setFilteredProducts
  ] = useSortFilterStore(
    (state) => [
      state.setFilterData,
      state.filterList,
      state.filterClear,
      state.setMinPrice,
      state.setMaxPrice,
      state.minPrice,
      state.maxPrice,
      state.sort,
      state.setSort,
      state.filteredProducts,
      state.filterData,
      state.setFilteredProducts
    ],
    shallow
  )
  const navigation = useNavigation<ProductDrawerNavigationProp & ProductNavigationProp>()

  const filterQuery = useMemo(() => {
    let res = ''
    filterData?.forEach((item) => {
      item?.selected.forEach((item2) => {
        if (item2.selected) {
          if (item.name === 'variation') {
            res += `&variation__name=${item2.value}`
          } else {
            res += `&${item.name}=${item2.value}`
          }
        }
      })
    })
    res = '&include_delete=true' + res
    return res.length > 0 ? res.slice(1) : res
  }, [filterData])

  const [minv] = useDebounce(minPrice, 500)
  const [maxv] = useDebounce(maxPrice, 500)

  const { response: product, fetch } = useProductData(-1, value, sort, minv, maxv, filterQuery)
  useRefetchOnFocus(fetch)

  useEffect(() => {
    if (product) {
      setFilteredProducts(product)
    }
  }, [product, setFilteredProducts])

  const show = () => setIsSearching(true)
  const hide = () => setIsSearching(false)

  const applySort = (sortType: string) => {
    switch (sortType) {
      case 'New first':
        setSort('-id')
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
        <ModalSort applySort={applySort} visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />

        {!focus && (
          <View className='mt-14 w-full  flex-row items-center justify-between'>
            <Text className='h-[58] text-left font-app-semibold text-heading1'>products</Text>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <MaterialCommunityIcons name='menu-open' size={32} />
            </TouchableOpacity>
          </View>
        )}
        <View className={classNames(focus && 'mt-4')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>
        <View className='my-2 flex-row'>
          <Pressable
            className='mr-[15px] h-9 flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
            onPress={() => setSortVisible(true)}
          >
            <Text className='mr-1 font-app-medium text-body2'>Sort</Text>
            <DirectionVertical />
          </Pressable>
          {/* <Pressable
            className='h-9 flex-1 flex-row items-center justify-center rounded bg-giratina-100'
            onPress={() => navigation.navigate('Filter')}
          >
            <Text className='mr-1 font-app-medium text-body2'>Filter</Text>
            <Filter />
          </Pressable> */}
        </View>

        {filteredProducts?.results.map((item, index) => (
          <View key={index} className='w-full'>
            <View className='h-4' />
            <ProductItem
              {...item}
              thumbnail={
                item.thumbnail ||
                'https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JheXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
              }
            />
          </View>
        ))}

        <View className='h-4' />
        <Button label='Add product' onPress={() => navigation.navigate('ProductDetail', {})} />
        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ProductScreen
