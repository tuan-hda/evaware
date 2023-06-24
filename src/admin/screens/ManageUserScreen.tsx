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
import { SuperUserNavProp } from '../nav/SuperUserNav'
import SortFilter from '~/components/common/SortFilter'
import { useQuery } from '@tanstack/react-query'
import { getAllUsersService } from '~/services/user'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'

type Props = ViewProps

const ManageUserScreen = ({ ...props }: Props) => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1]
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
  const navigation = useNavigation<SuperUserNavProp>()

  const { data: temp, refetch } = useQuery({
    queryKey: ['all-user'],
    queryFn: getAllUsersService
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)

  return (
    <CustomSafeAreaView>
      <AppBar title='Manager users' />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}>
        <View className={classNames('px-4 pb-4')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
          <SortFilter />
        </View>
        {data?.results.map((item, index) => (
          <View key={index} className='mx-4'>
            <UserItem
              data={item}
              onPress={() =>
                navigation.navigate('ChangeRole', {
                  data: item
                })
              }
            />
          </View>
        ))}
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ManageUserScreen
