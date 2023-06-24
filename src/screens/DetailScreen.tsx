import { View, Text, Pressable, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import Bars from '~/components/navigation/Bars'
import { CustomSafeAreaView } from '~/components/common'
import { useNavigation } from '@react-navigation/native'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import * as ImagePicker from 'expo-image-picker'
import { useQuery } from '@tanstack/react-query'
import { getAltCurrentUserProfileService, updateUserProfileService } from '~/services/user'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import LoadingScreen from '~/components/common/LoadingScreen'
import { uploadImage } from '~/utils/uploadImage'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ScrollView } from 'react-native-gesture-handler'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import moment from 'moment'

const expectedFormat = 'YYYY-MM-DD'

const validationSchema = yup.object({
  phone: yup
    .mixed()
    .nullable()
    .test('phone-number', 'Must be phone number', function (value) {
      if (value !== undefined && value && !yup.number().isValidSync(value)) {
        return this.createError()
      }
      return true
    }),
  full_name: yup.string().required('This is required'),
  dob: yup.string().test('Date-format', 'Invalid date format (yyyy-mm-dd)', function (value) {
    if (value) {
      const isValid = moment.utc(value, expectedFormat, true).isValid()
      if (!isValid) {
        return this.createError()
      }
      return true
    }
  }),
  email: yup.string().email()
})

type FormValues = {
  phone: string
  dob: string
  full_name: string
}

const DetailScreen = () => {
  const navigation = useNavigation<UserNavigationProp>()
  const { data: temp, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getAltCurrentUserProfileService
  })
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) })
  const data = temp?.data
  useRefetchOnFocus(refetch)

  const [avt, setAvt] = useState('https://d2xnk96i50sp3r.cloudfront.net/user_default.png')
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      reset({ ...data, dob: data.dob?.trim() })
      setAvt(data.avatar)
    }
  }, [data, reset])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })

    if (!result.canceled) {
      const res = await uploadImage(result.assets[0], setLoading)
      if (res?.url) {
        setAvt(res?.url)
      }
    }
  }

  const save: SubmitHandler<FormValues> = async (formData) => {
    if (data) {
      setLoading(true)
      const res = await updateUserProfileService(data.id, {
        avatar: avt.trim(),
        dob: formData.dob.trim(),
        phone: formData.phone.trim(),
        full_name: formData.full_name.trim()
      })
      setLoading(false)
      if (!isError(res)) {
        navigation.goBack()
      } else {
        Toast.show({
          type: 'Error',
          text1: 'Failed to save profile'
        })
      }
    }
  }

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4'>
      <ScrollView showsVerticalScrollIndicator={false} className='w-full'>
        <LoadingScreen show={isLoading} />
        <Bars
          headerLeft='return'
          title='My details'
          headerRight='action'
          label='Save'
          onLeftButtonPress={() => navigation.goBack()}
          onRightButtonPress={handleSubmit(save)}
          className='mb-2'
        />

        <Pressable className='items-center py-4' onPress={pickImage}>
          <Image
            className='h-14 w-14 rounded-full'
            resizeMode='cover'
            source={{
              uri: avt
            }}
          />
          <Text className='mt-2 py-[7.5px] font-app-medium text-body2'>Change photo</Text>
        </Pressable>

        {/* text field */}

        {/* Email */}
        <TextFieldWithLabel
          disabled
          name='email'
          control={control}
          label='Email'
          keyboardType='email-address'
          containerClassName='mt-2'
          placeholder='enter your email'
        />

        {/* Full name */}
        <TextFieldWithLabel
          name='full_name'
          error={errors.full_name?.message}
          control={control}
          label='Full name'
          containerClassName='mt-4'
          placeholder='enter your name'
        />

        {/* Phone */}
        <TextFieldWithLabel
          name='phone'
          error={errors.phone?.message}
          control={control}
          label='Phone'
          keyboardType='numeric'
          containerClassName='mt-4'
          placeholder='enter your phone number'
        />

        {/* Date of birth */}
        <TextFieldWithLabel
          name='dob'
          error={errors.dob?.message}
          control={control}
          label='Date of birth'
          containerClassName='mt-4'
          placeholder='yyyy-mm-dd'
        />
        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default DetailScreen
