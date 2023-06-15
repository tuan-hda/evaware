import { TouchableOpacity, View, ScrollView, Text, Pressable } from 'react-native'
import React, { Ref, forwardRef, memo, useEffect, useState } from 'react'
import { Camera, Card, Close, Mastercard } from 'assets/icon'
import { Button, Title, TextFieldWithLabel } from '~/components/common'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Image } from 'react-native'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '~/utils/uploadImage'
import LoadingScreen from '~/components/common/LoadingScreen'
import { CreateVariationProps, VariationProps } from '~/types/variation.type'
import { SubmitHandler, useForm } from 'react-hook-form'
import { deleteVariationService } from '~/services/variation'
import { isError } from '~/utils/callAxios'
import useAlertExit from '~/hooks/useAlertExit'
type Props = {
  close: () => void
  onOk?: (data: Omit<CreateVariationProps, 'product'>, id?: number) => void
  curVar?: VariationProps
  onUpdate?: () => void
}

const Backdrop = () => <View className='h-full w-full bg-black/50' />

const AddPayment = forwardRef(({ close, onOk, curVar, onUpdate }: Props, ref: Ref<BottomSheetModal>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<Omit<CreateVariationProps, 'product'>>()

  const [images, setImages] = useState<string[]>([])
  useEffect(() => {
    reset(curVar)
    setValue('inventory', String(curVar?.inventory || 0))
    if (curVar?.img_urls) setImages(curVar?.img_urls)
  }, [curVar, reset, setValue])
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1
    })

    if (!result.canceled) {
      const res = await uploadImage(result.assets[0], setLoading)
      setImages([...images, res?.url || ''])
    }
  }

  const [loading, setLoading] = useState(false)

  const removeImage = (i: number) => {
    const newImages = images.filter((_, index) => index !== i)
    setImages(newImages)
  }

  const onSubmit: SubmitHandler<Omit<CreateVariationProps, 'product'>> = (data) => {
    onOk &&
      onOk(
        {
          ...data,
          img_urls: images
        },
        curVar?.id
      )
    reset()
    setValue('inventory', 0)
    setImages([])
  }

  const deleteVar = async () => {
    if (curVar?.id) {
      const res = deleteVariationService(curVar?.id)
      if (!isError(res)) {
        onUpdate && onUpdate()
        close()
      }
    }
  }

  const { createAlert } = useAlertExit(deleteVar, undefined, 'Delete variation?')

  return (
    <BottomSheetModal onDismiss={close} backdropComponent={Backdrop} snapPoints={['90%']} ref={ref}>
      <ScrollView className='h-full rounded-t-3xl bg-white px-4'>
        <LoadingScreen show={loading} />

        <TouchableOpacity onPress={close} className='mt-3'>
          <Close />
        </TouchableOpacity>
        <Title
          isBig
          title={curVar?.id ? (curVar.is_deleted ? 'restore variation' : 'update variation') : 'add variation'}
          className='mt-4 px-0'
        />
        <TextFieldWithLabel control={control} name='name' placeholder='Sofia Sofa' label='Title' />
        <View className='h-4' />
        <TextFieldWithLabel
          control={control}
          name='inventory'
          placeholder='300'
          label='Inventory'
          keyboardType='number-pad'
        />
        <Text className='mt-2 font-app text-body1 '>Images</Text>
        <ScrollView horizontal className='mb-6 flex-none py-2' showsHorizontalScrollIndicator={false}>
          <Pressable
            className='mr-3 h-[120] w-[80] items-center justify-center rounded-lg bg-giratina-100'
            onPress={pickImage}
          >
            <Camera />
          </Pressable>
          {images.map((item, index) => (
            <View className='relative mr-3 h-[120] w-[80] rounded-lg' key={index}>
              <Image
                source={{
                  uri: item
                }}
                className='h-[120] w-[80] rounded-lg'
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

        <View className='mt-6'>
          <Button label='Save' onPress={handleSubmit(onSubmit)} />
          {curVar?.id && <Button isDanger type='text' onPress={createAlert} label='Delete' />}
        </View>
      </ScrollView>
    </BottomSheetModal>
  )
})

export default memo(AddPayment)
