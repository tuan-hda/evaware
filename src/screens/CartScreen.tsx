import React from 'react'
import { CustomSafeAreaView } from '~/components/common'
import EmptyBag from '~/components/bag/EmptyBag'
import Bag from '~/components/bag/Bag'
import { BagItemProps } from '~/types/bagItem.type'

const CartScreen = () => {
  const bagItems: BagItemProps[] = [
    {
      id: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: '1af',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    },
    {
      id: 'av1',
      createdAt: new Date(),
      updatedAt: new Date(),
      price: 150,
      desc: 'Wooden bedside table featuring a raised design',
      img: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s',
      qty: 3,
      variation: 'Long blue'
    }
  ]
  const bagCount = bagItems.length

  return (
    <CustomSafeAreaView className='flex-1 bg-white'>
      {bagCount === 0 ? <EmptyBag /> : <Bag bagItems={bagItems} />}
    </CustomSafeAreaView>
  )
}

export default CartScreen
