import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView } from '~/components/common'
import { Pressable } from 'react-native'
import { Apple, ArrowLeft, Eye, Facebook, Google, Star8 } from 'assets/icon'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'

const SignupScreen = () => {
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
        <Text className='mt-[54px] w-full text-heading1 font-bold'>Sign up</Text>
        <TextFieldWithLabel
          label={'Email'}
          containerClassName='mt-[34px]'
          placeholder='example@gmail.com'
          TextfieldClassName='bg-white border border-[#D8DADC]'
        />
        <TextFieldWithLabel
          label={'Create a password'}
          containerClassName='mt-[26px]'
          placeholder='must be 8 characters'
          rightIcon={<Eye />}
          TextfieldClassName='bg-white border border-[#D8DADC]'
        />
        <TextFieldWithLabel
          label={'Confirm password'}
          containerClassName='mt-[22px] mb-[38px]'
          placeholder='repeat password'
          rightIcon={<Eye />}
          TextfieldClassName='bg-white border border-[#D8DADC]'
        />

        <Button label={'Create account'} />

        {/* Register with other 3 party  */}
        <View className='mb-[22px] mt-[38px] flex-row items-center'>
          <View className='h-0 flex-1 border-t border-[#D8DADC]' />
          <Text className='mx-[10px] font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Or Register with
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

        {/* Already have an account? Log in */}
        <View className='mb-12 mt-[52px] flex-row justify-center'>
          <Text className='font-app-light text-sm' style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
            Already have an account?{' '}
          </Text>
          <Text className='font-app-semibold text-sm'>Log in</Text>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default SignupScreen
