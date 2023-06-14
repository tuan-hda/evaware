import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppBar, CustomSafeAreaView, RadioButton } from '~/components/common'
import { StackScreenProps } from '@react-navigation/stack'
import { UserNavParamList } from '~/components/navigation/UserNav'
import { ProvinceProps } from '~/types/province.type'

type Props = StackScreenProps<UserNavParamList, 'ChooseAddress'>
const ChooseAddressScreen = ({ navigation, route }: Props) => {
  const setAddress = route.params?.setAddress
  const address = route.params?.address
  const data = route.params?.data

  const chooseAddress = (address: ProvinceProps) => () => {
    setAddress && setAddress(address)
    navigation.goBack()
  }

  return (
    <CustomSafeAreaView>
      <AppBar title={'Delivery ' + route.params?.type} />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity className='h-16 flex-row items-center px-4' onPress={chooseAddress(item)} key={index}>
            <Text className='font-app text-body1'> {item.name}</Text>
            <View className='flex-1' />
            {item.code === address?.code && <RadioButton checked />}
          </TouchableOpacity>
        )}
      />
    </CustomSafeAreaView>
  )
}

export default ChooseAddressScreen
