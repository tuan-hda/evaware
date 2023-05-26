import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { Heart, HeartFilled } from 'assets/icon'

const DATA = {
  imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
  price: 149.99,
  isFavorited: true,
  desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
  badge: 'new'
}
interface Props {
  data?: {
    imageURL: string
    price: number
    isFavorited: boolean
    desc: string
    badge: string
  }
  style?: {}
  onPress?: () => void
}

const ProductCardBig = ({ data = DATA, style, onPress }: Props) => {
  const { price, isFavorited, desc, badge } = data
  const image = { uri: data.imageURL }
  return (
    <Pressable className='relative flex-1' style={style} onPress={onPress}>
      <Image style={{ width: '100%', borderRadius: 8, flexGrow: 1 }} className='aspect-[0.82]' source={image} />
      <View className='mb-1 mt-2 flex-row items-center'>
        <Text className='mr-2 flex-1 font-app-medium text-body1'>${price}</Text>
        {isFavorited ? <HeartFilled width={24} height={24} /> : <Heart width={24} height={24} />}
      </View>
      <Text numberOfLines={2} className='font-app-medium text-body3 text-giratina-500'>
        {desc}
      </Text>
      {badge !== 'none' && (
        <View className='absolute left-2 top-2 h-6 items-center rounded bg-charizard-400 px-2'>
          <Text className='font-app-medium text-body2'>{badge}</Text>
        </View>
      )}
    </Pressable>
  )
}

export default ProductCardBig
