import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Facebook, Google, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationProp } from '~/components/navigation/AuthNav'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import { auth } from 'firebaseConfig'
import Toast from 'react-native-toast-message'
import { signUpService } from '~/services/auth'
import { isError, toastSignUpError } from '~/utils/callAxios'

const validationSchema = yup.object({
  email: yup.string().required('Required').email('Invalid email'),
  password: yup.string().required('Required').min(8, 'At least 8 characters'),
  confirmPassword: yup.string().test('confirm-pwd', 'Passwords must match', function (value) {
    return this.parent.password === value
  })
})

type FormValues = {
  email: string
  password: string
  confirmPassword: string
}

const SignupScreen = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) })
  const [secure, setSecure] = useState([true, true])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await signUpService(data.email, data.password)
    if (!isError(response)) {
      Toast.show({
        type: 'success',
        text1: 'Signed up successfully',
        text2: 'Please sign in'
      })
      navigation.navigate('Login')
      reset()
    } else {
      toastSignUpError(response)
    }
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
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Sign up</Text>
        <TextFieldWithLabel
          label={'Email'}
          error={errors.email?.message}
          containerClassName='mt-[34px]'
          control={control}
          name='email'
          placeholder='example@gmail.com'
        />
        <TextFieldWithLabel
          error={errors.password?.message}
          label={'Create a password'}
          containerClassName='mt-[26px]'
          secureTextEntry={secure[0]}
          control={control}
          name='password'
          onRightIconPress={() => setSecure([!secure[0], secure[1]])}
          placeholder='must be 8 characters'
          rightIcon={!secure[0] ? <Eye /> : <UnEye />}
        />
        <TextFieldWithLabel
          error={errors.confirmPassword?.message}
          label={'Confirm password'}
          onRightIconPress={() => setSecure([secure[0], !secure[1]])}
          secureTextEntry={secure[1]}
          name='confirmPassword'
          control={control}
          containerClassName='mt-[22px] mb-[38px]'
          placeholder='repeat password'
          rightIcon={!secure[1] ? <Eye /> : <UnEye />}
        />

        <Button onPress={handleSubmit(onSubmit)} label={'Create account'} />
        <View className='flex-1' />
        {/* Already have an account? Log in */}
        <View className='mb-12 mt-4 flex-row justify-center'>
          <Text className='font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Already have an account?{' '}
          </Text>
          <Text className='font-app-semibold text-sm' onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default SignupScreen
