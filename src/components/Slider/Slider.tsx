import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import SliderItem from './SliderItem'

const sampleList = [
  {
    title: 'best 2020',
    imageUrl: 'https://www.kettal.com/media/magefan_blog/aKCTL_HBT23_024_Grand-Bitta-Sofa_FINAL.jpg'
  }
]

export default function Slider({ listData = sampleList }) {
  return (
    <View className='justify-center'>
      <View className='w-full'>
        <ScrollView horizontal={true} contentContainerStyle={{ height: 88 }} showsHorizontalScrollIndicator={false}>
          {listData.map((item, index) => (
            <SliderItem key={index} title={item.title} imageUrl={item.imageUrl} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
