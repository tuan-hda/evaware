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
import { useQuery } from '@tanstack/react-query'
import { deleteSavedItemsService, getSavedItemsService } from '~/services/saved'
import { isError } from '~/utils/callAxios'
import ChooseVariationModal from '~/components/product/ChooseVariationModal'
import LoadingScreen from '~/components/common/LoadingScreen'
import { addToCartService } from '~/services/cart'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { SavedItemProps } from '~/types/saved.type'
import { VariationProps } from '~/types/variation.type'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

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
  const [sortVisible, setSortVisible] = useState(false)
  const toggle = () => setSortVisible((prev) => !prev)
  const [visible, setVisible] = useState(false)
  const [currentSaved, setCurrentSaved] = useState<SavedItemProps>()

  const {
    data: temp,
    refetch,
    isLoading
  } = useQuery({
    queryKey: ['saved'],
    queryFn: async () => getSavedItemsService()
  })
  useRefetchOnFocus(refetch)
  const data = temp?.data.results

  const removeSaved = async (id: number) => {
    await deleteSavedItemsService(id)
    refetch()
  }

  const show = (id: number) => {
    setCurrentSaved(data?.find((item) => item.id === id))
    setVisible(true)
  }
  const hide = () => setVisible(false)

  return (
    <CustomSafeAreaView className='flex-1 bg-white px-4'>
      <LoadingScreen show={isLoading} />
      <ChooseVariationModal data={currentSaved ? currentSaved.product.variations : []} show={visible} toggle={hide} />
      <ModalSort visible={sortVisible} setVisible={setSortVisible} toggle={toggle} />
      <Text className='mb-6 mt-14 font-app-semibold text-heading1'>saved items</Text>

      {/* <SearchBar onPress={() => navigation.navigate('Search')} /> */}
      {/* Sort and filter */}
      {/* <View className='mb-2 mt-4 flex-row'>
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
      </View> */}

      {/* FlatList */}
      <FlatList
        className='w-full pt-4'
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <SmallCard
            price={item.product.price}
            desc={item.product.desc}
            image={item.product.thumbnail}
            style='saved'
            containerClassName='mb-6'
            onButtonClearPress={() => removeSaved(item.product.id)}
            onPress={() =>
              navigation.navigate('Product', {
                id: item.product.id
              })
            }
            moveToBag={() => show(item.id)}
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default SavedItemsScreen
