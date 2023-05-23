import { View, Text, Image } from 'react-native'
import React from 'react'

const Variation = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://www.ikea.com/images/storage-and-organisation-1c37e9ac223e6a594db850986fdf93b2.png?f=s'
        }}
        className='h-[140] w-[120] rounded-lg'
      />
      <Text className='mt-0.5 w-[120] font-app-regular text-[13px] text-black'>Red, 20 x 90 cm, has windows</Text>
      <Text className=' font-app text-body3 text-black'>6 qoh</Text>
    </View>
  )
}

export default Variation
