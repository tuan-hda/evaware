import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SavedItemsEmptyScreen from './SavedItemsEmptyScreen'
import SavedItemsScreen from './SavedItemsScreen'
import useSavedStore from '~/store/saved'
import { shallow } from 'zustand/shallow'
import { useNavigation } from '@react-navigation/native'
import useShowNav from '~/hooks/useShowNav'

const SavedScreen = () => {
  const [savedList] = useSavedStore((state) => [state.savedList], shallow)
  const [data, setData] = useState(savedList)

  const navigation = useNavigation()

  useShowNav(navigation, true)

  useEffect(() => {
    setData(savedList)
  }, [savedList])
  return <View className='w-full flex-1'>{data.length === 0 ? <SavedItemsEmptyScreen /> : <SavedItemsScreen />}</View>
}

export default SavedScreen
