import { View, Text, Pressable, ScrollView, Image, Platform, TouchableWithoutFeedback } from 'react-native'
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
import useAlertExit from '~/hooks/useAlertExit'
import { addReviewService, getProductDetailService, updateReviewService } from '~/services/product'
import useProductStore from '~/store/product'
import ChooseVariationModal from '~/components/product/ChooseVariationModal'
import Entypo from 'react-native-vector-icons/Entypo'
import { VariationProps } from '~/types/variation.type'
import classNames from 'classnames'
import LoadingScreen from '~/components/common/LoadingScreen'
import { uploadImage } from '~/utils/uploadImage'
import { useQuery } from '@tanstack/react-query'

const NewReviewScreen = ({ route }: NewReviewProp) => {
  const { productId, isEdit, oldReview } = route.params
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
  const [visible, setVisible] = useState(false)
  const navigation = useNavigation<HomeNavigationProp>()
  const [loading, setLoading] = useState(false)

  const handleSelectedStar = (i: number) => {
    setSelectedStar(i)
    setStarState(
      starState.map((item, index) => (index > i ? { ...item, selected: false } : { ...item, selected: true }))
    )
  }

  const show = () => setVisible(true)
  const hide = () => setVisible(false)

  const { data: temp, refetch } = useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => getProductDetailService(productId)
  })
  const data = temp?.data
  const [selectedVariation, setSelectedVariation] = useState<VariationProps | undefined>()

  useEffect(() => {
    if (oldReview) {
      setImages(oldReview.img_urls)
      setSelectedStar(oldReview.rating - 1)
      setReview(oldReview.content)
      setSelectedVariation(oldReview.variation)
    }
  }, [oldReview])

  const createReview = async () => {
    if (isEdit) {
      const res = await updateReviewService({
        content: review,
        img_urls: images,
        rating: selectedStar + 1,
        id: oldReview?.id
      })
      if (isError(res)) {
        Toast.show({
          type: 'error',
          text1: 'Updated review failed'
        })
        return
      }
    } else {
      const res = await addReviewService({
        content: review,
        img_urls: images,
        product: productId,
        variation: selectedVariation?.id || 0,
        rating: selectedStar + 1
      })
      if (isError(res)) {
        Toast.show({
          type: 'error',
          text1: 'Added review failed'
        })
        return
      }
    }
    refetch().then(() => {
      navigation.goBack()
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })

    if (!result.canceled) {
      const res = await uploadImage(result.assets[0], setLoading)
      setImages([...images, res?.url || ''])
    }
  }

  const removeImage = (i: number) => {
    const newImages = images.filter((_, index) => index !== i)
    setImages(newImages)
  }

  return (
    <CustomSafeAreaView className='px-4'>
      <LoadingScreen show={loading} />
      <ChooseVariationModal
        noDisabled
        selectedVariation={selectedVariation}
        setSelectedVariation={setSelectedVariation}
        data={data?.variations}
        show={visible}
        toggle={hide}
      />
      <Bars headerLeft='close' title={isEdit ? 'Edit review' : 'New review'} onLeftButtonPress={createAlert} />
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

      <View className='h-2' />

      <TouchableWithoutFeedback onPress={show}>
        <View className='flex h-16 flex-row items-center justify-between rounded-lg bg-giratina-100 px-4'>
          <Text className={classNames('font-app text-body1 ', !selectedVariation && 'text-giratina-500')}>
            {selectedVariation?.name || 'Choose variation'}
          </Text>
          <Entypo name='chevron-down' size={20} color='#999' />
        </View>
      </TouchableWithoutFeedback>

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
