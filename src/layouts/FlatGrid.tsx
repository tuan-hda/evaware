import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ProductCardBig } from '~/components/common'

interface Item {
  id: number
  imageURL: string
  price: number
  isFavorited: boolean
  desc: string
  badge: string
}

interface Props {
  data: Item[]
  numColumns: number
  verticalGap?: number
  horizontalGap?: number
  onItemPress?: (item: Item) => void
}

const FlatGrid = ({ data, numColumns = 2, verticalGap = 20, horizontalGap = 20, onItemPress }: Props) => {
  const formatData = (dataList: Item[], numOfColumns: number) => {
    const totalRows = Math.floor(dataList.length / numOfColumns)
    let totalLastRows = dataList.length - totalRows * numOfColumns

    while (totalLastRows !== 0 && totalLastRows !== numOfColumns) {
      dataList.push({
        id: 0,
        imageURL: '',
        price: 0,
        isFavorited: true,
        desc: '',
        badge: ''
      })
      totalLastRows++
    }

    return dataList
  }

  const renderItem = (item: Item, index: number, length: number) => {
    if (!item.imageURL) return <View className='flex-1 grow' />
    else {
      return (
        <View
          style={[
            {
              flexGrow: 1,
              flex: 1
            },
            index % numColumns !== numColumns - 1 && {
              marginRight: horizontalGap
            }
          ]}
        >
          <ProductCardBig data={item} onPress={() => onItemPress && onItemPress(item)} />
          {index === length - 2 && <View className='h-10' />}
        </View>
      )
    }
  }

  return (
    <FlatList
      data={formatData(data, numColumns)}
      renderItem={({ item, index }) => renderItem(item, index, data.length)}
      className='w-full pt-4'
      keyExtractor={(_, index) => index.toString()}
      numColumns={numColumns}
      // Vertical gap
      ItemSeparatorComponent={() => <View style={{ height: verticalGap }} />}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default FlatGrid
