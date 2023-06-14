import { View, Text, FlatList, ScrollView, Pressable, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, ProductCardBig, SnackBar, SwipeSlider } from '~/components/common'
import { ChevronRight, Sale } from 'assets/icon'
import { HomeNavigationProp, ProductProp } from '~/components/navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'
import Bars from '~/components/navigation/Bars'
import ModalProductInfo from '~/components/modal/ModalProductInfo'
import VariationList from '~/components/product/VariationList'
import { addToCartService, getCartItemsService } from '~/services/cart'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { addFavoriteService, deleteFavoriteService, getProductDetailService } from '~/services/product'
import { useQuery } from '@tanstack/react-query'
import LoadingScreen from '~/components/common/LoadingScreen'
import useShowNav from '~/hooks/useShowNav'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

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

const WIDTH = Dimensions.get('window').width

const ProductScreen = ({ route }: ProductProp) => {
  const navigation = useNavigation<HomeNavigationProp>()
  const [productInfoVisible, setProductInfoVisible] = useState(false)
  const [isFaver, setIsFaver] = useState(false)
  const [currVar, setCurrVar] = useState(0)
  const id = route.params.id
  const {
    refetch: productRefetch,
    isLoading,
    data
  } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: async () => getProductDetailService(id)
  })
  useRefetchOnFocus(productRefetch)
  const response = data?.data
  useShowNav(navigation, false)

  useEffect(() => {
    if (response?.is_favorited) {
      setIsFaver(response.is_favorited)
    }
  }, [response?.is_favorited])

  const images = response?.variations && response.variations[currVar]?.img_urls

  const toggle = () => setProductInfoVisible((prev) => !prev)

  const { refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })

  async function addToBag() {
    if (response?.variations[0]?.id) {
      const res = await addToCartService(id, response?.variations[0]?.id)
      if (isError(res)) {
        let text2 = 'Some error happened'

        if (res.error.data[0].toLowerCase().includes('insufficient inventory')) {
          text2 = 'Insufficient inventory'
        }

        Toast.show({
          type: 'error',
          text1: 'Added to cart failed',
          text2
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Added to bag successfully'
        })
        refetch()
      }
    }
  }

  const toggleFavorite = async () => {
    if (!response?.id) return null
    if (isFaver) {
      await deleteFavoriteService(response.id)
      setIsFaver(false)
    } else {
      await addFavoriteService(response.id)
      setIsFaver(true)
    }
  }

  return (
    <ScrollView className='relative mt-6 flex-1 bg-white' showsVerticalScrollIndicator={false}>
      <LoadingScreen show={isLoading} />
      <ModalProductInfo
        data={response}
        visible={productInfoVisible}
        setVisible={setProductInfoVisible}
        toggle={toggle}
      />

      {/* Slider */}
      {images ? (
        <SwipeSlider currVar={currVar} images={images} className='h-[458px]' />
      ) : (
        <View className='h-16 bg-giratina-100' />
      )}
      <Bars
        headerLeft='return'
        headerRight='heart'
        isHeart={isFaver}
        backgroundColor='transparent'
        style={{ position: 'absolute' }}
        className='px-4 pt-2'
        onLeftButtonPress={() => navigation.goBack()}
        onRightButtonPress={toggleFavorite}
      />

      <View className='bg-giratina-100'>
        <Text className='ml-4  flex-1 pb-2 pt-4 font-app-semibold text-heading2' numberOfLines={1}>
          {response?.name}
        </Text>

        {/* Price and desc */}
        <View className='px-4 pb-6'>
          <View className='flex-row items-baseline'>
            <Text className='mb-2 font-app-semibold text-heading2'>${Number(response?.price)}</Text>
            {response?.price !== 0 && (
              <Text className='ml-2 font-app-medium text-body2 text-giratina-500 line-through'>
                ${(response?.price || 0) * (1 - (response?.discount || 0) / 100)}
              </Text>
            )}
          </View>
          <Text className='font-app-light text-body1 text-giratina-500'>{response?.desc}</Text>
        </View>

        <VariationList selected={currVar} setSelected={setCurrVar} data={response} />

        <View className='px-4 py-6'>
          <Button onPress={addToBag} label={'Add to bag'} hasBagIcon={true} />
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

      <Pressable className='h-16 flex-row px-4 py-5' onPress={() => setProductInfoVisible(true)}>
        <Text className='mr-4 flex-1 font-app-light text-body1'>Product information</Text>
        <ChevronRight />
      </Pressable>
      <Pressable
        className='h-16 flex-row px-4 py-5'
        onPress={() =>
          navigation.navigate('Reviews', {
            id: response?.id || 0
          })
        }
      >
        <Text className='mr-4 flex-1 font-app-light text-body1'>Reviews</Text>
        <Text className='text-right font-app-light text-body1 text-giratina-500'>{response?.reviews_count}</Text>
      </Pressable>

      <Text className='p-4 font-app-semibold text-heading2'>you might also like</Text>
      {/* <FlatList
        data={youMightlike}
        horizontal={true}
        renderItem={({ item }) => (
          <ProductCardBig
            data={{ ...item, id: -1 }}
            style={{ marginRight: 15, width: (WIDTH - 32 - 15) / 2, aspectRatio: 0.62 }}
            onPress={() => navigation.navigate('Product', { id: 0 })}
          />
        )}
        className='m-4 h-[310px]'
        showsHorizontalScrollIndicator={false}
      /> */}
    </ScrollView>
  )
}

export default ProductScreen
