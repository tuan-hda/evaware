import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, RadioButton } from '~/components/common'
import { Pressable } from 'react-native'
import { ArrowLeft, Eye, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import type { AuthNavigationProp } from '~/components/navigation/AuthNav'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import { loginService } from '~/services/auth'
import { isError, toastLoginError } from '~/utils/callAxios'
import * as yup from 'yup'
import { getCurrentUserProfileService } from '~/services/user'

const validationSchema = yup.object({
  email: yup.string().required('Required').email('Invalid email')
})

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const navigation = useNavigation<AuthNavigationProp>()
  const [setUser] = useUserStore((state) => [state.setUser], shallow)

  const checkEmail = async () => {
    try {
      await validationSchema.validate({ email: email })
      setError('')
      return true
    } catch (err: any) {
      setError(err.errors[0])
      return false
    }
  }

  const login = async () => {
    if (!(await checkEmail())) {
      return
    }

    const user = await loginService(email, password)
    if (user) {
      if (isError(user)) {
        toastLoginError(user)
      } else {
        setUser(user)
        const profile = await getCurrentUserProfileService()
        if (profile && !isError(profile)) {
          setUser({
            ...user,
            ...profile
          })
        }
        setEmail('')
        setPassword('')
      }
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setError('')
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
          error={error}
          onChangeText={handleEmailChange}
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
        {/* <View className='mb-4 mt-8 flex-row justify-center'>
          <Text className='font-app-regular text-body1' onPress={() => navigation.navigate('PhoneLogin')}>
            or login with phone number
          </Text>
        </View> */}
        <View className='flex-1' />

        {/* Don’t have an account? Sign up */}
        <View className='mb-12 mt-4 flex-row justify-center'>
          <Text className='mr-1 font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
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
