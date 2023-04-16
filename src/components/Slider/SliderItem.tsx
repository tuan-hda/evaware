import { View, Text, Image, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native'
import React, { useCallback, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const formatTitle = (title: string) => {
  const words = title.split(' ')
  const count = words.length
  if (count > 1) {
    words[0] = words[0] + '\n' + words[1]
    words.splice(1, 1)
  } else words[0] = '\n' + words[0]

  return words.join(' ')
}

interface Props {
  title: string
  imageUrl: string
}

const SliderItem = ({ title, imageUrl }: Props) => {
  const newTitle = formatTitle(title)
  const image = { uri: imageUrl }
  return (
    <View className='relative mr-3 h-[88px] w-[88px] rounded-lg'>
      <ImageBackground source={image} className='flex-1 overflow-hidden rounded-lg'>
        <LinearGradient
          colors={['rgba(33,33,33,0)', 'rgba(33,33,33,0.8)']}
          locations={[0.44, 1]}
          style={styles.LinearGradient}
        >
          <Text className='font-apps absolute bottom-2 left-2 right-2 h-8 text-xs text-white' numberOfLines={2}>
            {newTitle}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1
  }
})

export default SliderItem
