import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { Button, TextFieldWithLabel } from '~/components/common'
import Octicons from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { VoucherProps } from '~/types/voucher.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addVoucherService, deleteVoucherService, updateVoucherService } from '~/services/voucher'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

type Props = {
  show: boolean
  toggle: () => void
  data?: VoucherProps
}
const validationSchema = yup.object({
  code: yup.string().required('This is required'),
  inventory: yup.number().required('This is required'),
  discount: yup.number().required('This is required'),
  from_date: yup.string().required('This is required'),
  to_date: yup.string().required('This is required')
})
const AddPromotion = ({ show, toggle, data }: Props) => {
  const [date, setDate] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())
  const [type, setType] = useState<'start' | 'end'>('start')
  const [showDP, setShowDP] = useState(false)
  const isEdit = data != null

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<VoucherProps>({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (data) {
      reset(data)
      setValue('code', String(data.code))
      setValue('inventory', String(data.inventory))
      setValue('discount', String(data.discount))
      setValue('from_date', String(data.from_date))
      setValue('to_date', String(data.to_date))
    } else {
      reset(data)
      setValue('code', String(''))
      setValue('inventory', String(''))
      setValue('discount', String(''))
      setValue('from_date', String(''))
      setValue('to_date', String(''))
    }
  }, [data, reset, setValue])
  const createVoucher = async (data: VoucherProps) => {
    const res = await addVoucherService(data)
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Add voucher successfully!'
      })
      toggle()
    }
  }

  const updateVoucher = async (data: VoucherProps) => {
    const res = await updateVoucherService(data)
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Update voucher successfully!'
      })
      toggle()
    }
  }

  const deleteVoucher = async (id: number) => {
    const res = await deleteVoucherService(id)
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Delete voucher successfully!'
      })
      toggle()
    } else {
      Toast.show({
        type: 'error',
        text1: res.error.data.detail
      })
    }
  }

  const getUTCTime = (date: Date) => date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  const onSubmit: SubmitHandler<VoucherProps> = (data) => {
    if (isEdit) {
      updateVoucher(data)
    } else createVoucher(data)
  }

  const toggleStart = () => {
    setShowDP((prev) => !prev)
    setType('start')
  }

  const toggleEnd = () => {
    setShowDP((prev) => !prev)
    setType('end')
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = getUTCTime(selectedDate)
    setShowDP(false)
    if (type === 'start') {
      setValue('from_date', currentDate)
    } else {
      setValue('to_date', currentDate)
    }
  }

  const onDelete = () => {
    if (isEdit) {
      deleteVoucher(data.id)
    }
  }

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      {showDP && (
        <DateTimePicker
          testID='dateTimePicker'
          value={type === 'start' ? date : dateEnd}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white p-4'>
          <Text className='mb-6 mt-4 h-[58] w-full text-left font-app-semibold text-heading1 text-black'>
            add promotion
          </Text>
          <TextFieldWithLabel label='Code' name='code' control={control} error={errors.code?.message} />
          <View className='mt-4 flex-row'>
            <View className='flex-1'>
              <TextFieldWithLabel
                label='Inventory'
                name='inventory'
                control={control}
                error={errors.inventory?.message}
              />
            </View>
            <View className='w-4' />
            <View className='relative flex-1'>
              <TouchableOpacity className='absolute right-0 z-10 mr-2'>
                <Octicons name='arrow-switch' size={20} />
              </TouchableOpacity>
              <TextFieldWithLabel
                label='Percent'
                keyboardType='number-pad'
                name='discount'
                control={control}
                error={errors.discount?.message}
              />
            </View>
          </View>
          <View className='mt-4 flex-row'>
            <View className='flex-1'>
              <Pressable onPress={toggleStart}>
                <TextFieldWithLabel
                  disabled
                  label='Start date'
                  name='from_date'
                  control={control}
                  error={errors.from_date?.message}
                />
              </Pressable>
            </View>
            <View className='w-4' />
            <View className='flex-1'>
              <Pressable onPress={toggleEnd}>
                <TextFieldWithLabel
                  disabled
                  label='End date'
                  name='to_date'
                  control={control}
                  error={errors.to_date?.message}
                />
              </Pressable>
            </View>
          </View>
          <View className='h-10' />
          <Button onPress={handleSubmit(onSubmit)} label='Save' />
          <View className='h-4' />
          <Button onPress={onDelete} type='secondary' isDanger={isEdit} label={isEdit ? 'Delete' : 'Cancel'} />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default AddPromotion
