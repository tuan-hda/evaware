import React, { useEffect, useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import EmptyBag from '~/components/bag/EmptyBag'
import Bag from '~/components/bag/Bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import { useNavigation } from '@react-navigation/native'
import useBagStore from '~/store/bag'
import { shallow } from 'zustand/shallow'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { getCartItemsService } from '~/services/cart'
import { useQuery } from '@tanstack/react-query'

const CartScreen = () => {
  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })
  useRefetchOnFocus(refetch)
  const response = data?.data

  const navigation = useNavigation()

  useShowNav(navigation, true)

  return (
    <CustomSafeAreaView className='flex-1 bg-white'>
      {response?.results.length === 0 ? <EmptyBag /> : <Bag />}
    </CustomSafeAreaView>
  )
}

export default CartScreen
