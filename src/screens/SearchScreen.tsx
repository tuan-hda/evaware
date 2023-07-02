import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CustomSafeAreaView, SearchBar } from '~/components/common'
import { Clear, Clock, Dissatisfied } from 'assets/icon'
import { useDebounce } from 'use-debounce'
import { convertProduct, searchPersonalizedProductsService } from '~/services/product'
import { isError } from '~/utils/callAxios'
import { RecommendProps } from '~/types/product.type'
import FlatGrid from '~/layouts/FlatGrid'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'

const SearchScreen = () => {
  const [query, setQuery] = useState('')
  const [debounceQuery] = useDebounce(query, 500)
  const [data, setData] = useState<RecommendProps>()
  const navigation = useNavigation<HomeNavigationProp>()

  useEffect(() => {
    ;(async () => {
      const response = await searchPersonalizedProductsService(debounceQuery)
      if (isError(response)) {
        return
      } else {
        setData(response)
      }
    })()
  }, [debounceQuery])

  return (
    <CustomSafeAreaView className='relative bg-white'>
      <View className='w-full px-4 py-2'>
        <SearchBar isSearching value={query} onChangeText={(text) => setQuery(text)} />
      </View>
      <View className='h-2' />

      <View className='flex-1 px-4'>
        {data && (
          <FlatGrid
            data={data.results.map((item) => convertProduct(item))}
            numColumns={2}
            verticalGap={24}
            horizontalGap={15}
            onItemPress={(item) =>
              navigation.navigate('Product', {
                id: item.id,
                recomm_id: data.recomm_id
              })
            }
          />
        )}
      </View>

      {/* <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity className='h-16 min-w-0 flex-1 justify-center pl-4' key={index}>
            <Text className='min-w-0 font-app text-body1 text-black'>{item}</Text>
            <Text className='font-app text-body2 text-giratina-500'>living room / furniture</Text>
          </TouchableOpacity>
        )}
      /> */}
      {/* <View className='flex-1 items-center justify-center'>
        <View className='items-center'>
          <Dissatisfied />
          <Text className='max-w-[300] text-center font-app-semibold text-heading2 text-black'>
            nothing found, try something else
          </Text>
        </View>
      </View> */}
    </CustomSafeAreaView>
  )
}

export default SearchScreen
