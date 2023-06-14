import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button } from '~/components/common'
import { VariationProps } from '~/types/variation.type'
import classNames from 'classnames'
import { addToCartService } from '~/services/cart'
import { isError } from '~/utils/callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

type Props = {
  show: boolean
  toggle: () => void
  data: (VariationProps | undefined)[] | undefined
  selectedVariation?: VariationProps
  setSelectedVariation?: (data: VariationProps) => void
  noDisabled?: boolean
}

const ChooseVariationModal = ({ show, toggle, data, selectedVariation, setSelectedVariation, noDisabled }: Props) => {
  const selectVariation = (item: VariationProps | undefined) => {
    item && setSelectedVariation && setSelectedVariation(item)
    toggle()
  }

  const addToCart = async (productId: number, variationId: number) => {
    const res = await addToCartService(productId, variationId)
    if (isError(res)) {
      let text2 = 'Some error happened'

      if (res.error.data[0].toLowerCase().includes('insufficient inventory')) {
        text2 = 'Insufficient inventory'
      }

      Toast.show({
        type: 'error',
        text1: 'Added to cart failed',
        text2
      })
    } else {
      Toast.show({
        type: 'success',
        text1: 'Added to bag successfully'
      })
      toggle()
    }
  }

  return (
    <Modal isVisible={show} onBackdropPress={toggle} className='m-0'>
      <Pressable onPress={toggle} className='h-full w-full bg-transparent'>
        <View className='flex-1' />
        <Pressable className='w-full overflow-hidden rounded-t-3xl bg-white p-4'>
          <ScrollView>
            <Text className='mb-6 mt-4 h-[58] w-full text-left font-app-semibold text-heading1 text-black'>
              choose variation
            </Text>

            {data?.map((item, index) => (
              <View key={item?.id} className=''>
                <Pressable
                  disabled={item?.inventory === 0 && !noDisabled}
                  onPress={() => {
                    if (!setSelectedVariation && item) {
                      addToCart(item.product, item?.id)
                    } else {
                      selectVariation(item)
                    }
                  }}
                  className={classNames('h-16 flex-row items-center rounded-lg border border-giratina-300 px-4', {
                    'bg-app-black': selectedVariation?.id === item?.id && (item?.inventory !== 0 || noDisabled),
                    'bg-white': selectedVariation?.id !== item?.id && item?.inventory !== 0 && !noDisabled,
                    'bg-giratina-300': item?.inventory === 0 && !noDisabled
                  })}
                >
                  <Text
                    className={classNames('font-app text-body1', selectedVariation?.id === item?.id && 'text-white')}
                  >
                    {item?.name} {item?.inventory === 0 && !noDisabled && '- Out of stock'}
                  </Text>
                </Pressable>
                {data.length - 1 !== index && <View className='h-4' />}
              </View>
            ))}

            <View className='h-4' />
            <Button onPress={toggle} type='secondary' label='Cancel' />
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

export default ChooseVariationModal
