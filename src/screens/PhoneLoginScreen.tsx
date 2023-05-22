import { View, Text, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationProp } from '~/components/navigation/AuthNav'
import { sendPasswordResetEmail, signInWithCredential } from 'firebase/auth'
import { auth } from 'firebaseConfig'
import * as yup from 'yup'
import Toast from 'react-native-toast-message'
import { PhoneAuthProvider } from 'firebase/auth/react-native'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID } from '@env'

const config = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
}

const PhoneLoginScreen = () => {
  const [value, setValue] = useState('')
  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null)
  const [enabled, setEnabled] = useState(false)
  const navigation = useNavigation<AuthNavigationProp>()

  const sendVerification = () => {
    const phoneProvider = new PhoneAuthProvider(auth)
    if (recaptchaVerifier.current)
      phoneProvider.verifyPhoneNumber('+84' + value.slice(1), recaptchaVerifier.current).then((id) => [
        navigation.navigate('PhoneVerification', {
          veriId: id
        })
      ])
    setValue('')
  }

  const checkPhone = (val: string) => {
    return val.length === 10 && val.match(/^[0-9]*$/) ? true : false
  }

  return (
    <CustomSafeAreaView className='items-center px-5'>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={config} />

      {/* Header */}
      <View className='flex-row items-center'>
        <Pressable onPress={() => navigation.canGoBack() && navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
        <View className='flex-1' />
        <Star8 />
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='w-full' showsVerticalScrollIndicator={false}>
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Login with phone</Text>
        <TextFieldWithLabel
          maxLength={10}
          keyboardType='number-pad'
          autoComplete='tel'
          value={value}
          onChangeText={(text) => {
            setValue(text)
            setEnabled(checkPhone(text))
          }}
          label={'Phone'}
          containerClassName='mt-[34px] mb-8'
          name='phone'
          placeholder='enter your phone number'
        />

        <Button disabled={!enabled} onPress={sendVerification} label='Send code' />

        <View className='mb-12 mt-8 flex-row justify-center'>
          <Text className='font-app-regular text-body1' onPress={() => navigation.navigate('Login')}>
            or login with email
          </Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default PhoneLoginScreen
