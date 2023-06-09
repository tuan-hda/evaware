import { View, Image, Text } from 'react-native'
import React from 'react'

type Props = {
  name: string
  img_url: string
}

const HomeCategory = ({ name, img_url }: Props) => {
  return (
    <View className='h-[100] w-full flex-row overflow-hidden rounded-lg bg-giratina-100'>
      <Text className='ml-4 mr-4 mt-4 flex-1 font-app-semibold text-heading2 text-black'>{name}</Text>
      <Image
        source={{
          uri: img_url
        }}
        className='h-full w-[82]'
      />
    </View>
  )
}

export default HomeCategory
