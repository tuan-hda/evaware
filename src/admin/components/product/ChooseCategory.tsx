import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SelectModal from '~/components/common/SelectModal'
import useCategoryData from '~/hooks/useCategoryData'
import { Button, TextField } from '~/components/common'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CategoryProps } from '~/types/category.type'
import classNames from 'classnames'

type Props = {
  onPress: (data: CategoryProps) => void
  cur?: CategoryProps
}

const ChooseCategory = ({ onPress, cur: outcur }: Props) => {
  const [show, setShow] = useState(false)
  const toggle = () => {
    setShow((prev) => !prev)
  }
  const { response: categories } = useCategoryData()
  const [cur, setCur] = useState('')

  useEffect(() => {
    if (outcur) setCur(outcur.name)
  }, [outcur])

  const items =
    categories?.results.map((item, index) => ({
      value: item.name,
      action: () => {
        setCur(item.name)
        onPress(item)
      }
    })) || []

  return (
    <View>
      <SelectModal show={show} items={items} toggle={toggle} title='choose category' />
      <Text className='mb-2 font-app text-body1'>Choose category *</Text>
      <TouchableOpacity onPress={toggle} className='h-16 justify-center rounded-lg bg-giratina-100 px-4'>
        <Text className={classNames('font-app text-body1', !cur && 'text-giratina-500')}>
          {cur || 'Choose category'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChooseCategory
