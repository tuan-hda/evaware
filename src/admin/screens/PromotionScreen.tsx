import { View, Text, ScrollView, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'
import PromotionItem from '../promotion/PromotionItem'
import AddPromotion from '../promotion/AddPromotion'
import useVoucherData from '~/hooks/useVoucherData'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { VoucherProps } from '~/types/voucher.type'
import Tab from '~/components/tab/Tab'
import VoucherList from '../promotion/VoucherList'
import RecommendList from '../promotion/RecommendList'

const PromotionScreen = () => {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState<VoucherProps>()
  const toggleShow = () => setShow((prev) => !prev)

  const checkSelected = (item?: VoucherProps) => {
    setSelected(item)
    toggleShow()
  }

  const { response: vouchers, fetch } = useVoucherData(show)
  useRefetchOnFocus(fetch)

  const navigation = useNavigation<ProductDrawerNavigationProp>()

  return (
    <CustomSafeAreaView className='flex-1 bg-white px-4'>
      <AddPromotion show={show} toggle={toggleShow} data={selected} />
      <View className='mt-14 w-full flex-row items-center justify-between'>
        <Text className='h-[58] text-left font-app-semibold text-heading1'>promotion</Text>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <MaterialCommunityIcons name='menu-open' size={32} />
        </TouchableOpacity>
      </View>

      <VoucherList checkSelected={checkSelected} vouchers={vouchers?.results.filter((item) => !item.is_deleted)} />
      {/* <Tab
        tab1={
          <VoucherList checkSelected={checkSelected} vouchers={vouchers?.results.filter((item) => !item.is_deleted)} />
        }
        tab2={<RecommendList checkSelected={checkSelected} />}
      /> */}

      <View className='py-4'>
        <Button onPress={() => checkSelected()} label='Add promotion' />
      </View>
    </CustomSafeAreaView>
  )
}

export default PromotionScreen
