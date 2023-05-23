import { View, Text } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { signOut } from 'firebase/auth'
import { auth } from 'firebaseConfig'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'

const SettingScreen = () => {
  const [logOut] = useUserStore((state) => [state.logOut], shallow)

  return (
    <CustomSafeAreaView>
      <Button label='log out' onPress={() => signOut(auth).then(logOut)} />
    </CustomSafeAreaView>
  )
}

export default SettingScreen
