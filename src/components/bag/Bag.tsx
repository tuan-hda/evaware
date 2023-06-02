import { View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BagItemProps } from '~/types/bagItem.type'
import BagFooter from './BagFooter'
import BagItem from './BagItem'
import useBagStore from '~/store/bag'
import { shallow } from 'zustand/shallow'

const HEIGHT = Dimensions.get('window').height

const Separator = () => <View className='h-6' />

const BagHeader = () => <Text className='mb-4 mt-14 h-[58] font-app-semibold text-heading1'>bag</Text>

const Bag = () => {
  const [bagList, removeBag] = useBagStore((state) => [state.bagList, state.removeBag], shallow)
  const [data, setData] = useState(bagList)

  useEffect(() => {
    setData(bagList)
  }, [bagList])

  return (
    <SafeAreaView className='relative flex-1' style={{ height: HEIGHT }}>
      <FlatList
        ListHeaderComponent={BagHeader}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
        data={data}
        className='flex-1 px-4'
        renderItem={({ item }) => <BagItem {...item} onRemove={() => removeBag(item.id)} />}
      />
      <BagFooter/>
    </SafeAreaView>
  )
}

export default Bag
