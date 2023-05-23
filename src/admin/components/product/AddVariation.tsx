import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Plus } from 'assets/icon'
import classNames from 'classnames'

type Props = {
  title?: string
  size?: 'normal' | 'big'
}

const AddRectangle = ({ title = '', size = 'normal' }: Props) => {
  return (
    <TouchableOpacity
      className={classNames(
        'items-center justify-center rounded-lg bg-giratina-100',
        size === 'big' ? 'w-[130] flex-1' : 'h-[140] w-[120] '
      )}
    >
      <Plus fill='#000' />
      <Text className='mt-1 font-app text-body2 text-black'>{title}</Text>
    </TouchableOpacity>
  )
}

export default AddRectangle