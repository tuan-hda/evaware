import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import { FlatList } from 'react-native-gesture-handler'
import { CustomSafeAreaView, SmallCard } from '~/components/common'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem, RootState } from '~/slice/saveItemSlice'

const DATA = [
  {
    image: 'https://noithatluongson.vn/wp-content/uploads/2021/07/furniture2-scaled.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  },
  {
    image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  },
  {
    image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  },
  {
    image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  },
  {
    image: 'https://www.next.co.uk/nxtcms/resource/blob/5489338/758225c48c0db35da723075526be2aa2/chair-data.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  },
  {
    image:
      'https://cdn11.bigcommerce.com/s-1u1m3wn/stencil/f0d917b0-a9ca-013a-dc54-429aee3ea0c9/e/72f7f5d0-cf5a-013b-0a19-26ac30a24330/img/custom_img/furniture_type_01.jpg',
    desc: 'Wooden bedside table featuring a raised design',
    price: 150.0
  }
]

const SavedItemsScreen = () => {
  const savedItemList = useSelector((state: RootState) => state.savedItem.savedItemList)
  const [data, setData] = useState(savedItemList)
  useEffect(() => {
    setData(savedItemList)
  }, [])

  const dispatch = useDispatch()

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }

  return (
    <CustomSafeAreaView className='flex-1 bg-white px-4'>
      <Text className='mb-6 mt-14 font-app-semibold text-heading1'>saved items</Text>

      <SearchBar />
      {/* Sort and filter */}
      <View className='mb-2 mt-4 flex-row'>
        <Pressable
          className='mr-[15px] flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Sort')}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
        <Pressable
          className='flex-1 flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => console.log('Filter')}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Filter</Text>
          <Filter />
        </Pressable>
      </View>

      {/* FlatList */}
      <FlatList
        className='w-full pt-4'
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <SmallCard
            price={item.price}
            desc={item.desc}
            image={item.image}
            style='saved'
            containerClassName='mb-6'
            onButtonClearPress={() => handleRemoveItem(item.id)}
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default SavedItemsScreen
