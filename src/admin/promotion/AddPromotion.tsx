import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Button, TextFieldWithLabel } from '~/components/common'
import Octicons from 'react-native-vector-icons/Octicons'
import DateTimePicker from '@react-native-community/datetimepicker'

type Props = {
  show: boolean
  toggle: () => void
}

const cons = new Date()

const AddPromotion = ({ show, toggle }: Props) => {
  const [date, setDate] = useState(new Date(cons.getTime()))
  const [dateEnd, setDateEnd] = useState(new Date())
  const [type, setType] = useState<'start' | 'end'>('start')
  const [showDP, setShowDP] = useState(false)

  const toggleStart = () => {
    setShowDP((prev) => !prev)
    setType('start')
  }

  const toggleEnd = () => {
    setShowDP((prev) => !prev)
    setType('end')
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate
    setShowDP(false)
    if (type === 'start') {
      setDate(currentDate)
    } else {
      setDateEnd(currentDate)
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
          <View className='flex-row'>
            <View className='flex-1'>
              <TextFieldWithLabel label='Code' />
            </View>
            <View className='w-4' />
            <View className='relative flex-1'>
              <TouchableOpacity className='absolute right-0 z-10 mr-2'>
                <Octicons name='arrow-switch' size={20} />
              </TouchableOpacity>
              <TextFieldWithLabel label='Percent' keyboardType='number-pad' />
            </View>
          </View>
          <View className='mt-4 flex-row'>
            <View className='flex-1'>
              <Pressable onPress={toggleStart}>
                <TextFieldWithLabel disabled label='Start date' />
              </Pressable>
            </View>
            <View className='w-4' />
            <View className='flex-1'>
              <Pressable onPress={toggleEnd}>
                <TextFieldWithLabel disabled label='End date' />
              </Pressable>
            </View>
          </View>
          <View className='h-10' />
          <Button onPress={toggle} label='Save' />
          <View className='h-4' />
          <Button onPress={toggle} type='secondary' label='Cancel' />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default AddPromotion
