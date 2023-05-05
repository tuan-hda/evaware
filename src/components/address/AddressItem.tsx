import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AddressItemProps } from '~/types/address.type'
import { Check, Pin } from 'assets/icon'

type Props = AddressItemProps & {
  selected?: number
  setSelected?: (value: number) => void
  index?: number
  isPlain?: boolean
}

const AddressItem = ({ selected, setSelected, index, isPlain, ...item }: Props) => {
  return (
    <TouchableOpacity
      disabled={isPlain}
      onPress={() => setSelected && index !== undefined && setSelected(index)}
      className='flex-row items-center px-4 py-[9.5]'
    >
      <Pin />
      <View className='ml-4 flex-1'>
        <Text className='font-app text-body1'>
          {item.province}, {item.district}, {item.ward}, {item.street}
        </Text>
        <Text className='font-app text-body2 text-giratina-500'>
          {item.name}, {item.phone}
        </Text>
      </View>

      {!isPlain && (
        <View>
          {index === selected ? (
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
