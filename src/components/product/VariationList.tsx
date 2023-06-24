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
            <View>
              <Pressable
                disabled={item?.inventory === 0}
                onPress={() => setSelected(index)}
                className={classNames('h-9 flex-row items-center rounded-lg border border-giratina-300 px-4', {
                  'bg-app-black': selected === index && item?.inventory !== 0,
                  'bg-white': selected !== index && item?.inventory !== 0,
                  'bg-giratina-300': item?.inventory === 0
                })}
              >
                <Text
                  className={classNames('font-app-medium text-body2', {
                    'text-white': selected === index,
                    'text-giratina-500': item?.inventory === 0
                  })}
                >
                  {item?.name}
                </Text>
              </Pressable>
              <Text className='ml-2 font-app-light text-giratina-500'>
                {item?.inventory ? item.inventory + ' left' : 'Out of stock'}{' '}
              </Text>
            </View>
            {index === data.variations.length - 1 && <View className='w-4' />}
          </View>
        )
      })}
    </ScrollView>
  )
}

export default VariationList
