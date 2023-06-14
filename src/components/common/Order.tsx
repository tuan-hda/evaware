import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import classNames from 'classnames'

export interface OrderItemProps {
  date: string
  state: string
  price: number
  orderID: number
  products: string[]
  onPress?: () => void
}

const Order = ({ date, state, price, orderID, products, onPress }: OrderItemProps) => {
  return (
    <Pressable className='py-4' onPress={onPress}>
      {/* Date and price  */}
      <View className='mb-[2px] w-full flex-row'>
        <Text className='mr-2 flex-1 font-app-regular text-body1'>{date}</Text>
        <Text className='font-app-medium text-body1'>${price}</Text>
      </View>
      {/* State and ID  */}
      <View className='mb-4 w-full flex-row'>
        <Text
          className={classNames('mr-2 flex-1 font-app-light text-body2', {
            'text-venusaur-500': state === 'Success',
            'text-charizard-500': state === 'In progress',
            'text-gengar-500': state === 'Delivering',
            'text-magikarp-400': state === 'Cancelled'
          })}
        >
          {state}
        </Text>
        <Text className='font-app-light text-body2 text-giratina-500'>#{orderID}</Text>
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            style={{ width: 60, height: 73 }}
            resizeMode='cover'
            source={{ uri: item }}
            className='mr-4 rounded-md'
          />
        )}
      />
    </Pressable>
  )
}

export default Order
