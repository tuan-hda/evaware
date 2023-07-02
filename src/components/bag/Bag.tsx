import { View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BagItemProps, CartItemProps } from '~/types/bagItem.type'
import BagFooter from './BagFooter'
import BagItem from './BagItem'
import useBagStore from '~/store/bag'
import { shallow } from 'zustand/shallow'
import { BagNavigationProp } from '../navigation/BagNav'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { getCartItemsService } from '~/services/cart'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { translateCartItem } from '~/utils/translateAxiosObj'

const HEIGHT = Dimensions.get('window').height

const Separator = () => <View className='h-6' />

const BagHeader = () => <Text className='mb-4 mt-14 h-[58] font-app-semibold text-heading1'>bag</Text>

const Bag = () => {
  const navigation = useNavigation<BagNavigationProp>()
  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })
  useRefetchOnFocus(refetch)
  const response = data?.data

  // useEffect(() => {
  //   refetch()
  // }, [refetch])

  return (
    <SafeAreaView className='relative flex-1' style={{ height: HEIGHT }}>
      <FlatList
        ListHeaderComponent={BagHeader}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        data={response?.results}
        className='flex-1 px-4'
        renderItem={({ item }) => (
          <BagItem
            {...translateCartItem(item)}
            img={item.variation.img_urls[0]}
            onPress={() =>
              navigation.navigate('Product', {
                id: item.product.id
              })
            }
          />
        )}
      />
      <BagFooter />
    </SafeAreaView>
  )
}

export default Bag
