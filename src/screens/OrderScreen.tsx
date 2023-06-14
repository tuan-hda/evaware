import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { AppBar, CustomSafeAreaView, SmallCard } from '~/components/common'
import { Pressable } from 'react-native'
import { Car, Pin } from 'assets/icon'
import Bars from '~/components/navigation/Bars'
import { useNavigation } from '@react-navigation/native'
import { OrderProp, UserNavigationProp } from '~/components/navigation/UserNav'
import moment from 'moment'
import classNames from 'classnames'
import ChooseVariationModal from '~/components/product/ChooseVariationModal'
import { OrderDetailProps } from '~/types/order.type'
import { addToCartService } from '~/services/cart'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

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

const OrderScreen = ({ route }: OrderProp) => {
  const navigation = useNavigation<UserNavigationProp>()
  const { order } = route.params
  const [currentSaved, setCurrentSaved] = useState<OrderDetailProps>()
  const [visible, setVisible] = useState(false)

  const show = (orderDetail: OrderDetailProps) => {
    setCurrentSaved(orderDetail)
    setVisible(true)
  }

  const hide = () => setVisible(false)

  const subtotal = order.order_details.reduce((prev, curr) => {
    return prev + curr.product.price * (1 - curr.product.discount / 100) * curr.qty
  }, 0)

  const discountAmount = ((order?.voucher?.discount || 0) / 100) * subtotal

  return (
    <CustomSafeAreaView className='flex-1 px-4'>
      <Bars headerLeft='return' onLeftButtonPress={() => navigation.goBack()} title={'Order #' + order.id} />
      <ChooseVariationModal data={currentSaved ? currentSaved.product.variations : []} show={visible} toggle={hide} />
      <ScrollView
        className='flex-1 bg-white'
        contentContainerStyle={{ alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header  1*/}
        <View className='w-full pb-8 pt-4'>
          <Text className='w-full font-app-semibold text-heading2'>
            {moment(order.created_at).format('YYYY-MM-DD HH:mm')}
          </Text>
          <Text
            className={classNames('mr-2 flex-1 font-app-light text-body2', {
              'text-venusaur-500': order.status === 'Success',
              'text-charizard-500': order.status === 'In progress',
              'text-gengar-500': order.status === 'Delivering',
              'text-magikarp-400': order.status === 'Cancelled'
            })}
          >
            {order.status}
          </Text>
        </View>

        {/* Producrt */}
        {order.order_details.map((item, index) => (
          <View key={index} className='mb-6 w-full'>
            <SmallCard
              moveToBag={() => show(item)}
              variation={item.variation.name}
              price={item.price}
              desc={item.product.desc}
              image={item.variation.img_urls[0]}
              onPress={() =>
                navigation.navigate('Product', {
                  id: item.product.id
                })
              }
            />
          </View>
        ))}

        {/* Heading 2 */}
        <Text className='my-4 w-full font-app-semibold text-heading2'>delivery info</Text>

        {/* Delivery */}
        <Pressable className='h-16 w-full flex-row items-center'>
          <Car />
          <Text className='ml-4 font-app-light text-body1'>By courier</Text>
        </Pressable>

        {/* Address */}
        <Pressable className='mb-2 h-16 flex-row items-center'>
          <Pin />
          <View className='min-w-0 flex-1 flex-shrink pl-4'>
            <Text className='font-app-light text-body1'>
              {order.province}, {order.district}, {order.ward}, {order.street}
            </Text>
            <Text className='font-app-light text-body2 text-giratina-500'>
              {order.full_name}, {order.phone}
            </Text>
          </View>
        </Pressable>

        {/* Total */}
        <View className='w-full flex-row py-4'>
          <View className='flex-1'>
            <Text className='mb-1 font-app-semibold text-heading2'>total</Text>
            <Text className='font-app-light text-body1 text-giratina-500'>Subtotal</Text>
            {order.voucher && (
              <Text className='font-app-light text-body1 text-giratina-500'>
                Promocode {'(' + order.voucher.code + ')'}
              </Text>
            )}
            <Text className='font-app-light text-body1 text-giratina-500'>Delivery fee</Text>
          </View>

          <View>
            <Text className='mb-1 text-right font-app-semibold text-heading2'>${Number(order.total)}</Text>
            <Text className='text-right font-app-light text-body1 text-giratina-500'>${subtotal}</Text>
            {order.voucher && (
              <Text className='text-right font-app-light text-body1 text-giratina-500'>-${discountAmount}</Text>
            )}
            <Text className='text-right font-app-light text-body1 text-giratina-500'>$10</Text>
          </View>
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default OrderScreen
