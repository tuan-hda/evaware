import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppBar, Button, CustomSafeAreaView, Select } from '~/components/common'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { AddAddressProp, UserNavigationProp } from '~/components/navigation/UserNav'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProvinceProps } from '~/types/province.type'
import { getDistrictService, getWardService, listProvinceService } from '~/services/province'
import LoadingScreen from '~/components/common/LoadingScreen'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { addAddressService, deleteAddressService, updateAddressService } from '~/services/address'
import { AddressProps } from '~/types/address.type'
import useAlertExit from '~/hooks/useAlertExit'

const validationSchema = yup.object({
  phone: yup
    .string()
    .required('This is required')
    .test('phone-number', 'Must be phone number', function (value) {
      if (value !== undefined && value && !yup.number().isValidSync(value)) {
        return this.createError()
      }
      return true
    }),
  full_name: yup.string().required('This is required'),
  email: yup.string().email().required('This is required'),
  street: yup.string().required('This is required')
})

interface FormValues {
  phone: string
  email: string
  full_name: string
  street: string
}

interface ProvinceAddressProps {
  province?: ProvinceProps
  district?: ProvinceProps
  ward?: ProvinceProps
}

const AddAddressScreen = ({ route }: AddAddressProp) => {
  const [address, setAddress] = useState<ProvinceAddressProps>({})
  const { address: oldAddress, isEdit } = route.params
  const [isLoading, setLoading] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    setAddress({
      province: {
        code: oldAddress?.province_code as number,
        name: oldAddress?.province as string
      },
      district: {
        code: oldAddress?.district_code as number,
        name: oldAddress?.district as string
      },
      ward: {
        code: oldAddress?.ward_code as number,
        name: oldAddress?.ward as string
      }
    })
    reset(oldAddress)
  }, [oldAddress, reset])

  const changeAddress = (type: string) => (value: ProvinceProps) => {
    setAddress((prev) => ({
      ...prev,
      [type]: value
    }))
    if (type === 'province') {
      setAddress((prev) => ({
        ...prev,
        district: undefined,
        ward: undefined
      }))
    }
    if (type === 'district') {
      setAddress((prev) => ({
        ...prev,
        ward: undefined
      }))
    }
  }

  const navigation = useNavigation<UserNavigationProp>()

  const openChooseAddress = (type: 'province' | 'district' | 'ward') => async () => {
    let data
    let addresses
    if (type === 'province') {
      setLoading(true)
      data = await listProvinceService()

      setLoading(false)
      if (data && !isError(data)) {
        addresses = data
      }
    } else if (type === 'district') {
      if (!address.province) {
        return
      }
      setLoading(true)
      data = await getDistrictService(address.province?.code)
      setLoading(false)
      if (data && !isError(data)) {
        addresses = data.districts
      }
    } else {
      if (!address.district) {
        return
      }
      setLoading(true)
      data = await getWardService(address.district?.code)
      setLoading(false)
      if (data && !isError(data)) {
        addresses = data.wards
      }
    }

    navigation.navigate('ChooseAddress', {
      type,
      setAddress: changeAddress(type),
      data: addresses,
      address: address[type]
    })
  }

  const { createAlert } = useAlertExit(deleteAddress, undefined, 'Delete address?')

  const translateToApiAddress = (
    address: ProvinceAddressProps,
    formData: FormValues
  ): Omit<AddressProps, 'id' | 'created_at' | 'updated_at'> | undefined => {
    if (!address.province?.code || !address.district?.code || !address.ward?.code) {
      Toast.show({
        type: 'error',
        text1: 'Must fill province, district, ward'
      })
      return
    }
    return {
      district: address.district?.name,
      district_code: address.district?.code,
      email: formData.email,
      full_name: formData.full_name,
      phone: formData.phone,
      province: address.province.name,
      province_code: address.province.code,
      street: formData.street,
      ward: address.ward.name,
      ward_code: address.ward.code
    }
  }

  const save: SubmitHandler<FormValues> = async (formData) => {
    const addressData = translateToApiAddress(address, formData)
    if (!addressData) {
      return
    }
    if (!isEdit) {
      try {
        await addAddressService(addressData)
        navigation.goBack()
      } catch (error) {
        console.log(JSON.stringify(error))
      }
    } else {
      const res = await updateAddressService({
        ...addressData,
        id: oldAddress?.id || -1
      })
      if (!isError(res)) {
        navigation.goBack()
      }
    }
  }

  async function deleteAddress() {
    const res = await deleteAddressService(oldAddress?.id || -1)
    if (isError(res)) {
      return
    }
    navigation.goBack()
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <AppBar title={isEdit ? 'Edit address' : 'Add address'} />
      <ScrollView className='px-4'>
        <View className='h-16 justify-center'>
          <Text className='font-app-semibold text-heading2 text-black'>contact info</Text>
        </View>

        <TextFieldWithLabel
          error={errors.full_name?.message}
          hasClearBtn
          placeholder='Your name'
          label='Full name'
          name='full_name'
          control={control}
          containerClassName='mt-2'
          onClear={() => setValue('full_name', '')}
        />
        <TextFieldWithLabel
          error={errors.phone?.message}
          hasClearBtn
          placeholder='0123 456 789'
          label='Phone'
          name='phone'
          control={control}
          containerClassName='mt-4'
          onClear={() => setValue('phone', '')}
        />
        <TextFieldWithLabel
          error={errors.email?.message}
          hasClearBtn
          placeholder='example@gmail.com'
          label='Email'
          name='email'
          control={control}
          containerClassName='mt-4'
          onClear={() => setValue('email', '')}
        />

        <View className='mt-4 h-16 justify-center'>
          <Text className='font-app-semibold text-heading2 text-black'>address info</Text>
        </View>

        <Select
          onPress={openChooseAddress('province')}
          text={address.province?.name || 'Choose province'}
          subtext='Province'
        />
        <Select
          onPress={openChooseAddress('district')}
          text={address.district?.name || 'Choose district'}
          subtext='District'
        />
        <Select onPress={openChooseAddress('ward')} text={address.ward?.name || 'Choose ward'} subtext='Ward' />

        <TextFieldWithLabel
          name='street'
          error={errors.street?.message}
          control={control}
          hasClearBtn
          placeholder='2 Le Duan'
          label='Street'
          onClear={() => setValue('street', '')}
          containerClassName='mt-4'
        />

        <View className='h-6' />
        <Button onPress={handleSubmit(save)} label='Save address' />
        <View className='h-4' />
        {isEdit && <Button onPress={() => createAlert()} label='Delete address' isDanger type='text' />}

        <View className='h-4' />
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default AddAddressScreen
