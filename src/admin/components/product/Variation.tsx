import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { VariationProps } from '~/types/variation.type'

const Variation = ({ data, ...props }: { data?: VariationProps; onPress?: () => void }) => {
  return (
    <Pressable onPress={props.onPress} className='relative'>
      <Image
        source={{
          uri: data?.img_urls[0]
        }}
        className='h-[140] w-[120] rounded-lg'
      />
      <Text className='mt-0.5 w-[120] font-app-regular text-[13px] text-black'>{data?.name}</Text>
      <Text className=' font-app text-body3 text-black'>{data?.inventory} qoh</Text>
      {data?.is_deleted && <View className='absolute h-full w-full rounded-lg bg-giratina-500/90' />}
    </Pressable>
  )
}

export default Variation
