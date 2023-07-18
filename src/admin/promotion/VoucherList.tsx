import React from 'react'
import { FlatList } from 'react-native'
import { VoucherProps } from '~/types/voucher.type'
import PromotionItem from './PromotionItem'

type Props = {
  vouchers: VoucherProps[] | null | undefined
  checkSelected: (item?: VoucherProps) => void
}

const VoucherList = (props: Props) => {
  return (
    <FlatList
      className='flex-1'
      data={props.vouchers}
      renderItem={({ item }) => {
        if (item.owner === null) return <PromotionItem data={item} onPress={() => props.checkSelected(item)} />
        return null
      }}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default VoucherList
