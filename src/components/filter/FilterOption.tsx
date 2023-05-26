import { View } from 'react-native'
import React, {useState } from 'react'
import { Button, Category, CustomSafeAreaView } from '~/components/common'
import Bars from '../navigation/Bars'
import { FilterOptionProp } from '../navigation/HomeNav'
import { useDispatch } from 'react-redux'
import { updateFilter } from './filterSlice'

const FilterOption = ({ navigation, route }: FilterOptionProp) => {
  const { name, selected } = route.params
  const [data, setData] = useState(selected)

  const dispatch = useDispatch()

  const handleCheck = (i: number) => {
    const newData = [...data]
    const item = newData[i]
    const newItem = { ...item, selected: !item.selected }
    newData[i] = newItem
    setData(newData)
  }

  const handleFilter = () => {
    const payload = {
      name: name, 
      selecteds: data
    }
    dispatch(updateFilter(payload))
    navigation.goBack()
  }

  return (
    <CustomSafeAreaView className='flex-1 items-center bg-white px-4'>
      <Bars
        headerLeft='return'
        title={name}
        headerRight='action'
        label='Clear'
        onLeftButtonPress={() => navigation.goBack()}
      />
      {/* ListItem */}
      <View className='w-full flex-1'>
        {data.map((item, index) => (
          <Category key={index} left={item.name} right={item.selected} action={() => handleCheck(index)} />
        ))}
      </View>
      <View className='my-4 w-full'>
        <Button label={'Show 25 items'} onPress={handleFilter} />
      </View>
    </CustomSafeAreaView>
  )
}

export default FilterOption
