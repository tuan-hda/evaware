import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import { FlatList } from 'react-native-gesture-handler'
import { Order } from '~/components/common'
// options={{
//     headerShown: true,
//     tabBarIcon: ({ focused }) => <Evaware fill={focused ? '#000000' : '#9e9e9e'} />,
//     header: () => <Bars headerLeft='return' title='My orders' />
//   }}
const DATA = [
  {
    orderID: 23124,
    date: 'Yesterday, 10:00 am',
    state: 'Waiting for payment',
    price: 420.5,
    products: [
      'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg'
    ]
  },
  {
    orderID: 23124,
    date: 'Yesterday, 10:00 am',
    state: 'Waiting for payment',
    price: 420.5,
    products: [
      'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg'
    ]
  },
  {
    orderID: 23124,
    date: 'Yesterday, 10:00 am',
    state: 'Waiting for payment',
    price: 420.5,
    products: [
      'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg'
    ]
  },
  {
    orderID: 23124,
    date: 'Yesterday, 10:00 am',
    state: 'Waiting for payment',
    price: 420.5,
    products: [
      'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg'
    ]
  }
]

const MyOrdersScreen = ({ data = DATA }) => {
  return (
    <View className='flex-1 items-center bg-white px-4 pt-2'>
      <SearchBar />
      {/* Sort and filter */}
      <View className='mb-2 mt-4 flex-row'>
        <Pressable
          className='mr-[15px] flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Sort')}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
        <Pressable
          className='flex-1 flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Filter')}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Filter</Text>
          <Filter />
        </Pressable>
      </View>

      {/* FlatList */}
      <FlatList
        className='w-full'
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <Order
            date={item.date}
            state={item.state}
            price={item.price}
            orderID={item.orderID}
            products={item.products}
          />
        )}
      />
    </View>
  )
}

export default MyOrdersScreen
