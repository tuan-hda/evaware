import { TouchableOpacity, View, ScrollView, Text } from 'react-native'
import React, { Ref, forwardRef, memo } from 'react'
import { Card, Close, Mastercard } from 'assets/icon'
import { Button, Title, TextFieldWithLabel } from '~/components/common'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

type Props = {
  close: () => void
}

const Backdrop = () => <View className='h-full w-full bg-black/50' />

const AddPayment = forwardRef(({ close }: Props, ref: Ref<BottomSheetModal>) => {
  return (
    <BottomSheetModal onDismiss={close} backdropComponent={Backdrop} snapPoints={['90%']} ref={ref}>
      <ScrollView className='h-full rounded-t-3xl bg-white px-4'>
        <TouchableOpacity onPress={close} className='mt-3'>
          <Close />
        </TouchableOpacity>
        <Title isBig title='add variation' className='mt-4 px-0' />
        <TextFieldWithLabel placeholder='Sofia Sofa' label='Title' />
        <View className='h-4' />
        <TextFieldWithLabel placeholder='300' label='Price' keyboardType='number-pad' />
        <View className='mt-4'>
          <Text className='mb-1 font-app text-body1'>Image</Text>
          <View className='h-[200] w-full rounded-lg bg-giratina-100' />
        </View>

        <View className='mt-6'>
          <Button label='Save card' />
        </View>
      </ScrollView>
    </BottomSheetModal>
  )
})

export default memo(AddPayment)
