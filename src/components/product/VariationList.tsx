import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ConvertedProductDetailProps } from '~/types/product.type'
import classNames from 'classnames'

type Props = {
  data: ConvertedProductDetailProps | undefined
  setSelected: (index: number) => void
  selected: number
}

const VariationList = ({ data, selected, setSelected }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className='flex-row px-4'>
      {data?.variations.map((item, index) => {
        return (
          <View key={item?.id} className='mr-4 flex-row'>
            <Pressable
              onPress={() => setSelected(index)}
              className={classNames(
                'h-9 flex-row items-center rounded-lg border border-giratina-300 px-4',
                selected === index ? 'bg-app-black' : 'bg-white'
              )}
            >
              <Text className={classNames('font-app-medium text-body2', selected === index && 'text-white')}>
                {item?.name}
              </Text>
            </Pressable>
            {index === data.variations.length - 1 && <View className='w-4' />}
          </View>
        )
      })}
    </ScrollView>
  )
}

export default VariationList
