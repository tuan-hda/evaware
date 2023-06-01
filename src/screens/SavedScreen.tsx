import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/slice/saveItemSlice'
import SavedItemsEmptyScreen from './SavedItemsEmptyScreen'
import SavedItemsScreen from './SavedItemsScreen'

const SavedScreen = () => {
  const savedItemList = useSelector((state: RootState) => state.savedItem.savedItemList)
  const [data, setData] = useState(savedItemList)
  useEffect(() => {
    setData(savedItemList)
  }, [])
  return <View className='w-full flex-1'>{data.length === 0 ? <SavedItemsEmptyScreen /> : <SavedItemsScreen />}</View>
}

export default SavedScreen
