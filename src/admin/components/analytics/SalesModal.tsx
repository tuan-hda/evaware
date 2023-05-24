import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import classNames from 'classnames'
import { Button } from '~/components/common'

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

const SalesModal = ({ title, selected = '', show, toggle, items }: Props) => {
  return (
    <Modal isVisible={show} onBackdropPress={toggle}>
      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-lg bg-white pt-4'>
          <Text className='mb-4 w-full text-center font-app text-body2 text-black/60'>{title}</Text>
          {items.map((item, index) => (
            <View className='w-full border-b border-t border-giratina-200' key={index}>
              <TouchableOpacity onPress={item.action} className='py-4' key={index}>
                <Text
                  className={classNames(
                    'w-full text-center font-app text-body1',
                    selected === item.value && 'font-app-medium',
                    item.className
                  )}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </Pressable>

        <View className='h-4' />

        <Button onPress={toggle} type='secondary' label='Cancel' />
      </Pressable>
    </Modal>
  )
}

export default SalesModal
