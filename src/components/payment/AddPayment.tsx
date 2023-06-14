import { TouchableOpacity, View, ScrollView, Text } from 'react-native'
import React, { Ref, forwardRef, memo, useEffect } from 'react'
import { Card, Close, Mastercard } from 'assets/icon'
import { Button, Title, TextFieldWithLabel } from '~/components/common'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as yup from 'yup'
import moment from 'moment'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createPaymentMethodService, getPaymentMethods, updatePaymentMethodService } from '~/services/payment'
import { isError } from '~/utils/callAxios'
import { useNavigation } from '@react-navigation/native'
import { PaymentMethodProps } from '~/types/payment.type'
import { useQuery } from '@tanstack/react-query'

type Props = {
  close: () => void
  data?: PaymentMethodProps
  isEdit?: boolean
}

const Backdrop = () => <View className='h-full w-full bg-black/50' />

const validationSchema = yup.object({
  number: yup
    .string()
    .required('This is required')
    .length(16, 'Invalid card number')
    .test('Invalid', 'Card must be number', (value) => {
      return yup.number().isValidSync(value)
    }),
  name: yup.string().required('This is required'),
  cvc: yup.number().required('This is required'),
  exp: yup
    .string()
    .required('This is required')
    .test('exp', 'Invalid date', (value) => {
      const currDate = moment.utc()
      const date = moment.utc(value, 'MM/YY').add(1, 'month').subtract(1, 'millisecond')
      if (!date.isValid()) {
        return false
      } else {
        if (date.isBefore(currDate)) {
          return false
        }
        return true
      }
    })
})

type FormValues = {
  number: string
  name: string
  cvc: number
  exp: string
}

const AddPayment = forwardRef(({ close, data, isEdit }: Props, ref: Ref<BottomSheetModal>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<FormValues>({ resolver: yupResolver(validationSchema) })

  const { refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: getPaymentMethods
  })

  function convertToAxios(exp: string) {
    return moment.utc(exp, 'MM/YY').add(1, 'month').subtract(1, 'millisecond').format('YYYY-MM-DD')
  }

  function convertToLocal(exp: string) {
    return moment.utc(exp, 'YYYY-MM-DD').format('MM/YY')
  }

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const modifiedExp = convertToAxios(formData.exp)
    let res
    if (isEdit && data?.id) {
      res = await updatePaymentMethodService(data.id, {
        ...formData,
        exp: modifiedExp,
        provider: 2
      })
    } else {
      res = await createPaymentMethodService({
        ...formData,
        exp: modifiedExp,
        provider: 2
      })
    }
    if (!isError(res)) {
      reset()
      refetch()
      close()
    }
  }

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        exp: data?.exp ? convertToLocal(data.exp) : ''
      })
    }
  }, [data, reset])

  return (
    <BottomSheetModal onDismiss={close} backdropComponent={Backdrop} snapPoints={['90%']} ref={ref}>
      <ScrollView className='h-full rounded-t-3xl bg-white px-4'>
        <TouchableOpacity onPress={close} className='mt-3'>
          <Close />
        </TouchableOpacity>
        <Title isBig title={isEdit ? 'edit payment' : 'new payment'} className='mt-4 px-0' />

        <TextFieldWithLabel
          maxLength={16}
          icon={<Card />}
          rightIcon={<Mastercard />}
          control={control}
          name='number'
          error={errors.number?.message}
          placeholder='1234 5678 9101 1121'
          label='Card number'
        />

        <View className='mt-4 flex-row'>
          <View className='flex-1'>
            <TextFieldWithLabel
              control={control}
              name='exp'
              error={errors.exp?.message}
              placeholder='02/26'
              label='Expiry date'
            />
          </View>
          <View className='w-[15]' />
          <View className='flex-1'>
            <TextFieldWithLabel
              control={control}
              name='cvc'
              error={errors.cvc?.message}
              maxLength={4}
              secureTextEntry
              placeholder='***'
              label='CVC/CVV'
            />
          </View>
        </View>

        <View className='mt-4'>
          <TextFieldWithLabel
            control={control}
            name='name'
            error={errors.name?.message}
            placeholder='Anya Taylor'
            label='Name'
          />
        </View>

        <View className='mt-6'>
          <Button onPress={handleSubmit(onSubmit)} label='Save card' />
        </View>
      </ScrollView>
    </BottomSheetModal>
  )
})

export default memo(AddPayment)
