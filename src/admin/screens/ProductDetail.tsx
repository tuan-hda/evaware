import { View, Text, ViewProps, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import Variation from '../components/product/Variation'
import AddRectangle from '../components/product/AddRectangle'
import Modal from 'react-native-modal'
import { ProductNavigationProp } from '../nav/ProductNav'
import { AddPayment } from '~/components/payment'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AddVariation } from '../components/product'

type Props = ViewProps

const ProductDetail = ({ ...props }: Props) => {
  const navigation = useNavigation<ProductNavigationProp>()
  const ref = useRef<BottomSheetModal>(null)
  useShowNav(navigation, false)
  const [show, setShow] = useState(false)

  const toggle = () => setShow((prev) => !prev)

  const onConfirm = () => {
    toggle()
    navigation.goBack()
  }

  const present = () => {
    ref.current?.present()
  }

  const close = () => {
    ref.current?.close()
  }

  return (
    <BottomSheetModalProvider>
      <CustomSafeAreaView>
        <AppBar title='ORDER102' />
        <AddVariation close={close} ref={ref} />

        <Modal isVisible={show} onBackdropPress={toggle}>
          <View className='max-w-[320] rounded-lg bg-white px-4 pb-6 pt-8'>
            <Text className='text-center font-app-semibold text-heading2 text-black'>delete product?</Text>
            <Text className='mt-1 text-center font-app text-body1 text-giratina-500'>
              This action only hide product (not actually delete it)
            </Text>
            <View className='h-6' />
            <Button onPress={toggle} label='No' />
            <View className='h-2' />
            <Button onPress={onConfirm} type='secondary' label='Yep, I confirm' />
          </View>
        </Modal>

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
          <View className={classNames('w-full px-4')}>
            <TextFieldWithLabel label='Title' />
            <View className='mt-2' />
            <TextFieldWithLabel TextfieldClassName='h-[128]' label='Description' multiline />

            <View className='mt-2 flex-row '>
              <View>
                <Text className='mb-1 font-app text-body1 text-black'>Thumbnail</Text>
                <AddRectangle size='big' title='Add image' />
              </View>
              <View className='ml-4 flex-1'>
                <TextFieldWithLabel
                  keyboardType='number-pad'
                  label='Price'
                  className='w-full'
                  containerClassName='mb-2'
                />
                <TextFieldWithLabel keyboardType='number-pad' label='Discount percent' className='w-full' />
              </View>
            </View>

            <View className='mt-4 flex-row justify-between'>
              <Text className='font-app-medium text-body1'>Variation</Text>
              <Text className='font-app text-body1 text-black/60'>6 variations - 25 qoh</Text>
            </View>

            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className='mt-2'>
              <Variation />
              <View className='w-4' />
              <Variation />
              <View className='w-4' />
              <Variation />
              <View className='w-4' />
              <Variation />
              <View className='w-4' />
              <AddRectangle onPress={present} title='Add variation' />
            </ScrollView>
          </View>

          <View className='mt-8 p-4'>
            <Button label='Save product' />
            <View className='h-4' />
            <TouchableOpacity onPress={toggle} className='my-4 w-full items-center'>
              <Text className=' text-center font-app-medium text-body1 text-magikarp-400'>Delete product</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default ProductDetail
