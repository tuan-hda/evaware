import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'
import PromotionItem from '../promotion/PromotionItem'
import AddPromotion from '../promotion/AddPromotion'

const PromotionScreen = () => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow((prev) => !prev)
  }

  const bagItems = [1, 2, 3, 4, 5, 6, 6, 7]

  const navigation = useNavigation<ProductDrawerNavigationProp>()

  return (
    <CustomSafeAreaView>
      <AddPromotion show={show} toggle={toggleShow} />

      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          marginBottom: 16
        }}
      >
        <View className='mt-14 w-full  flex-row items-center justify-between'>
          <Text className='h-[58] text-left font-app-semibold text-heading1'>promotion</Text>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu-open' size={32} />
          </TouchableOpacity>
        </View>

        {bagItems.map((item, index) => (
          <View key={index} className='w-full'>
            <PromotionItem />
          </View>
        ))}

        <View className='h-4  flex-1' />

        <Button onPress={toggleShow} label='Add promotion' />

        <View className='h-4 ' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default PromotionScreen
