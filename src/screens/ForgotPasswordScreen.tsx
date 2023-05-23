import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationProp } from '~/components/navigation/AuthNav'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from 'firebaseConfig'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import toastConfig from 'config/toast'

const validationSchema = yup.object({
  email: yup.string().required('Required').email('Invalid email')
})

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const navigation = useNavigation<AuthNavigationProp>()

  const resetPassword = () => {
    validationSchema
      .validate({ email })
      .then((value) => {
        setError('')
        sendPasswordResetEmail(auth, value.email).then(() => {
          Toast.show({
            type: 'success',
            text1: 'Email sent',
            text2: 'Check your email to reset password.'
          })
        })
      })
      .catch((e) => {
        setError(e.errors[0])
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
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Forgot password?</Text>
        <Text className='mt-2 font-app text-body1'>
          Don’t worry! It happens. Please enter the email associated with your account.
        </Text>
        <TextFieldWithLabel
          error={error}
          value={email}
          onChangeText={(text) => setEmail(text)}
          label={'Email'}
          containerClassName='mt-[34px] mb-8'
          name='email'
          placeholder='example@gmail.com'
        />

        <Button onPress={resetPassword} label='Send email' />

        <View className='flex-1' />

        {/* Already have an account? Log in */}
        <View className='mb-12 mt-4 flex-row justify-center'>
          <Text className='font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Remember password?{' '}
          </Text>
          <Text className='font-app-semibold text-sm' onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ForgotPasswordScreen
