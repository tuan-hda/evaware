import { View, Text, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationProp, PhoneVerificationProp } from '~/components/navigation/AuthNav'
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

const PhoneVerificationScreen = ({ route }: PhoneVerificationProp) => {
  const { veriId } = route.params
  const [code, setCode] = useState('')
  const [enabled, setEnabled] = useState(false)
  const [setUser] = useUserStore((state) => [state.setUser], shallow)
  const checkCode = (val: string) => {
    return val.length === 6 && val.match(/^[0-9]*$/) ? true : false
  }
  const confirmCode = () => {
    const credential = PhoneAuthProvider.credential(veriId, code)
    signInWithCredential(auth, credential)
      .then((user) => {
        setCode('')
        setUser(user.user)
      })
      .catch((e) => Toast.show({ type: 'error', text1: 'Login failed', text2: e.message }))
  }

  const navigation = useNavigation<AuthNavigationProp>()

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
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Verification code</Text>
        <Text className='mt-2 font-app text-body1'>A code just sent to your phone. Verify it now.</Text>

        <TextFieldWithLabel
          keyboardType='number-pad'
          maxLength={6}
          autoComplete='tel'
          value={code}
          onChangeText={(text) => {
            setCode(text)
            setEnabled(checkCode(text))
          }}
          label={'Code'}
          containerClassName='mt-[34px] mb-8'
          name='code'
          placeholder='enter the code you received'
        />

        <Button disabled={!enabled} onPress={confirmCode} label='Confirm verification' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default PhoneVerificationScreen
