import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Cell, CustomSafeAreaView, Title } from '~/components/common'
import { Bag, Card, Pin, Setting, SignOut, User } from 'assets/icon'
import { TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import Modal from 'react-native-modal'
import { sendEmailVerification, signOut } from 'firebase/auth'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import { auth } from 'firebaseConfig'
import Toast from 'react-native-toast-message'
import { useQuery } from '@tanstack/react-query'
import { getAltCurrentUserProfileService } from '~/services/user'
import LoadingScreen from '~/components/common/LoadingScreen'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
const SettingScreen = () => {
  const [show, setShow] = useState(false)
  const navigation = useNavigation<UserNavigationProp>()
  const [logOut] = useUserStore((state) => [state.logOut], shallow)

  const {
    data: temp,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['user'],
    queryFn: getAltCurrentUserProfileService
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)
  const toggle = () => setShow((prev) => !prev)

  const logout = () => {
    toggle()
    logOut()
  }

  return (
    <CustomSafeAreaView>
      <LoadingScreen show={isLoading} />

      <Modal isVisible={show} onBackdropPress={toggle}>
        <View className='max-w-[320] rounded-lg bg-white px-4 pb-6 pt-8'>
          <Text className='text-center font-app-semibold text-heading2 text-black'>
            are you sure you want to sign out?
          </Text>
          <Text className='mt-1 text-center font-app text-body1 text-giratina-500'>We definitely don't want that</Text>
          <View className='h-6' />
          <Button onPress={toggle} label='No, I want to stay' />
          <View className='h-2' />
          <Button onPress={logout} type='secondary' label='Yep, sign out' />
        </View>
      </Modal>

      <View className='h-14 items-end justify-center px-4'>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Setting />
        </TouchableOpacity>
      </View>
      <Title isBig title='my account' />

      <View className='mt-2 h-16 flex-row items-center px-4'>
        <View className='rounded-full border border-giratina-200'>
          <Image
            source={{
              uri: data?.avatar || 'https://d2xnk96i50sp3r.cloudfront.net/user_default.png'
            }}
            className='h-9 w-9 rounded-full'
          />
        </View>
        <View className='ml-4'>
          <Text className='font-app-medium text-body1 text-black'>{data?.full_name}</Text>
          {data?.phone && <Text className='font-app text-body2 text-giratina-500'>{data?.phone}</Text>}
        </View>
      </View>

      <Cell
        text='My Details'
        onPress={() => navigation.navigate('MyDetails')}
        icon={<User fill='#000' width={24} height={24} />}
      />

      <Cell text='Sign Out' icon={<SignOut fill='#000' width={24} height={24} />} onPress={toggle} />
    </CustomSafeAreaView>
  )
}

export default SettingScreen
