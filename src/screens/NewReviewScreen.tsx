import { View, Text, Pressable, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, TextField, TextFieldWithLabel } from '~/components/common'
import Bars from '~/components/navigation/Bars'
import { Camera, Close, Star, YellowStar } from 'assets/icon'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { HomeNavigationProp } from '~/components/navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'

const NewReviewScreen = () => {
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

  const navigation = useNavigation<HomeNavigationProp>()

  const handleSelectedStar = (i: number) => {
    setSelectedStar(i)
    setStarState(
      starState.map((item, index) => (index > i ? { ...item, selected: false } : { ...item, selected: true }))
    )
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1
    })

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri])
    }
  }

  const removeImage = (i: number) => {
    const newImages = images.filter((_, index) => index !== i)
    setImages(newImages)
  }

  return (
    <CustomSafeAreaView className='px-4'>
      <Bars headerLeft='close' title='New review' onLeftButtonPress={() => navigation.goBack()} />
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

      <Button label={'Send review'} onPress={() => navigation.goBack()} />
    </CustomSafeAreaView>
  )
}

export default NewReviewScreen
