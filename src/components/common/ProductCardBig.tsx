import { View, Text, Pressable, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Heart, HeartFilled } from 'assets/icon'
import { addFavoriteService, deleteFavoriteService } from '~/services/product'

const DATA = {
  imageURL: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture1.jpg',
  price: 149.99,
  isFavorited: true,
  desc: 'Chair made of ash wood sourced from responsib sourced from responsib sourced from responsib',
  badge: 'new',
  id: -1
}
interface Props {
  data: {
    id: number
    imageURL: string
    price: number
    isFavorited: boolean
    desc: string
    badge: string
    discount: number
    name: string
  }
  style?: {}
  onPress?: () => void
}

const ProductCardBig = ({ data, style, onPress }: Props) => {
  const [favorited, setFavorited] = useState(false)
  const { price, isFavorited, desc, badge } = data
  const image = { uri: data.imageURL }

  useEffect(() => {
    setFavorited(isFavorited)
  }, [isFavorited])

  const toggleFavorite = async () => {
    if (favorited) {
      await deleteFavoriteService(data.id)
      setFavorited(false)
    } else {
      await addFavoriteService(data.id)
      setFavorited(true)
    }
  }

  const screenWidth = (Dimensions.get('window').width - 32) / 2 - 8

  return (
    <View
      style={[
        style,
        {
          height: screenWidth / 0.82 + 80
        }
      ]}
    >
      <Pressable className='relative flex-1' onPress={onPress}>
        <Image
          style={{ width: screenWidth, height: screenWidth / 0.82, borderRadius: 8, flexGrow: 1 }}
          source={image}
        />
      </Pressable>
      <View className='mb-1 mt-2 flex-row items-center'>
        <Text className='mr-2 flex-1 font-app-medium text-body1' numberOfLines={1}>
          {data.name}
        </Text>
        <Pressable onPress={toggleFavorite}>
          {favorited ? <HeartFilled width={24} height={24} /> : <Heart width={24} height={24} />}
        </Pressable>
      </View>
      <View className='mb-1 flex-row items-center'>
        <Text className='mr-2 flex-1 font-app-medium text-body1'>${Number(price)}</Text>
        {data?.discount !== 0 && (
          <Text className='ml-2 font-app-medium text-body2 text-giratina-500 line-through'>
            ${price * (1 - (data?.discount || 0) / 100)}
          </Text>
        )}
      </View>
      <Text numberOfLines={2} className='font-app-medium text-body3 text-giratina-500'>
        {desc}
      </Text>
      {badge && (
        <View className='absolute left-2 top-2 h-6 items-center rounded bg-charizard-400 px-2'>
          <Text className='font-app-medium text-body2'>{badge}</Text>
        </View>
      )}
    </View>
  )
}

export default ProductCardBig
