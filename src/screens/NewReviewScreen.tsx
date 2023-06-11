import { View, Text, Pressable, ScrollView, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, TextField, TextFieldWithLabel } from '~/components/common'
import Bars from '~/components/navigation/Bars'
import { Camera, Close, Star, YellowStar } from 'assets/icon'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { HomeNavigationProp, NewReviewProp } from '~/components/navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'
import { uploadFileService } from '~/services/other'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import mime from 'mime'
import useAlertExit from '~/hooks/useAlertExit'
import { addReviewService, getProductDetailService } from '~/services/product'
import useProductStore from '~/store/product'
import { shallow } from 'zustand/shallow'
import { useMutation, useQuery } from '@tanstack/react-query'
import { CreateReviewProps } from '~/types/reviews.type'

const NewReviewScreen = ({ route }: NewReviewProp) => {
  const { productId } = route.params
  const [starState, setStarState] = useState([
    {
      selected: true,
      status: 'Very poor'
    },
    {
      selected: true,
      status: 'Poor'
    },
    {
      selected: true,
      status: 'Fair'
    },
    {
      selected: true,
      status: 'Good'
    },
    {
      selected: true,
      status: 'Very good'
    }
  ])
  const [selectedStar, setSelectedStar] = useState(4)
  const [review, setReview] = useState('')
  const [images, setImages] = useState<string[]>([])
  const { createAlert } = useAlertExit(() => navigation.goBack())

  const navigation = useNavigation<HomeNavigationProp>()

  const handleSelectedStar = (i: number) => {
    setSelectedStar(i)
    setStarState(
      starState.map((item, index) => (index > i ? { ...item, selected: false } : { ...item, selected: true }))
    )
  }

  const { refetch } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => getProductDetailService(productId)
  })

  const createReview = async () => {
    const res = await addReviewService({
      content: review,
      img_urls: images,
      product: productId,
      variation: 1,
      rating: selectedStar + 1
    })
    if (isError(res)) {
      Toast.show({
        type: 'error',
        text1: 'Added review failed'
      })
      return
    }
    refetch().then(() => {
      navigation.goBack()
    })
  }

  const uploadImage = async (asset: ImagePicker.ImagePickerAsset) => {
    const formData = new FormData()
    const newImageUri = 'file:///' + asset.uri.split('file:/').join('')

    formData.append('file', {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split('/').pop()
    } as any)

    const res = await uploadFileService(formData)
    if (isError(res)) {
      Toast.show({
        type: 'error',
        text1: 'Uploaded image failed'
      })
      return {
        url: ''
      }
    } else {
      return res
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })

    if (!result.canceled) {
      const res = await uploadImage(result.assets[0])
      setImages([...images, res?.url || ''])
    }
  }

  const removeImage = (i: number) => {
    const newImages = images.filter((_, index) => index !== i)
    setImages(newImages)
  }

  return (
    <CustomSafeAreaView className='px-4'>
      <Bars headerLeft='close' title='New review' onLeftButtonPress={createAlert} />
      {/* stars  */}
      <View className='py-6'>
        <View className='flex-row justify-center'>
          {starState.map((item, index) => (
            <Pressable
              key={index}
              style={{ marginRight: index === starState.length - 1 ? 0 : 8 }}
              onPress={() => handleSelectedStar(index)}
            >
              {item.selected ? <YellowStar height={32} width={32} /> : <Star height={32} width={32} />}
            </Pressable>
          ))}
        </View>
        <Text className='mt-2 w-full text-center font-app-medium text-body1 text-giratina-500'>
          {starState[selectedStar].status}
        </Text>
      </View>

      <TextField
        placeholder='Your review'
        value={review}
        onChangeText={(text) => setReview(text)}
        multiline={true}
        numberOfLines={4}
        TextfieldClassName='h-40 my-2'
      />

      <ScrollView horizontal className='mb-6 mt-2 flex-none py-2' showsHorizontalScrollIndicator={false}>
        <Pressable
          className='mr-3 h-16 w-16 items-center justify-center rounded-lg bg-giratina-100'
          onPress={pickImage}
        >
          <Camera />
        </Pressable>
        {images.map((item, index) => (
          <View className='relative mr-3 h-16 w-16 rounded-lg' key={index}>
            <Image
              source={{
                uri: item
              }}
              className='h-16 w-16 rounded-lg'
              resizeMode='cover'
            />
            <BlurView intensity={28} tint='light' className='absolute right-[6px] top-[6px] '>
              <Pressable
                className='h-4 w-4 items-center justify-center rounded bg-white opacity-70'
                onPress={() => removeImage(index)}
              >
                <Close height={12} width={12} />
              </Pressable>
            </BlurView>
          </View>
        ))}
      </ScrollView>

      <Button label={'Send review'} onPress={createReview} />
    </CustomSafeAreaView>
  )
}

export default NewReviewScreen
