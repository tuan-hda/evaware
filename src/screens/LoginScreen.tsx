import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, RadioButton } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Facebook, Google, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import type { AuthNavigationProp } from '~/components/navigation/AuthNav'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import Toast from 'react-native-toast-message'
import getAuthErrorMsg from '~/utils/getAuthErrorMsg'
import { signInFb } from '~/utils/thirdPartyAuth'
import auth from '@react-native-firebase/auth'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const navigation = useNavigation<AuthNavigationProp>()
  const [setUser] = useUserStore((state) => [state.setUser], shallow)

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
    })
  }, [setUser])

  const login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setUser(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        Toast.show({
          type: 'error',
          text1: 'Login failed',
          text2: getAuthErrorMsg(errorMessage)
        })
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <CustomSafeAreaView className='items-center px-5'>
      {/* Header */}
      <View className='flex-row items-center'>
        <Pressable>
          <ArrowLeft />
        </Pressable>
        <View className='flex-1' />
        <Star8 />
      </View>

      <ScrollView className='w-full' showsVerticalScrollIndicator={false}>
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Log in</Text>

        {/* Email address */}
        <TextFieldWithLabel
          onChangeText={(text) => setEmail(text)}
          label={'Email address'}
          containerClassName='mt-[34px]'
          placeholder='example@gmail.com'
        />

        {/* Password */}
        <TextFieldWithLabel
          onRightIconPress={() => setShowPwd((prev) => !prev)}
          onChangeText={(text) => setPassword(text)}
          label={'Password'}
          containerClassName='mt-[26px] mb-[15px]'
          placeholder='Enter password'
          rightIcon={<UnEye />}
          secureTextEntry={!showPwd}
        />

        {/* Forgot password? */}
        <Text className='mb-[38px] w-full text-right font-app-light text-sm'>Forgot password?</Text>

        <Button onPress={login} label={'Log in'} />

        {/* Login with other 3 party  */}
        <View className='mb-[22px] mt-[38px] flex-row items-center'>
          <View className='h-0 flex-1 border-t border-[#D8DADC]' />
          <Text className='mx-[10px] font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Or Login with
          </Text>
          <View className='h-0 flex-1 border-t border-[#D8DADC]' />
        </View>
        <View className='flex-row items-center'>
          <Pressable
            // onPress={() => signInFb(auth, setUser)}
            className='rounded-[10px] border border-[#D8DADC] px-[44px] py-[18px]'
          >
            <Facebook />
          </Pressable>

          <View className='flex-1' />

          <Pressable className='rounded-[10px] border border-[#D8DADC] px-[44px] py-[18px]'>
            <Google />
          </Pressable>

          <View className='flex-1' />

          <Pressable className='rounded-[10px] border border-[#D8DADC] px-[44px] py-[18px]'>
            <Apple />
          </Pressable>
        </View>

        {/* Don’t have an account? Sign up */}
        <View className='mb-12 mt-[52px] flex-row justify-center'>
          <Text className='font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Don't have an account?
          </Text>
          <Text className='font-app-semibold text-sm' onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default LoginScreen
function AuthNavigationProp() {
  throw new Error('Function not implemented.')
}
