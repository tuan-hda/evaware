import { View, Text, Pressable, FlatList } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
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
import { FilterListProps } from '~/components/filter/Filter'
import { FilterProps, getFilterService } from '~/services/filter'
import { number } from 'yup'
import { isAxiosError } from 'axios'
import { immer } from 'zustand/middleware/immer'
import { produce } from 'immer'
import useSortFilterStore from '~/store/sort_filter'
import { shallow } from 'zustand/shallow'

const CatalogScreen = ({ navigation, route }: CatalogProp) => {
  const { catalog, id } = route.params
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
    return res.length > 0 ? res.slice(1) : res
  }, [filterData])

  const [minv] = useDebounce(minPrice, 500)
  const [maxv] = useDebounce(maxPrice, 500)

  const { response: product, fetch } = useProductData(id, value, sort, minv, maxv, filterQuery)
  useRefetchOnFocus(fetch)

  useEffect(() => {
    if (product) {
      setFilteredProducts(product)
    }
  }, [product, setFilteredProducts])

  const toggle = () => setSortVisible((prev) => !prev)

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

  const getType = (keyName: string) => {
    if (['width', 'height', 'depth'].includes(keyName)) return ' cm'
    else if (keyName === 'weight') return 'kg'
    else return ''
  }

  useEffect(() => {
    ;(async () => {
      try {
        const res = (await getFilterService()).data
        const { max_price, min_price, ...response } = res
        const newFilters = Object.keys(response).map((keyName: keyof Omit<FilterProps, 'min_price' | 'max_price'>) => {
          return {
            name: keyName,
            selected:
              response &&
              response[keyName].map((item) => ({
                name: String(item) + getType(keyName),
                selected: false,
                value: item
              }))
          }
        })
        setFilterData(newFilters)
        setMaxPrice(max_price)
        setMinPrice(min_price)
      } catch (error) {
        if (isAxiosError(error)) console.log(JSON.stringify(error?.response || error))
        else console.log(error)
      }
    })()
  }, [id, setFilterData, setMaxPrice, setMinPrice])

  const finalData = filteredProducts

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
      {finalData?.results && (
        <FlatGrid
          data={finalData?.results}
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
