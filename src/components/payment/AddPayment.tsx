import { TouchableOpacity, View, ScrollView } from 'react-native'
import React, { Ref, forwardRef, memo } from 'react'
import { Card, Close, Mastercard } from 'assets/icon'
import { Button, Title } from '../common'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import TextFieldWithLabel from '../common/TextFieldWithLabel'

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
        <Title isBig title='new payment' className='mt-4 px-0' />

        <TextFieldWithLabel
          icon={<Card />}
          rightIcon={<Mastercard />}
          placeholder='1234 5678 9101 1121'
          label='Card number'
        />

        <View className='mt-4 flex-row'>
          <View className='flex-1'>
            <TextFieldWithLabel placeholder='02/26' label='Expiry date' />
          </View>
          <View className='w-[15]' />
          <View className='flex-1'>
            <TextFieldWithLabel maxLength={4} secureTextEntry label='CVC/CVV' />
          </View>
        </View>

        <View className='mt-4'>
          <TextFieldWithLabel placeholder='Anya Taylor' label='Name' />
        </View>

        <View className='mt-6'>
          <Button label='Save card' />
        </View>
      </ScrollView>
    </BottomSheetModal>
  )
})

export default memo(AddPayment)
