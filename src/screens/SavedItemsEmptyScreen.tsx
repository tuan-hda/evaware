import { View, Text } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Surprised } from 'assets/icon'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'

const SavedItemsEmptyScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>()

  return (
    <CustomSafeAreaView className='px-4 pb-4'>
      <Text className='mt-14 font-app-semibold text-heading1'>saved items</Text>

      <View className='flex-1 items-center justify-center'>
        <Surprised />
        <Text className='mt-4 font-app-semibold text-heading2'>nothing saved...</Text>
        <Text className='mt-1 px-2 text-center font-app-light text-body1 text-giratina-500' numberOfLines={2}>
          ... no worries. Start saving as you shop by clicking the little heart
        </Text>
      </View>

      <Button label={'Start shopping'} onPress={() => navigation.navigate('HomeScreen')} />
    </CustomSafeAreaView>
  )
}

export default SavedItemsEmptyScreen
