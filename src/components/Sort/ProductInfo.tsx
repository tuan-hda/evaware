import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import { Button, Category } from '../common'
import { Close } from 'assets/icon'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const measurements = {
  height: '50 cm',
  width: '40 cm',
  depth: '35 cm',
  weight: '11.7 kg'
}

const composition = {
  material: '100% Mango tree wood',
  weight: '100% Chipboard'
}

const ProductInfo = ({ visible, setVisible }: Props) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        //   setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'flex-end' }}>
        <View className='rounded-t-3xl bg-white px-4 pb-[66px] pt-9'>
          <Pressable onPress={() => setVisible(false)}>
            <Close />
          </Pressable>
          <Text className='my-4 font-app-semibold text-heading1'>Product information</Text>

          <Text className='my-4 font-app-semibold text-heading2'>Measurements</Text>
          <Category left={'Height:'} right={measurements.height} />
          <Category left={'Width:'} right={measurements.width} />
          <Category left={'Depth:'} right={measurements.depth} />
          <Category left={'Weight:'} right={measurements.weight} />

          <Text className='my-4 font-app-semibold text-heading2'>Composition</Text>
          <Category left={'Main material:'} right={composition.material} />
          <Category left={'Weight:'} right={composition.weight} />
        </View>
      </View>
    </Modal>
  )
}

export default ProductInfo
