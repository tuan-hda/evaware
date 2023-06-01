import { View, Text, Modal, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Category } from '../common'
import { RootState, updateSort } from '~/slice/sortSlice'
import { useDispatch, useSelector } from 'react-redux'

// Cách dùng
// 1. Thêm vào code render (vị trí ở đâu cũng được)
//   <ModalSort visible={sortVisible} setVisible={setSortVisible }/>
// 2. thêm vào button gọi modal onPress={()=>setSortVisible(true)}

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const ModalSort = ({ visible, setVisible }: Props) => {
  const sortList = useSelector((state: RootState) => state.sort.sortList)

  const [data, setData] = useState(sortList)
  useEffect(() => {
    setData(sortList)
  }, [sortList])

  const dispatch = useDispatch()

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        //   setModalVisible(!modalVisible);
      }}
    >
      <Pressable
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'flex-end' }}
        onPress={() => setVisible(false)}
      >
        <View className='rounded-t-3xl bg-white px-4 pt-14'>
          <Text className='mb-4 font-app-semibold text-heading1'>Sort by</Text>

          {data.map((item, index) => (
            <Category
              left={item.name}
              right={item.selected}
              key={index}
              action={() => dispatch(updateSort(item.name))}
            />
          ))}
          <View className='py-4'>
            <Button label={'Cancel'} className='bg-giratina-100' onPress={() => setVisible(false)} />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export default ModalSort
