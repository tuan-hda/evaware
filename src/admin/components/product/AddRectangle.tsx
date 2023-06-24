import { View, Text, TouchableOpacity, TouchableOpacityProps, Image } from 'react-native'
import React from 'react'
import { Plus } from 'assets/icon'
import classNames from 'classnames'

type Props = {
  title?: string
  size?: 'normal' | 'big'
  img?: string
} & TouchableOpacityProps

const AddRectangle = ({ title = '', img, size = 'normal', ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      className={classNames(
        'items-center justify-center rounded-lg bg-giratina-100',
        size === 'big' ? 'w-[130] flex-1' : 'h-[140] w-[120] '
      )}
    >
      {img ? (
        <Image
          source={{ uri: img }}
          className='h-full w-full rounded-lg'
          style={{
            resizeMode: 'cover'
          }}
        />
      ) : (
        <View className='items-center justify-center rounded-lg bg-giratina-100'>
          <Plus fill='#000' />
          <Text className='mt-1 font-app text-body2 text-black'>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

export default AddRectangle
