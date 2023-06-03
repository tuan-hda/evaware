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
import { auth } from 'firebaseConfig'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const navigation = useNavigation<AuthNavigationProp>()
  const [setUser] = useUserStore((state) => [state.setUser], shallow)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      }
    })
  }, [setUser])

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
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
        <Pressable onPress={() => navigation.canGoBack() && navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
        <View className='flex-1' />
        <Star8 />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='w-full' showsVerticalScrollIndicator={false}>
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
          rightIcon={!showPwd ? <UnEye /> : <Eye />}
          secureTextEntry={!showPwd}
        />

        {/* Forgot password? */}
        <Text
          className='mb-[38px] w-full text-right font-app-light text-sm'
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Forgot password?
        </Text>

        <Button onPress={login} label={'Log in'} />
        <View className='mb-4 mt-8 flex-row justify-center'>
          <Text className='font-app-regular text-body1' onPress={() => navigation.navigate('PhoneLogin')}>
            or login with phone number
          </Text>
        </View>
        <View className='flex-1' />

        {/* Don’t have an account? Sign up */}
        <View className='mb-12 mt-4 flex-row justify-center'>
          <Text className='font-app-light text-sm mr-1' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
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
