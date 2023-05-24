import { View, Text, ViewProps, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Status from '../components/order/Status'
import { ChevronRight } from 'assets/icon'
import classNames from 'classnames'
import { useNavigation } from '@react-navigation/native'
import { OrderNavigationProp } from '~/admin/nav/OrderNav'
import { AppBar, Button, CustomSafeAreaView, SearchBar } from '~/components/common'
import { BagItem } from '~/components/bag'
import { BagItemProps } from '~/types/bagItem.type'
import useShowNav from '~/hooks/useShowNav'
import SelectModal from '~/components/common/SelectModal'
import { UserItem } from '../components/user'
import { UserNavigationProp } from '~/components/navigation/UserNav'
import { SettingNavigationProp } from '../nav/SettingNav'
import SortFilter from '~/components/common/SortFilter'

type Props = ViewProps

const ManageUserScreen = ({ ...props }: Props) => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1]
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
  const navigation = useNavigation<SettingNavigationProp>()
  useShowNav(navigation, false)

  return (
    <CustomSafeAreaView>
      <AppBar title='Manager users' />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View className={classNames('px-4 pb-4')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
          <SortFilter />
        </View>
        {list.map((item, index) => (
          <View key={index} className='mx-4'>
            <UserItem
              onPress={() => navigation.navigate('UserDetail')}
              role={index % 8 === 1 ? 'admin' : index % 8 === 2 ? 'staff' : 'customer'}
            />
          </View>
        ))}
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ManageUserScreen
