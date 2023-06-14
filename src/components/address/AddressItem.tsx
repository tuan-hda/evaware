import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AddressItemProps, AddressProps } from '~/types/address.type'
import { Check, Pin } from 'assets/icon'

type Props = AddressProps & {
  selected?: AddressProps
  setSelected?: (value?: AddressProps | undefined) => void
  index?: number
  isPlain?: boolean
  hideCheck?: boolean
  onPress?: () => void
}

const AddressItem = ({ onPress, selected, setSelected, hideCheck, index, isPlain, ...item }: Props) => {
  return (
    <TouchableOpacity
      disabled={isPlain}
      onPress={() => {
        if (onPress) {
          onPress()
        } else {
          setSelected && index !== undefined && setSelected(item)
        }
      }}
      className='flex-row items-center px-4 py-[9.5]'
    >
      <Pin />
      <View className='ml-4 flex-1'>
        <Text className='font-app text-body1'>
          {item.province}, {item.district}, {item.ward}, {item.street}
        </Text>
        <Text className='font-app text-body2 text-giratina-500'>
          {item.full_name}, {item.phone}
        </Text>
      </View>

      {!isPlain && !hideCheck && (
        <View>
          {item.id === selected?.id ? (
            <View className='ml-4 h-6 w-6 items-center justify-center rounded-full bg-charizard-400'>
              <Check />
            </View>
          ) : (
            <View className='ml-4 h-6 w-6 rounded-full bg-giratina-100' />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}

export default AddressItem
