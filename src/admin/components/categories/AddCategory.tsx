import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { Button, TextFieldWithLabel } from '~/components/common'
import AddRectangle from '../product/AddRectangle'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from '~/utils/uploadImage'
import { CategoryProps } from '~/types/category.type'
import { addCategoryService, deleteCategoryService, updateCategoryService } from '~/services/category'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { isError } from '~/utils/callAxios'

type Props = {
  show: boolean
  toggle: () => void
  data?: CategoryProps
}
const validationSchema = yup.object({
  name: yup.string().required('This is required'),
  desc: yup.string()
})

const AddCategory = ({ show, toggle, data }: Props) => {
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = data != undefined

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

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm<CategoryProps>({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (data) {
      reset(data)
      setImg(data.img_url)
      setValue('name', String(data.name))
      setValue('desc', String(data.desc))
    }
  }, [data, reset, setValue])
  const createCategory = async (data: CategoryProps) => {
    const res = await addCategoryService({ ...data, img_url: img })
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Add category successfully!'
      })
      toggle()
    }
  }

  const updateCategory = async (data: CategoryProps) => {
    const res = await updateCategoryService({ ...data, img_url: img })
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Update category successfully!'
      })
      toggle()
    }
  }

  const deleteCategory = async (id: number) => {
    const res = await deleteCategoryService(id)
    if (!isError(res)) {
      Toast.show({
        type: 'success',
        text1: 'Delete category successfully!'
      })
      toggle()
    } else {
      Toast.show({
        type: 'error',
        text1: res.error.data.detail
      })
    }
  }

  const onSubmit: SubmitHandler<CategoryProps> = (data) => {
    if (!img) {
      Toast.show({
        type: 'error',
        text1: 'Choose img'
      })
      return
    }
    if (isEdit) {
      updateCategory(data)
    } else createCategory(data)
  }
  const onDelete = () => {
    if (isEdit) {
      deleteCategory(data.id)
    }
    toggle()
  }

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white p-4'>
          <Text className='mb-6 mt-4 h-[58] w-full text-left font-app-semibold text-heading1 text-black'>
            add category
          </Text>
          <View className='my-2 flex-row '>
            <View>
              <Text className='mb-1 font-app text-body1 text-black'>Thumbnail *</Text>
              <AddRectangle img={img} onPress={pickImage} size='big' title='Add image' />
            </View>
            <View className='ml-4 flex-1'>
              <TextFieldWithLabel
                name='name'
                label='Name *'
                control={control}
                error={errors.name?.message}
                className='w-full'
                containerClassName='mb-2'
              />
              <TextFieldWithLabel
                name='desc'
                label='Description *'
                control={control}
                error={errors.desc?.message}
                className='w-full'
              />
            </View>
          </View>
          <View className='h-4' />
          <Button onPress={handleSubmit(onSubmit)} label='Save' />
          <View className='h-4' />
          <Button onPress={onDelete} type='secondary' isDanger={isEdit} label={isEdit ? 'Delete' : 'Cancel'} />
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default AddCategory
