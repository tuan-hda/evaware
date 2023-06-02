import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from '~/components/common'
import { DirectionVertical, Filter } from 'assets/icon'
import { FlatList } from 'react-native-gesture-handler'
import { CustomSafeAreaView, SmallCard } from '~/components/common'
import { SavedNavigationProp } from '~/components/navigation/SavedNav'
import { useNavigation } from '@react-navigation/native'
import useSavedStore from '~/store/saved'
import { shallow } from 'zustand/shallow'
import ModalSort from '~/components/modal/ModalSort'

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
  const navigation = useNavigation<SavedNavigationProp>()
  const [savedList, removeSaved] = useSavedStore((state) => [state.savedList, state.removeSaved], shallow)
  const [data, setData] = useState(savedList)
  const [sortVisible, setSortVisible] = useState(false)
  const toggle = () => setSortVisible((prev) => !prev)

  useEffect(() => {
    setData(savedList)
  }, [savedList])

  return (
    <CustomSafeAreaView className='flex-1 bg-white px-4'>
      <ModalSort visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />
      <Text className='mb-6 mt-14 font-app-semibold text-heading1'>saved items</Text>

      <SearchBar onPress={() => navigation.navigate('Search')} />
      {/* Sort and filter */}
      <View className='mb-2 mt-4 flex-row'>
        <Pressable
          className='mr-[15px] flex-1 grow flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => setSortVisible(true)}
        >
          <Text className='my-2 mr-1 font-app-medium text-body2'>Sort</Text>
          <DirectionVertical />
        </Pressable>
        <Pressable
          className='flex-1 flex-row items-center justify-center rounded bg-giratina-100'
          onPress={() => navigation.navigate('Filter')}
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
            onButtonClearPress={() => removeSaved(item.id)}
            onPress={() => navigation.navigate('Product')}
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default SavedItemsScreen
