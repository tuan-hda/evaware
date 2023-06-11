import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Button } from '~/components/common'
import { VariationProps } from '~/types/variation.type'
import classNames from 'classnames'

type Props = {
  show: boolean
  toggle: () => void
  data: (VariationProps | undefined)[] | undefined
  selectedVariation: VariationProps | undefined
  setSelectedVariation: (data: VariationProps) => void
}

const ChooseVariationModal = ({ show, toggle, data, selectedVariation, setSelectedVariation }: Props) => {
  const selectVariation = (item: VariationProps | undefined) => {
    item && setSelectedVariation(item)
    toggle()
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
                  onPress={() => selectVariation(item)}
                  className={classNames(
                    'h-16 flex-row items-center rounded-lg border border-giratina-300 px-4',
                    selectedVariation?.id === item?.id ? 'bg-app-black' : 'bg-white'
                  )}
                >
                  <Text
                    className={classNames('font-app text-body1', selectedVariation?.id === item?.id && 'text-white')}
                  >
                    {item?.name}
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
