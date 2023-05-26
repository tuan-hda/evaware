import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import classNames from 'classnames'
import Button from './Button'
import CheckCircle from './CheckCircle'

type Props = {
  show: boolean
  toggle: () => void
  items: {
    value: string
    className?: string
    action: () => void
  }[]
  selected?: string
  title: string
}

const SelectModal = ({ title, selected = '', show, toggle, items }: Props) => {
  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white p-4'>
          <Text className='mb-6 mt-4 h-[58] w-full text-left font-app-semibold text-heading1 text-black'>
            {title.toLowerCase()}
          </Text>
          {items.map((item, index) => (
            <View className='w-full border-giratina-200' key={index}>
              <TouchableOpacity
                onPress={() => {
                  item.action()
                  toggle()
                }}
                className='h-[64] flex-row justify-between'
                key={index}
              >
                <Text className={classNames('font-app text-body1', item.className)}>{item.value}</Text>
                {selected.toLowerCase() === item.value.toLowerCase() && <CheckCircle />}
              </TouchableOpacity>
            </View>
          ))}
          <Button onPress={toggle} type='secondary' label='Cancel' />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default SelectModal
