import { View, Text, Pressable } from 'react-native'
import React from 'react'
import RnRangeSlider from 'rn-range-slider'
import { Button, Category } from '~/components/common'

const DATA = [
  {
    name: 'Category',
    selected: 'furniture'
  },
  {
    name: 'Product type',
    selected: 'All'
  },
  {
    name: 'Color',
    selected: 'All'
  },
  {
    name: 'Size',
    selected: 'All'
  },
  {
    name: 'Quality',
    selected: 'All'
  }
]

const Filter = ({ data = DATA }) => {
  return (
    <View className='flex-1 items-center bg-white px-4'>
      <View className='mt-4 flex-row'>
        <Text className='flex-1 font-app-medium text-body1'>$0</Text>
        <Text className='flex-1 text-right font-app-medium text-body1'>$700</Text>
      </View>
      {/* RangerSlider */}
      <View className='relative w-full'>
        <View className='absolute bottom-0 h-[2px] w-full bg-giratina-200' />
        <RnRangeSlider
          className='h-[28px] w-full'
          min={0}
          max={700}
          step={1}
          renderThumb={() => <View className='h-4 w-8 rounded bg-charizard-400' />}
          renderRail={() => <View className='h-[2px] w-full bg-giratina-200' />}
          renderRailSelected={() => <View className='h-[2px] w-full bg-charizard-400' />}
          renderLabel={(value) => <Text>${value}</Text>}
          // renderNotch={() => <View className='h-4' />}
          onValueChanged={(low, high) => console.log(low, high)}
        />
      </View>
      {/* ListItem */}
      <View className='mt-4 w-full flex-1'>
        {data.map((item, index) => (
          <Category key={index} left={item.name} right={item.selected} />
        ))}
      </View>

      <Button label={'Show 25 items'} />
    </View>
  )
}

export default Filter
