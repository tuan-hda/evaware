import { View, Image, Text } from 'react-native'
import React from 'react'

const HomeCategory = () => {
  return (
    <View className='h-[100] w-full flex-row overflow-hidden rounded-lg bg-giratina-100'>
      <Text className='ml-4 mr-4 mt-4 flex-1 font-app-semibold text-heading2 text-black'>bedroom</Text>
      <Image
        source={{
          uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQWnDPxDUR5jzFa5EEZHBoFSLHk-bkwltge-8LIO5HSs-E29-kduwYnZjPH1lX2rZIhIm-JrmYlFtGTi__WPmm01WVBmU5_4_QK0zomSZ39&usqp=CAE'
        }}
        className='h-full w-[82]'
      />
    </View>
  )
}

export default HomeCategory
