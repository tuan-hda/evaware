import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { AppBar, CustomSafeAreaView, RadioButton } from '~/components/common'
import { StackScreenProps } from '@react-navigation/stack'
import { UserNavParamList } from '~/components/navigation/UserNav'

type Props = StackScreenProps<UserNavParamList, 'ChooseAddress'>

const data = ['Quang Tri', 'Ho Chi Minh City', 'Ha Noi', 'Hai Phong', 'Soc Trang', 'Da Lat', 'Vung Tau']

const ChooseAddressScreen = ({ navigation, route }: Props) => {
  const setAddress = route.params?.setAddress

  const chooseAddress = (address: string) => () => {
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
            <Text className='font-app text-body1'> {item}</Text>
            <View className='flex-1' />
            {index === 0 && <RadioButton checked />}
          </TouchableOpacity>
        )}
      />
    </CustomSafeAreaView>
  )
}

export default ChooseAddressScreen
