import { View, Text } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Logo } from 'assets/icon'
import { AuthNavigationProp } from '~/components/navigation/AuthNav'
import { useNavigation } from '@react-navigation/native'

const OpeningScreen = () => {
  const navigation = useNavigation<AuthNavigationProp>()

  return (
    <CustomSafeAreaView className='bg-white'>
      <View className='flex-1 justify-evenly'>
        <View className='items-center justify-center'>
          <Logo />
        </View>

        <View className='mb-4 items-center px-5'>
          <Text className='font-app-semibold text-heading1'>Explore the app</Text>
          <Text className='mt-[11] text-body1 text-black/70'>Build your dream house</Text>
        </View>
      </View>

      <View className='px-5 pb-5'>
        <Button label='Sign In' onPress={() => navigation.navigate('Login')} />
        <Button
          className='mt-[14] border border-[#747474]'
          type='outline'
          label='Create account'
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </CustomSafeAreaView>
  )
}

export default OpeningScreen
