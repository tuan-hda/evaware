import { View, Text, ViewProps, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import TextFieldWithLabel from '~/components/common/TextFieldWithLabel'
import Variation from '../components/product/Variation'
import AddRectangle from '../components/product/AddRectangle'
import Modal from 'react-native-modal'
import { DetailProp, ProductNavigationProp } from '../nav/ProductNav'
import { AddPayment } from '~/components/payment'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { AddVariation } from '../components/product'
import Entypo from 'react-native-vector-icons/Entypo'
import { createProductService, getProductDetailService, updateProductService } from '~/services/product'
type Props = ViewProps
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ConvertedProductDetailProps, CreateProductProps } from '~/types/product.type'
import { isError } from '~/utils/callAxios'
import useCategoryData from '~/hooks/useCategoryData'
import ChooseCategory from '../components/product/ChooseCategory'
import { CatalogProp } from '~/components/navigation/HomeNav'
import { CategoryProps } from '~/types/category.type'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '~/utils/uploadImage'
import LoadingScreen from '~/components/common/LoadingScreen'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { useQuery } from '@tanstack/react-query'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { CreateVariationProps, VariationProps } from '~/types/variation.type'
import { addVariationService, updateVariationService } from '~/services/variation'

const validationSchema = yup.object({
  name: yup.string().required('This is required'),
  desc: yup.string(),
  price: yup.number().required('This is required'),
  discount: yup.number().min(0, 'Must bigger than 0').max(100, 'Must smaller than 100'),
  width: yup.number(),
  height: yup.number(),
  depth: yup.number(),
  weight: yup.number(),
  material: yup.string(),
  more_info: yup.string()
})

