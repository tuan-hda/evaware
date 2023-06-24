import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import RnRangeSlider from 'rn-range-slider'
import { Button, Category, Cell, CustomSafeAreaView } from '~/components/common'
import { FilterProp, HomeNavigationProp } from '../navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'
import Bars from '../navigation/Bars'
import { useSelector } from 'react-redux'
import useSortFilterStore from '~/store/sort_filter'
import { shallow } from 'zustand/shallow'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import useProductData from '~/hooks/useProductData'
import { useDebounce } from 'use-debounce'

// const DATA = [
//   {
//     name: 'Category',
//     selected: [
//       {
//         name: 'Furniture',
//         selected: true
//       },
//       {
//         name: 'Lighting',
//         selected: false
//       },
//       {
//         name: 'Rugs',
//         selected: true
//       },
//       {
//         name: 'Mirrors',
//         selected: false
//       },
//       {
//         name: 'Blankets',
//         selected: true
//       }
//     ]
//   },
//   {
//     name: 'Product type',
//     selected: [
//       {
//         name: 'Furniture',
//         selected: true
//       },
//       {
//         name: 'Lighting',
//         selected: false
//       }
//     ]
//   },
//   {
//     name: 'Color',
//     selected: []
//   },
//   {
//     name: 'Size',
//     selected: []
//   },
//   {
//     name: 'Quality',
//     selected: []
//   }
// ]

export type FilterListProps =
  | {
      name: string
      selected: {
        name: string
        value: string | number
        selected: boolean
      }[]
    }
  | undefined

// const getSelected = (
//   arr: {
//     name: string
//     selected: boolean
//   }[]
// ) => {
//   const selectedList = arr.filter((item) => item.selected)
//   if (selectedList.length == arr.length || selectedList.length == 0) return 'All'
//   else if (selectedList.length == 1) return selectedList[0].name
//   else return selectedList.length.toString()
// }

// const getFilterList = (filterList: FilterListProps) => {
//   if (filterList) {
//     const { name, selected } = filterList

//     const newData = [...DATA]
//     const item = newData.find((item) => item.name === name)
//     if (item) {
//       const newItem = { name: name, selected: selected }
//       newData[newData.indexOf(item)] = newItem
//       return newData
//     }
//   }
// }

const Filter = ({ route }: FilterProp) => {
  const navigation = useNavigation<HomeNavigationProp>()
  let id = route.params?.id
  if (!id) id = -1

  const [
    filterData,
    filterList,
    filterClear,
    updateMin,
    updateMax,
    minPrice,
    maxPrice,
    toggleFilter,
    min_price,
    max_price,
    sort,
    setFilteredProducts
  ] = useSortFilterStore(
    (state) => [
      state.filterData,
      state.filterList,
      state.filterClear,
      state.updateMin,
      state.updateMax,
      state.minPrice,
      state.maxPrice,
      state.toggleFilter,
      state.min_price,
      state.max_price,
      state.sort,
      state.setFilteredProducts
    ],
    shallow
  )

  const filterQuery = useMemo(() => {
    let res = ''
    filterData?.forEach((item) => {
      const filterItems = item?.selected.filter((x) => x.selected)
      if (filterItems?.length && filterItems.length > 0) {
        const name = item?.name === 'variation' ? 'variation__name' : item?.name
        res += `&${name}=`
      }

      filterItems?.forEach((item2, index) => {
        res += item2.value
        if (index !== filterItems.length - 1) {
          res += '|'
        }
      })
    })
    return res.length > 0 ? res.slice(1) : res
  }, [filterData])

  const [minv] = useDebounce(minPrice, 500)
  const [maxv] = useDebounce(maxPrice, 500)

  const { response: product } = useProductData(id, undefined, sort, minv, maxv, filterQuery)

  // useEffect(() => {}, [filterData])

  const [data, setData] = useState(filterList)

  useEffect(() => {
    setData(filterList)
  }, [filterList])

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4 pb-4'>
      <Bars
        headerLeft='close'
        title='Filter'
        headerRight='action'
        label='Clear'
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={filterClear}
      />
      <ScrollView className='w-full flex-1' showsVerticalScrollIndicator={false}>
        <View className='mt-4 flex-row'>
          <Text className='flex-1 font-app-medium text-body1'>${Number(minPrice)}</Text>
          <Text className='flex-1 text-right font-app-medium text-body1'>${Number(maxPrice)}</Text>
        </View>

        {/* RangerSlider */}
        <View className='relative w-full'>
          <View className='absolute bottom-0 h-[2px] w-full bg-giratina-200' />
          <RnRangeSlider
            className='h-[28px] w-full'
            min={min_price}
            max={max_price}
            low={minPrice}
            high={maxPrice}
            step={1}
            renderThumb={() => <View className='h-4 w-8 rounded bg-charizard-400' />}
            renderRail={() => <View className='h-[2px] w-full bg-giratina-200' />}
            renderRailSelected={() => <View className='h-[2px] w-full bg-charizard-400' />}
            renderLabel={(value) => <Text>${value}</Text>}
            onValueChanged={(low, high) => {
              updateMin(low)
              updateMax(high)
            }}
          />
        </View>

        {/* ListItem */}
        {/* <View className='mt-4 w-full flex-1'>
        {filterData.map((item, index) => (
          <Category
            key={index}
            left={item?.name || ''}
            right={getSelected(item?.selected || [])}
            action={() =>
              navigation.navigate('FilterOption', {
                name: item?.name || '',
                selected: item?.selected || []
              })
            }
          />
        ))}
      </View> */}
        <View className='mt-4 w-full flex-1'>
          {filterData?.map((item, index) => (
            <View key={index}>
              <Cell textClassName='font-app-medium' noPadding disabled text={item?.name.toUpperCase()} />
              {item?.selected.map((item2, index2: number) => (
                <Category
                  key={index2}
                  left={item2.name}
                  right={item2.selected}
                  action={() => toggleFilter(index, index2)}
                />
              ))}
              {index !== filterData.length - 1 && <View className='w-full border-t border-giratina-300' />}
            </View>
          ))}
        </View>
      </ScrollView>
      <Button
        label={`Show ${product?.results.length || 0} items`}
        onPress={() => {
          navigation.goBack()
          if (product) setFilteredProducts(product)
        }}
      />
    </CustomSafeAreaView>
  )
}

export default Filter
