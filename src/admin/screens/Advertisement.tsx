import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import { useNavigation } from '@react-navigation/native'
import { ProductDrawerNavigationProp } from '../nav/ProductDrawer'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as ImagePicker from 'expo-image-picker'

const Advertisement = () => {
  const bagItems = [1, 2, 3, 4, 5, 6, 7]
  const [image, setImage] = useState<string>('')

  const navigation = useNavigation<ProductDrawerNavigationProp>()

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1
        }}
      >
        <View className='mt-14 w-full  flex-row items-center justify-between'>
          <Text className='h-[58] text-left font-app-semibold text-heading1'>advertisement</Text>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <MaterialCommunityIcons name='menu-open' size={32} />
          </TouchableOpacity>
        </View>

        {bagItems.map((item, index) => (
          <View key={index} className='w-full'>
            <Image
              className='h-36 w-full rounded-2xl'
              resizeMode='cover'
              source={{
                uri: 'https://occ-0-1723-2164.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABcqEhBpKBQioP6FGVItdD6qWfp0F45hJiA6RBAQynTLD3GGY2X9nFWngAz0N51GrcKg6ZRWALU2tLRb-iYAH5SLOOQ6NhBuGfqgC.jpg?r=5dd'
              }}
            />
            {index !== bagItems.length - 1 && <View className='h-4' />}
          </View>
        ))}

        <View className='h-4 flex-1' />

        <Button onPress={pickImage} label='Add advertisement' />
        <View className='h-4 ' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default Advertisement
