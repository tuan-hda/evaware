import { View, Text, Modal } from 'react-native'
import React from 'react'
import { Button, Category } from '../common'

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const DATA = [
  {
    name: 'Price: high to low',
    selected: true
  },
  {
    name: 'Price: low to high',
    selected: false
  },
  {
    name: 'New first',
    selected: false
  },
  {
    name: 'Popular first',
    selected: false
  }
]

const ModalSort = ({ visible, setVisible }: Props) => {
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
        <View className='rounded-t-3xl bg-white px-4 pt-14'>
          <Text className='mb-4 font-app-semibold text-heading1'>Sort by</Text>

          {DATA.map((item, index) => (
            <Category left={item.name} right={item.selected} key={index} />
          ))}
          <View className='py-4'>
            <Button label={'Cancel'} className='bg-giratina-100' onPress={() => setVisible(false)} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalSort
