import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Slider } from '~/components/Slider'
import { Button } from '~/components/common'
import ProductInfo from '~/components/Sort/ProductInfo'

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View className='flex-1 items-center justify-center px-4'>
      <Slider />
      <View className='h-5' />
      <Button
        label={'Test'}
        onPress={() => {
          setModalVisible(true)
        }}
      />
      <ProductInfo visible={modalVisible} setVisible={setModalVisible} />
    </View>
  )
}

export default HomeScreen
