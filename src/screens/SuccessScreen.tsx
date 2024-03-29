import { View, Text } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Friendly } from 'assets/icon'
import { BagNavigationProp } from '~/components/navigation/BagNav'
import { useNavigation } from '@react-navigation/native'
import { TabNavigationProps } from '~/components/navigation/Tab'

const SuccessScreen = () => {
  const navigation = useNavigation<TabNavigationProps>()

  return (
    <CustomSafeAreaView className='h-full w-full justify-between bg-charizard-300 p-4'>
      <View />

      <View className='items-center justify-between'>
        <Friendly />
        <Text className='mt-4 font-app-semibold text-heading2 text-black'>your order is placed</Text>
        <Text className='mt-1 text-center font-app text-body1 text-black'>
          thanks for your order, we hope you enjoyed shopping with us
        </Text>
      </View>

      <Button
        type='outline'
        label='To my orders'
        className='self-end'
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Bag' }]
          })
          navigation.navigate('User', {
            screen: 'MyOrders'
          })
        }}
      />
    </CustomSafeAreaView>
  )
}

export default SuccessScreen
