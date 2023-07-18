import { View, FlatList } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRecommendPromotionService } from '~/services/voucher'
import RecommendPromotionItem from './RecommendPromotionItem'
import { VoucherProps } from '~/types/voucher.type'

type Props = {
  checkSelected: (item?: VoucherProps) => void
}

const RecommendList = (props: Props) => {
  const { data } = useQuery({ queryKey: ['recommend-vouchers'], queryFn: getRecommendPromotionService })

  return (
    <View className='flex-1'>
      <FlatList
        data={data?.data}
        renderItem={({ item }) => <RecommendPromotionItem checkSelected={props.checkSelected} product={item} />}
      />
    </View>
  )
}

export default RecommendList
