import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Star, YellowStar } from 'assets/icon'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import Entypo from 'react-native-vector-icons/Entypo'
import SelectModal from './SelectModal'
import { useNavigation } from '@react-navigation/native'
import { HomeNavigationProp } from '../navigation/HomeNav'
import useAlertExit from '~/hooks/useAlertExit'
import { useQuery } from '@tanstack/react-query'
import { deleteReviewService, getProductDetailService } from '~/services/product'
import { ReviewProps } from '~/types/reviews.type'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
const DATA = {
  starNum: 4,
  time: 'Today, 12:30 pm',
  userAvt:
    'https://steamuserimages-a.akamaihd.net/ugc/1782857511239293956/F8D9A28DC154287629BCB9E5F599F4D2BE075D15/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false',
  userName: 'Gái nhà quê',
  content: 'Dango là nhất',
  imageReview: [
    'https://upload-os-bbs.hoyolab.com/upload/2021/09/22/107564949/4890ea57289a5fc710979c0ab9ab3544_4578436378514736626.png',
    'https://i.ytimg.com/vi/0uGYD1nus7o/maxresdefault.jpg',
    'https://i.ytimg.com/vi/Tw_LKHjKWhE/maxresdefault.jpg'
  ]
}

export interface ReviewScreenProps {
  productId?: number
  originalReview: ReviewProps
  review: {
    id: number
    starNum: number
    time: string
    userAvt: string
    userName: string
    content: string
    imageReview?: string[]
    email: string
  }
}

const Review = ({ review, productId, originalReview }: ReviewScreenProps) => {
  const navigation = useNavigation<HomeNavigationProp>()
  // return null
  const [user] = useUserStore((state) => [state.user], shallow)
  const [visible, setVisible] = useState(false)
  const { createAlert } = useAlertExit(deleteReview, undefined, 'Delete review?', "You can't undo this action")
  const { refetch } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => getProductDetailService(productId || 0)
  })

  async function deleteReview() {
    const res = await deleteReviewService(review.id)
    if (!isError(res)) {
      refetch()
    } else {
      Toast.show({
        type: 'error',
        text1: "Can't delete review"
      })
    }
  }

  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const items = [
    {
      value: 'Edit',
      action: () =>
        navigation.navigate('NewReview', {
          productId: productId || 0,
          isEdit: true,
          oldReview: originalReview
        })
    },
    {
      value: 'Delete',
      className: 'text-magikarp-400',
      action: createAlert
    }
  ]

  return (
    <View className='py-4'>
      <SelectModal show={visible} toggle={hide} title='options' items={items} />
      {/* Stars and time */}
      <View className='flex-1 flex-row'>
        {Array.from({ length: review.starNum }, (_, index) => (
          <YellowStar className='mr-1' key={index} />
        ))}
        {Array.from({ length: 5 - review.starNum }, (_, index) => (
          <Star className='mr-1' key={index} />
        ))}
        <Text className='flex-1 text-right font-app-light text-body2 text-giratina-500'>{review.time}</Text>
      </View>
      {/* user and content  */}
      <View className='my-3'>
        <View className='flex-1 flex-row items-center'>
          {review.userAvt && (
            <Image source={{ uri: review.userAvt }} className='mr-2 h-6 w-6 rounded-full' resizeMode='cover' />
          )}
          <View className='flex-1 flex-row justify-between'>
            <Text className='font-app-medium text-body1'>{review.userName}</Text>
            {review.email === user?.email && (
              <TouchableOpacity onPress={show}>
                <Entypo name='dots-three-horizontal' size={16} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className='mt-0.5 w-full flex-shrink font-app text-body1 text-giratina-500'>{review.content}</Text>
      </View>
      {/* images */}
      {review.imageReview && (
        <FlatList
          data={review.imageReview}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image className='mr-2 h-[54px] w-[54px] rounded-md' resizeMode='cover' source={{ uri: item }} />
          )}
        />
      )}
    </View>
  )
}

export default Review
