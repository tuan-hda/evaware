import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { BagItemProps } from '~/types/bagItem.type'
import BagFooter from './BagFooter'
import BagItem from './BagItem'

type Props = {
  bagItems: BagItemProps[]
}

const Separator = () => <View className='h-6' />

const BagHeader = () => <Text className='mb-4 mt-14 h-[58] font-app-semibold text-heading1'>bag</Text>

const Bag = ({ bagItems }: Props) => {
  const [data, setData] = useState(bagItems)
  const handleRemoveItem = (id: string) => {
    const newData = data.filter((item) => item.id != id)
    setData(newData)
  }
  return (
    <SafeAreaView className='flex-1'>
      <FlatList
        ListHeaderComponent={BagHeader}
        ListFooterComponent={BagFooter}
        ItemSeparatorComponent={Separator}
        data={data}
        className='px-4'
        renderItem={({ item }) => <BagItem {...item} onRemove={()=>handleRemoveItem(item.id)}/>}
      />
    </SafeAreaView>
  )
}

export default Bag
