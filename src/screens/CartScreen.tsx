import React, { useEffect, useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import EmptyBag from '~/components/bag/EmptyBag'
import Bag from '~/components/bag/Bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import { useNavigation } from '@react-navigation/native'
import useBagStore from '~/store/bag'
import {shallow} from 'zustand/shallow'

const CartScreen = () => {
  const [bagList] = useBagStore((state) => [state.bagList], shallow)
  const [data, setData] = useState(bagList)

  useEffect(() => {
    setData(bagList)
  }, [bagList])

  const navigation = useNavigation()

  useShowNav(navigation, true)

  return (
    <CustomSafeAreaView className='flex-1 bg-white'>
      {data.length === 0 ? <EmptyBag /> : <Bag />}
    </CustomSafeAreaView>
  )
}

export default CartScreen
