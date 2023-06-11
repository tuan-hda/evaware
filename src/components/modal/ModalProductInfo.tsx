import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Button, Category } from '../common'
import { Close } from 'assets/icon'
import Modal from 'react-native-modal'
import { ConvertedProductDetailProps } from '~/types/product.type'

// Cách dùng
// 1. Thêm vào code render (vị trí ở đâu cũng được)
// <ModalProductInfo visible={productInfoVisible} setVisible={setProductInfoVisible}/>
// 2. thêm vào button gọi modal onPress={()=>setProductInfoVisible(true)}

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
  toggle: () => void
  data: ConvertedProductDetailProps | undefined
}

// const measurements = {
//   height: '50 cm',
//   width: '40 cm',
//   depth: '35 cm',
//   weight: '11.7 kg'
// }

// const composition = {
//   material: '100% Mango tree wood',
//   weight: '100% Chipboard'
// }

const ModalProductInfo = ({ visible, setVisible, toggle, data }: Props) => {
  return (
    <Modal isVisible={visible} onBackdropPress={toggle} className='m-0'>
      <Pressable className='h-full w-full justify-end bg-transparent' onPress={toggle}>
        <View className='rounded-t-3xl bg-white px-4 pb-[66px] pt-9'>
          <Pressable onPress={() => setVisible(false)}>
            <Close />
          </Pressable>
          <Text className='my-4 font-app-semibold text-heading1'>Product information</Text>

          <Text className='font-app text-body1'>{data?.desc}</Text>
          {/* <Text className='my-4 font-app-semibold text-heading2'>Measurements</Text>
          <Category left={'Height:'} right={measurements.height} />
          <Category left={'Width:'} right={measurements.width} />
          <Category left={'Depth:'} right={measurements.depth} />
          <Category left={'Weight:'} right={measurements.weight} />

          <Text className='my-4 font-app-semibold text-heading2'>Composition</Text>
          <Category left={'Main material:'} right={composition.material} />
          <Category left={'Weight:'} right={composition.weight} /> */}
        </View>
      </Pressable>
    </Modal>
  )
}

export default ModalProductInfo
