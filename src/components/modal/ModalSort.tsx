import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Category } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import useSortFilterStore from '~/store/sort_filter'
import { shallow } from 'zustand/shallow'
import Modal from 'react-native-modal'

// Cách dùng
// 1. Thêm vào code render (vị trí ở đâu cũng được)
//  <ModalSort visible={sortVisible} setVisible={setSortVisible} toggle={toggle}/>
//  const [sortVisible, setSortVisible] = useState(false)
//  toggle = () => setSortVisible((prev) => !prev)
// 2. thêm vào button gọi modal onPress={()=>setSortVisible(true)}

interface Props {
  visible: boolean
  setVisible: (visible: boolean) => void
  toggle?: () => void
}

const ModalSort = ({ visible, setVisible, toggle }: Props) => {
  const [sortList, updateSort] = useSortFilterStore((state) => [state.sortList, state.updateSort], shallow)

  const [data, setData] = useState(sortList)
  useEffect(() => {
    setData(sortList)
  }, [sortList])

  return (
    <Modal isVisible={visible} onBackdropPress={toggle} className='m-0'>
      <Pressable className='h-full w-full justify-end bg-transparent' onPress={toggle}>
        <View className='rounded-t-3xl bg-white px-4 pt-14'>
          <Text className='mb-4 font-app-semibold text-heading1'>Sort by</Text>

          {data.map((item, index) => (
            <Category left={item.name} right={item.selected} key={index} action={() => updateSort(item.name)} />
          ))}
          <View className='py-4'>
            <Button label={'Apply'} className='bg-charizard-400' onPress={() => setVisible(false)} />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

export default ModalSort
