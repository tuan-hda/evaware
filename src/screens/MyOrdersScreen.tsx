import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { CustomSafeAreaView, SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import { FlatList } from 'react-native-gesture-handler'
import { Order } from '~/components/common'
import Bars from '~/components/navigation/Bars'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import { useNavigation } from '@react-navigation/native'
import ModalSort from '~/components/modal/ModalSort'
import { useQuery } from '@tanstack/react-query'
import { getAltCurrentUserProfileService } from '~/services/user'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { OrderProps } from '~/types/order.type'
import { OrderItemProps } from '~/components/common/Order'
import moment from 'moment'
import useShowNav from '~/hooks/useShowNav'
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

const MyOrdersScreen = () => {
  const navigation = useNavigation<UserNavigationProp>()

  const { data: temp, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getAltCurrentUserProfileService
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)
  useShowNav(navigation, true)

  const translateOrder = (order: OrderProps): OrderItemProps => {
    return {
      ...order,
      date: moment(order.created_at).format('YYYY-MM-DD HH:mm'),
      orderID: order.id,
      price: Number(order.total),
      products: order.order_details.map((item) => item.variation.img_urls[0]),
      state: order.status
    }
  }

  const [sortedOrder, setSortedOrder] = useState<OrderProps[]>([])
  const [currentSort, setCurrentSort] = useState('')

  const applySort = useCallback(
    (currentOrder: string) => {
      setCurrentSort(currentOrder)
      let newData: OrderProps[] | undefined
      switch (currentOrder) {
        case 'Old first':
          newData = data?.orders?.sort((a, b) => (a.created_at > b.updated_at ? 1 : -1))
          break
        case 'Total: low to high':
          newData = data?.orders?.sort((a, b) => -a.total + b.total)
          break
        case 'Total: high to low': {
          newData = data?.orders?.sort((a, b) => a.total - b.total)
          break
        }
        case 'Status': {
          newData = data?.orders?.sort((a, b) => (a.status > b.status ? -1 : 1))
          break
        }
        default:
          newData = data?.orders?.sort((a, b) => (a.created_at < b.updated_at ? 1 : -1))
          break
      }
      if (newData) setSortedOrder(newData)
    },
    [data?.orders]
  )

  useEffect(() => {
    applySort(currentSort)
  }, [currentSort, applySort])

  const [sortVisible, setSortVisible] = useState(false)
  const toggle = () => setSortVisible((prev) => !prev)
  const fields = [
    {
      name: 'New first'
    },
    {
      name: 'Old first'
    },
    {
      name: 'Total: low to high'
    },
    {
      name: 'Total: high to low'
    },
    {
      name: 'Status'
    }
  ]

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4 pt-2'>
      <ModalSort
        applySort={applySort}
        fields={fields}
        visible={sortVisible}
        setVisible={setSortVisible}
        toggle={toggle}
      />
      <Bars
        headerLeft='return'
        title='My orders'
        onLeftButtonPress={() => navigation.navigate('UserScreen')}
        className='mb-2'
      />
      {/* Sort and filter */}
      <View className='mb-2 flex-row'>
        <Pressable
          className='flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => setSortVisible(true)}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
      </View>

      {/* FlatList */}
      <FlatList
        className='w-full'
        showsVerticalScrollIndicator={false}
        data={sortedOrder}
        renderItem={({ item }) => (
          <Order
            {...translateOrder(item)}
            onPress={() =>
              navigation.navigate('OrderScreen', {
                order: item
              })
            }
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default MyOrdersScreen