const ProductDetail = ({ route, ...props }: Props & DetailProp) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<CreateProductProps>({ resolver: yupResolver(validationSchema) })
  const { isEdit, id } = route.params

  const navigation = useNavigation<ProductNavigationProp>()
  const ref = useRef<BottomSheetModal>(null)
  useShowNav(navigation, false)
  const [show, setShow] = useState(false)
  const [expand, setExpand] = useState(false)
  const [cur, setCur] = useState<CategoryProps>()
  const { response: categories } = useCategoryData()
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)

  const { refetch: productRefetch, data: temp } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: async () => {
      if (!id) return
      return getProductDetailService(id, true)
    }
  })
  useRefetchOnFocus(productRefetch)
  const [data, setData] = useState<ConvertedProductDetailProps>()

  useEffect(() => {
    setData(temp?.data)
  }, [temp])

  useEffect(() => {
    if (data) {
      const { category, ...rest } = data
      reset(rest)
      setImg(rest.thumbnail)
      setCur(category)
      setValue('price', String(rest.price))
      setValue('discount', String(rest.discount))
      setValue('depth', String(rest.depth))
      setValue('width', String(rest.width))
      setValue('height', String(rest.height))
      setValue('weight', String(rest.weight))
    }
  }, [data, reset, setValue])
  const [curVar, setCurVar] = useState<VariationProps>()
  const toggle = () => setShow((prev) => !prev)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1
    })

    if (!result.canceled) {
      const res = await uploadImage(result.assets[0], setLoading)
      if (res?.url) {
        setImg(res?.url)
      }
    }
  }

  const onConfirm = () => {
    toggle()
    navigation.goBack()
  }

  const present = () => {
    ref.current?.present()
  }

  const close = () => {
    ref.current?.close()
  }

  const createProduct = async (data: CreateProductProps) => {
    const res = await createProductService({ ...data, category: cur?.id || -1, thumbnail: img })
    if (!isError(res)) {
      navigation.goBack()
    }
  }

  const updateProduct = async (data: CreateProductProps) => {
    const res = await updateProductService(id || -1, { ...data, category: cur?.id || -1, thumbnail: img })
    if (!isError(res)) {
      navigation.goBack()
    }
  }

  const onSubmit: SubmitHandler<CreateProductProps> = (data) => {
    if (!cur) {
      Toast.show({
        type: 'error',
        text1: 'Choose category'
      })
      return
    }
    if (!img) {
      Toast.show({
        type: 'error',
        text1: 'Choose img'
      })
      return
    }
    if (isEdit) {
      updateProduct(data)
    } else createProduct(data)
  }

  const addVar = async (dataA: Omit<CreateVariationProps, 'product'>, x?: number) => {
    let res
    if (x === undefined || x === null) res = addVariationService({ ...dataA, product: id || -1 })
    else res = updateVariationService(x, { ...dataA, product: id || -1 })
    if (!isError(res)) {
      await productRefetch()
      setData(temp?.data)
      ref.current?.close()
      setCurVar(undefined)
    }
  }

  const qoh = data?.variations.reduce((prev, curr) => prev + (curr?.inventory || 0), 0)

  return (
    <BottomSheetModalProvider>
      <CustomSafeAreaView>
        <LoadingScreen show={loading} />

        <AppBar title={isEdit ? '#' + id : 'New product'} />
        <AddVariation
          onUpdate={async () => {
            await productRefetch()
            setData(temp?.data)
          }}
          curVar={curVar}
          onOk={addVar}
          close={close}
          ref={ref}
        />

        <Modal isVisible={show} onBackdropPress={toggle}>
          <View className='max-w-[320] rounded-lg bg-white px-4 pb-6 pt-8'>
            <Text className='text-center font-app-semibold text-heading2 text-black'>delete product?</Text>
            <Text className='mt-1 text-center font-app text-body1 text-giratina-500'>
              This action only hide product (not actually delete it)
            </Text>
            <View className='h-6' />
            <Button onPress={toggle} label='No' />
            <View className='h-2' />
            <Button onPress={onConfirm} type='secondary' label='Yep, I confirm' />
          </View>
        </Modal>

        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
          <View className={classNames('w-full px-4')}>
            <ChooseCategory onPress={(data) => setCur(data)} cur={cur} />
            <View className='h-4' />
            <TextFieldWithLabel label='Title *' name='name' control={control} error={errors.name?.message} />
            <View className='mt-2' />
            <TextFieldWithLabel
              TextfieldClassName='h-[128]'
              label='Description'
              multiline
              name='desc'
              control={control}
              error={errors.desc?.message}
            />

            <View className='mt-2 flex-row '>
              <View>
                <Text className='mb-1 font-app text-body1 text-black'>Thumbnail *</Text>
                <AddRectangle img={img} onPress={pickImage} size='big' title='Add image' />
              </View>
              <View className='ml-4 flex-1'>
                <TextFieldWithLabel
                  name='price'
                  control={control}
                  error={errors.price?.message}
                  keyboardType='number-pad'
                  label='Price *'
                  className='w-full'
                  containerClassName='mb-2'
                />
                <TextFieldWithLabel
                  name='discount'
                  control={control}
                  error={errors.discount?.message}
                  keyboardType='number-pad'
                  label='Discount percent'
                  className='w-full'
                />
              </View>
            </View>

            {isEdit && (
              <View>
                <View className='mt-4 flex-row justify-between'>
                  <Text className='font-app-medium text-body1'>Variation</Text>
                  <Text className='font-app text-body1 text-black/60'>
                    {data?.variations_count} variations - {qoh} qoh
                  </Text>
                </View>

                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} className='mt-2'>
                  {data?.variations.map((item) => (
                    <View className='flex-row' key={item?.id}>
                      <Variation
                        onPress={() => {
                          setCurVar(item)
                          ref.current?.present()
                        }}
                        data={item}
                        key={item?.id}
                      />
                      <View className='w-4' />
                    </View>
                  ))}
                  {/* <Variation />
                  <Variation />
                  <View className='w-4' />
                  <Variation />
                  <View className='w-4' />
                  <Variation />
                  <View className='w-4' /> */}
                  <AddRectangle onPress={present} title='Add variation' />
                </ScrollView>
              </View>
            )}

            <Pressable
              onPress={() => setExpand((prev) => !prev)}
              className='mb-2 mt-8 flex-row items-center justify-between'
            >
              <Text className=' font-app-medium text-[18px]'>Measurement and composition</Text>
              <View className={classNames(!expand && 'rotate-180')}>
                <Entypo name='chevron-down' size={16} />
              </View>
            </Pressable>

            <View>
              <View className='flex-row'>
                <View className='flex-1'>
                  <TextFieldWithLabel
                    name='width'
                    control={control}
                    error={errors.width?.message}
                    keyboardType='decimal-pad'
                    label='Width (cm)'
                  />
                </View>
                <View className='w-4' />
                <View className='flex-1'>
                  <TextFieldWithLabel
                    name='height'
                    control={control}
                    error={errors.height?.message}
                    keyboardType='decimal-pad'
                    label='Height (cm)'
                  />
                </View>
              </View>
              <View className='h-2' />

              <View className='flex-row'>
                <View className='flex-1'>
                  <TextFieldWithLabel
                    name='depth'
                    control={control}
                    error={errors.depth?.message}
                    keyboardType='decimal-pad'
                    label='Depth (cm)'
                  />
                </View>
                <View className='w-4' />
                <View className='flex-1'>
                  <TextFieldWithLabel
                    name='weight'
                    control={control}
                    error={errors.weight?.message}
                    keyboardType='decimal-pad'
                    label='Weight (kg)'
                  />
                </View>
              </View>
              <View className='h-2' />

              <TextFieldWithLabel
                name='material'
                control={control}
                error={errors.material?.message}
                label='Material '
              />
              <View className='h-2' />
              <TextFieldWithLabel
                name='more_info'
                control={control}
                error={errors.more_info?.message}
                label='More info'
              />
            </View>
          </View>

          <View className='mt-8 p-4'>
            <Button onPress={handleSubmit(onSubmit)} label='Save product' />
            <View className='h-4' />
            <TouchableOpacity onPress={toggle} className='my-4 w-full items-center'>
              <Text
                className={classNames(
                  ' text-center font-app-medium text-body1',
                  data?.is_deleted ? 'text-black' : 'text-magikarp-400'
                )}
              >
                {data?.is_deleted ? 'Restore product' : 'Delete product'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </CustomSafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default ProductDetail
