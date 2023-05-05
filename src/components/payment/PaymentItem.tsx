import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { PaymentItemProps } from '~/types/payment.type'
import { Check } from 'assets/icon'

type Props = PaymentItemProps & {
  selected?: number
  setSelected?: (value: number) => void
  index?: number
  isPlain?: boolean
}

const PaymentItem = ({ selected, setSelected, index, isPlain, ...item }: Props) => {
  return (
    <TouchableOpacity
      disabled={isPlain}
      onPress={() => setSelected && index !== undefined && setSelected(index)}
      className='h-16 flex-row items-center justify-between px-4'
    >
      <Image
        className='h-6 w-6 items-center justify-center'
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          resizeMode: 'contain'
        }}
        source={{
          uri: item.img
        }}
      />

      <View className='ml-4 flex-1'>
        <Text className='font-app text-body1'>
          {item.provider} {item.number}
        </Text>
        <Text className='font-app text-body2 text-giratina-500'>{item.exp}</Text>
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

export default PaymentItem
