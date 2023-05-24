import { View, Text, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button, TextFieldWithLabel } from '~/components/common'

type Props = {
  show: boolean
  toggle: () => void
}

const AddCategory = ({ show, toggle }: Props) => {
  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white p-4'>
          <Text className='mb-6 mt-4 h-[58] w-full text-left font-app-semibold text-heading1 text-black'>
            add variation
          </Text>
          <TextFieldWithLabel label='Name' />
          <View className='h-10' />
          <Button onPress={toggle} label='Save' />
          <View className='h-4' />
          <Button onPress={toggle} type='secondary' label='Cancel' />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default AddCategory
