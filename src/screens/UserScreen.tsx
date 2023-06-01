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
const UserScreen = () => {
  const [show, setShow] = useState(false)
  const navigation = useNavigation<UserNavigationProp>()
  const [logOut] = useUserStore((state) => [state.logOut], shallow)

  const toggle = () => setShow((prev) => !prev)

  const logout = () => {
    toggle()
    signOut(auth).then(() => {
      logOut()
    })
  }

  return (
    <CustomSafeAreaView>
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
              uri: 'https://bizweb.dktcdn.net/100/411/628/products/0c397e47a610f901872d4a8830e7431c.jpg?v=1635488019853'
            }}
            className='h-9 w-9 rounded-full'
          />
        </View>
        <View className='ml-4'>
          <Text className='font-app-medium text-body1 text-black'>Dua Lipa</Text>
          <Text className='font-app text-body2 text-giratina-500'>0123 456 789</Text>
        </View>
      </View>

      <Cell
        text='My Orders'
        rightText='14'
        onPress={() => navigation.navigate('MyOrders')}
        icon={<Bag fill='#000' width={24} height={24} />}
      />
      <Cell
        text='My Details'
        onPress={() => navigation.navigate('MyDetails')}
        icon={<User fill='#000' width={24} height={24} />}
      />
      <Cell
        text='Address Book'
        onPress={() => navigation.navigate('Address')}
        icon={<Pin fill='#000' width={24} height={24} />}
      />
      <Cell
        onPress={() => navigation.navigate('PaymentMethod')}
        text='Payment Methods'
        icon={<Card fill='#000' width={24} height={24} />}
      />
      <Cell text='Sign Out' icon={<SignOut fill='#000' width={24} height={24} />} onPress={toggle} />
    </CustomSafeAreaView>
  )
}

export default UserScreen
