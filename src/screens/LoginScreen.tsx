import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView, RadioButton } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Facebook, Google, Star8, UnEye } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'

const LoginScreen = () => {
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
          label={'Email address'}
          containerClassName='mt-[34px]'
          placeholder='example@gmail.com'
          TextfieldClassName='bg-white border border-[#D8DADC]'
          rightIcon={<RadioButton checked={true} black width={20} height={20} />}
        />

        {/* Password */}
        <TextFieldWithLabel
          label={'Password'}
          containerClassName='mt-[26px] mb-[15px]'
          placeholder='Enter password'
          rightIcon={<UnEye />}
          TextfieldClassName='bg-white border border-[#D8DADC]'
          secureTextEntry={true}
        />

        {/* Forgot password? */}
        <Text className='mb-[38px] w-full text-right font-app-light text-sm'>Forgot password?</Text>

        <Button label={'Log in'} />

        {/* Login with other 3 party  */}
        <View className='mb-[22px] mt-[38px] flex-row items-center'>
          <View className='h-0 flex-1 border-t border-[#D8DADC]' />
          <Text className='mx-[10px] font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Or Login with
          </Text>
          <View className='h-0 flex-1 border-t border-[#D8DADC]' />
        </View>
        <View className='flex-row items-center'>
          <Pressable className='rounded-[10px] border border-[#D8DADC] px-[44px] py-[18px]'>
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
            Don’t have an account?
          </Text>
          <Text className='font-app-semibold text-sm'>Sign up</Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default LoginScreen
