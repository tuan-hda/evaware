import { View, Text } from 'react-native'
import React from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { AppBar, CustomSafeAreaView, SmallCard } from '~/components/common'
import { Pressable } from 'react-native'
import { Car, Pin } from 'assets/icon'

const sample = {
  orderID: 23124,
  date: 'Yesterday, 10:00 am',
  state: 'Waiting for payment',
  price: 420.5,
  products: [
    {
      image: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    },
    {
      image:
        'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg',
      desc: 'Wooden bedside table featuring a raised design',
      price: 150.0
    }
  ]
}

const OrderScreen = () => {
  const { date, state, price, orderID, products } = sample
  return (
    <CustomSafeAreaView>
      <AppBar title={'Order #' + orderID} />
      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header  1*/}
        <View className='w-full py-4'>
          <Text className='w-full font-app-semibold text-heading2'>{date}</Text>
          <Text className='mt-2 font-app-light text-body2 text-giratina-500'>{state}</Text>
        </View>

        {/* Producrt */}
        <FlatList
          className='w-full py-4'
          ItemSeparatorComponent={() => <View className='h-6' />}
          data={products}
          renderItem={({ item }) => <SmallCard price={item.price} desc={item.desc} image={item.image} />}
          scrollEnabled={false}
        />
        {/* Heading 2 */}
        <Text className='mb-4 mt-6 w-full font-app-semibold text-heading2'>delivery info</Text>

        {/* Delivery */}
        <Pressable className='h-16 w-full flex-row items-center'>
          <Car />
          <Text className='ml-4 font-app-light text-body1'>By courier</Text>
        </Pressable>

        {/* Address */}
        <Pressable className='mb-2 h-16 w-full flex-row items-center'>
          <Pin />
          <View>
            <Text className='ml-4 font-app-light text-body1'>London, 221B Baker Street</Text>
            <Text className='ml-4 font-app-light text-body2 text-giratina-500'>Hanna Gouse, +7 932 123-43-23</Text>
          </View>
        </Pressable>

        {/* Total */}
        <View className='w-full flex-row py-4'>
          <View className='flex-1'>
            <Text className='mb-1 font-app-semibold text-heading2'>total</Text>
            <Text className='font-app-light text-body1 text-giratina-500'>Promocode</Text>
          </View>

          <View>
            <Text className='mb-1 text-right font-app-semibold text-heading2'>$420.50</Text>
            <Text className='text-right font-app-light text-body1 text-giratina-500'>−$25.00</Text>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderScreen
