import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SavedItemsEmptyScreen from './SavedItemsEmptyScreen'
import SavedItemsScreen from './SavedItemsScreen'
import useSavedStore from '~/store/saved'
import { shallow } from 'zustand/shallow'

const SavedScreen = () => {
  const [savedList] = useSavedStore((state) => [state.savedList], shallow)
  const [data, setData] = useState(savedList)

  useEffect(() => {
    setData(savedList)
  }, [savedList])
  return <View className='w-full flex-1'>{data.length === 0 ? <SavedItemsEmptyScreen /> : <SavedItemsScreen />}</View>
}

export default SavedScreen
