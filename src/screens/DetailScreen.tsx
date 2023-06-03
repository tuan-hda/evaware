import { View, Text, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import Bars from '~/components/navigation/Bars'
import { CustomSafeAreaView } from '~/components/common'
import { useNavigation } from '@react-navigation/native'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import * as ImagePicker from 'expo-image-picker'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'

const DetailScreen = () => {
  const navigation = useNavigation<UserNavigationProp>()

  const [user] = useUserStore((state) => [state.user], shallow)

  const [avt, setAvt] = useState('https://cdn-icons-png.flaticon.com/512/1946/1946429.png')
  const [name, setName] = useState(user?.displayName || '')
  const [phone, setPhone] = useState(user?.phoneNumber || '')
  const [mail, setMail] = useState(user?.email || '')
  const [dateOfBirth, setdateOfBirth] = useState('')

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })

    if (!result.canceled) {
      setAvt(result.assets[0].uri)
    }
  }

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4'>
      <Bars
        headerLeft='return'
        title='My details'
        headerRight='action'
        label='Save'
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={() => navigation.goBack()}
        className='mb-2'
      />

      <Pressable className='items-center py-4' onPress={pickImage}>
        <Image
          className='h-14 w-14'
          resizeMode='cover'
          source={{
            uri: avt
          }}
        />
        <Text className='mt-2 py-[7.5px] font-app-medium text-body2'>Change photo</Text>
      </Pressable>

      {/* text field */}

      {/* Full name */}
      <TextFieldWithLabel
        value={name}
        onChangeText={(text) => setName(text)}
        label='Full name'
        containerClassName='mt-2'
        placeholder='enter your name'
      />

      {/* Phone */}
      <TextFieldWithLabel
        value={phone}
        onChangeText={(text) => setPhone(text)}
        label='Phone'
        keyboardType='numeric'
        containerClassName='mt-4'
        placeholder='enter your phone number'
      />

      {/* Email */}
      <TextFieldWithLabel
        value={mail}
        onChangeText={(text) => setMail(text)}
        label='Email'
        keyboardType='email-address'
        containerClassName='mt-4'
        placeholder='enter your email'
      />

      {/* Date of birth */}
      <TextFieldWithLabel
        value={dateOfBirth}
        onChangeText={(text) => setdateOfBirth(text)}
        label='Date of birth'
        containerClassName='mt-4'
      />
    </CustomSafeAreaView>
  )
}

export default DetailScreen
