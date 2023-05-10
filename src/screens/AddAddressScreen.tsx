import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { AppBar, Button, CustomSafeAreaView, Select } from '~/components/common'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { UserNavigationProp } from '~/components/navigation/UserNav'

const AddAddressScreen = () => {
  const [address, setAddress] = useState({
    province: 'Quang Tri',
    district: 'Trieu Phong',
    ward: 'Ai Tu'
  })

  const changeAddress = (type: string) => (value: string) => {
    setAddress({
      ...address,
      [type]: value
    })
  }

  const navigation = useNavigation<UserNavigationProp>()

  const openChooseAddress = (type: string) => () => {
    navigation.navigate('ChooseAddress', {
      type,
      setAddress: changeAddress(type)
    })
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <AppBar title='Address book' />
      <ScrollView className='px-4'>
        <View className='h-16 justify-center'>
          <Text className='font-app-semibold text-heading2 text-black'>contact info</Text>
        </View>

        <TextFieldWithLabel hasClearBtn placeholder='Your name' label='Full name' containerClassName='mt-2' />
        <TextFieldWithLabel hasClearBtn placeholder='0123 456 789' label='Phone' containerClassName='mt-4' />
        <TextFieldWithLabel disabled placeholder='example@gmail.com' label='Email' containerClassName='mt-4' />

        <View className='mt-4 h-16 justify-center'>
          <Text className='font-app-semibold text-heading2 text-black'>address info</Text>
        </View>

        <Select onPress={openChooseAddress('province')} text={address.province} subtext='Province' />
        <Select onPress={openChooseAddress('district')} text={address.district} subtext='District' />
        <Select onPress={openChooseAddress('ward')} text={address.ward} subtext='Ward' />

        <TextFieldWithLabel hasClearBtn placeholder='2 Le Duan' label='Street' containerClassName='mt-4' />

        <View className='h-6' />
        <Button label='Save address' />
        <View className='h-4' />
        <Button label='Delete address' isDanger type='text' />

        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default AddAddressScreen
