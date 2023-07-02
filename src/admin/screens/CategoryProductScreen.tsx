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
import { CategoryProp, ProductNavigationProp } from '../nav/ProductNav'
import ModalSort from '~/components/modal/ModalSort'
import { DirectionVertical } from 'assets/icon'
import { FlatList } from 'react-native-gesture-handler'
import Bars from '~/components/navigation/Bars'
import useCategoryData from '~/hooks/useCategoryData'
import { AddCategory } from '../components/categories'
import useCategoryDetailData from '~/hooks/useCategoryDetailData'

const CategoryProductScreen = ({ route }: CategoryProp) => {
  const [sortVisible, setSortVisible] = useState(false)
  const [showToggle, setShowToggle] = useState(false)
  const toggleShow = () => {
    setShowToggle((prev) => !prev)
  }
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

  const id = route.params?.id || -1
  const { response: category, fetch: categoryFetch } = useCategoryDetailData(id)
  const { response: product, fetch } = useProductData(id, value, sort, minv, maxv, filterQuery)

  useRefetchOnFocus(fetch)

  useEffect(() => {
    if (product) {
      setFilteredProducts(product)
    }
  }, [product, setFilteredProducts])
  useEffect(() => {
    if (category) {
      categoryFetch()
    }
  }, [showToggle])

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
    <CustomSafeAreaView className='flex-1 bg-white px-4'>
      <ModalSort applySort={applySort} visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />
      <AddCategory show={showToggle} toggle={toggleShow} data={category} />

      {!focus && (
        <Bars
          title={category?.name}
          headerRight='action'
          label='Edit'
          subTitle={product?.results.length.toString() + ' products'}
          titleUnder={true}
          headerLeft='return'
          onLeftButtonPress={() => navigation.goBack()}
          onRightButtonPress={toggleShow}
        />
      )}
      <View className={classNames(focus && 'mt-4')}>
        <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
      </View>
      <View className='my-2 flex-row'>
        <Pressable
          className='h-9 flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => setSortVisible(true)}
        >
          <Text className='mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
      </View>
      <FlatList
        className='w-full flex-1'
        data={filteredProducts?.results}
        renderItem={({ item }) => (
          <ProductItem
            {...item}
            thumbnail={
              item.thumbnail ||
              'https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JheXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
            }
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='h-4' />}
      />
    </CustomSafeAreaView>
  )
}

export default CategoryProductScreen
