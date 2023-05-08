import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Button, Category, RadioButton } from '~/components/common'

const DATA = [
  {
    name: 'Furniture',
    selected: true
  },
  {
    name: 'Lighting',
    selected: false
  },
  {
    name: 'Rugs',
    selected: true
  },
  {
    name: 'Mirrors',
    selected: false
  },
  {
    name: 'Blankets',
    selected: true
  }
]

const FilterOption = ({ data = DATA }) => {
  return (
    <View className='flex-1 items-center bg-white px-4'>
      {/* ListItem */}
      <View className='w-full flex-1'>
        {data.map((item, index) => (
            <Category key={index} left={item.name} right={item.selected} />
        ))}
      </View>
      <View className='my-4 w-full'>
        <Button label={'Show 25 items'} />
      </View>
    </View>
  )
}

export default FilterOption
