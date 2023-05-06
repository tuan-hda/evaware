import { View, Text, FlatList, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { Button, CustomSafeAreaView, ProductCardBig, SwipeSlider } from '~/components/common'
import { ChevronRight, Sale } from 'assets/icon'

const youMightlike = [
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  },
  {
    imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
    price: 149.99,
    isFavorited: true,
    desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
    badge: 'new'
  }
]
const imageSlider = [
  'https://cdn.pixabay.com/photo/2016/09/01/19/53/pocket-watch-1637396_960_720.jpg',
  'https://cdn.pixabay.com/photo/2020/04/19/21/25/field-5065671_960_720.jpg',
  'https://cdn.pixabay.com/photo/2016/11/22/04/19/snow-1848346_960_720.png'
]

const ProductScreen = () => {
  return (
    <ScrollView className='flex-1 bg-white' showsVerticalScrollIndicator={false}>
      {/* Slider */}
      <SwipeSlider images={imageSlider} className='h-[458px]' />

      <View className='bg-giratina-100'>
        {/* Price and desc */}
        <View className='px-4 py-6'>
          <Text className='mb-2 font-app-semibold text-heading2'>$150.00</Text>
          <Text className='font-app-light text-body1 text-giratina-500'>
            Wooden bedside table featuring a raised design on the door
          </Text>
        </View>

        <View className='mx-4 flex-row'>
          <Pressable className='h-9 flex-row items-center rounded-lg border border-giratina-300 bg-white px-4'>
            <View className='mr-2 h-[18px] w-[18px] rounded-full border border-giratina-200 bg-[#A56506]' />
            <Text className='font-app-medium text-body2'>Brown</Text>
          </Pressable>
        </View>

        <View className='px-4 py-6'>
          <Button label={'Add to bag'} hasBagIcon={true} />
        </View>
      </View>

      <Pressable className='m-4 flex-row items-center justify-center rounded-lg bg-giratina-100 px-4'>
        <Sale />
        <View className='mx-4 h-16 flex-1 justify-center'>
          <Text className='font-app-light text-body1'>Discount for you</Text>
          <Text className='font-app-light text-body2 text-giratina-500'>Use promocode ULMO</Text>
        </View>
        <Button label={'Copy'} size='small' />
      </Pressable>

      <Pressable className='h-16 flex-row px-4 py-5'>
        <Text className='mr-4 flex-1 font-app-light text-body1'>Product information</Text>
        <ChevronRight />
      </Pressable>
      <Pressable className='h-16 flex-row px-4 py-5'>
        <Text className='mr-4 flex-1 font-app-light text-body1'>Reviews</Text>
        <Text className='text-right font-app-light text-body1 text-giratina-500'>32</Text>
      </Pressable>
      <Pressable className='h-16 flex-row px-4 py-5'>
        <Text className='mr-4 flex-1 font-app-light text-body1'>Questions and answers</Text>
        <Text className='text-right font-app-light text-body1 text-giratina-500'>5</Text>
      </Pressable>

      <Text className='p-4 font-app-semibold text-heading2'>you might also like</Text>
      <FlatList
        data={youMightlike}
        horizontal={true}
        renderItem={({ item }) => <ProductCardBig data={item} style={{ paddingRight: 15 }} />}
        className='m-4'
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  )
}

export default ProductScreen
