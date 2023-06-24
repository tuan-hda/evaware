import { View, Text, ScrollView, Image, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import LongDot from 'assets/icon/LongDot'
import Dot from 'assets/icon/Dot'

const WIDTH = Dimensions.get('window').width

interface Props {
  images: string[]
  className: string
  currVar: number
}

const SwipeSlider = ({ images, className, currVar }: Props) => {
  const [imgActive, setImgActive] = useState(0)
  const scrollViewRef = useRef<ScrollView>(null)

  const resetPage = () => {
    scrollViewRef.current?.scrollTo({ x: 0 })
  }

  useEffect(() => {
    resetPage()
  }, [currVar, images])

  return (
    <View className={classNames('flex-1', className)}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide !== imgActive) setImgActive(slide)
          }
        }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {images.map((e, index) => (
          <Image
            key={e}
            className={classNames(className)}
            style={{ width: WIDTH, height: 458, resizeMode: 'cover' }}
            source={{ uri: e }}
          />
        ))}
      </ScrollView>
      <View className='absolute bottom-4 flex-row self-center rounded bg-white bg-opacity-70 py-1 pl-1'>
        {images.map((e, index) =>
          imgActive === index ? <LongDot className='mr-1' key={e} /> : <Dot className='mr-1' key={e} />
        )}
      </View>
    </View>
  )
}

export default SwipeSlider
