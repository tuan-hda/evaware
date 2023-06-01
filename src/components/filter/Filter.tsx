import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import RnRangeSlider from 'rn-range-slider'
import { Button, Category, CustomSafeAreaView } from '~/components/common'
import { HomeNavigationProp } from '../navigation/HomeNav'
import { useNavigation } from '@react-navigation/native'
import Bars from '../navigation/Bars'
import { useSelector } from 'react-redux'
import { RootState } from '../../slice/filterSlice'
import { UserNavigationProp } from '../navigation/UserNav'

const DATA = [
  {
    name: 'Category',
    selected: [
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
  },
  {
    name: 'Product type',
    selected: [
      {
        name: 'Furniture',
        selected: true
      },
      {
        name: 'Lighting',
        selected: false
      }
    ]
  },
  {
    name: 'Color',
    selected: []
  },
  {
    name: 'Size',
    selected: []
  },
  {
    name: 'Quality',
    selected: []
  }
]

type FilterListProps =
  | {
      name: string
      selected: {
        name: string
        selected: boolean
      }[]
    }
  | undefined

const getSelected = (
  arr: {
    name: string
    selected: boolean
  }[]
) => {
  const selectedList = arr.filter((item) => item.selected)
  if (selectedList.length == arr.length || selectedList.length == 0) return 'All'
  else if (selectedList.length == 1) return selectedList[0].name
  else return selectedList.length.toString()
}

const getFilterList = (filterList: FilterListProps) => {
  if (filterList) {
    const { name, selected } = filterList

    const newData = [...DATA]
    const item = newData.find((item) => item.name === name)
    if (item) {
      const newItem = { name: name, selected: selected }
      newData[newData.indexOf(item)] = newItem
      return newData
    }
  }
}

const Filter = () => {
  const navigation = useNavigation<HomeNavigationProp>()
  const filterList = useSelector((state: RootState) => state.filter.filterList)
  const [data, setData] = useState(filterList)
  useEffect(() => {
    setData(filterList)
  }, [filterList])

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4'>
      <Bars
        headerLeft='close'
        title='Filter'
        headerRight='action'
        label='Clear'
        onLeftButtonPress={() => navigation.goBack()}
      />
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
          onValueChanged={(low, high) => console.log(low, high)}
        />
      </View>
      {/* ListItem */}
      <View className='mt-4 w-full flex-1'>
        {data.map((item, index) => (
          <Category
            key={index}
            left={item.filterName}
            right={getSelected(item.optionsSelected)}
            action={() =>
              navigation.navigate('FilterOption', {
                name: item.filterName,
                selected: item.optionsSelected
              })
            }
          />
        ))}
      </View>

      <Button label={'Show 25 items'} onPress={() => navigation.goBack()} />
    </CustomSafeAreaView>
  )
}

export default Filter
