import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { MyOrdersScreen, NewReviewScreen, OrderScreen, ProductScreen, ReviewScreen, UserScreen } from '~/screens'
import AddressBookScreen from '~/screens/AddressBookScreen'
import AddAddressScreen from '~/screens/AddAddressScreen'
import ChooseAddressScreen from '~/screens/ChooseAddresScreen'
import PaymentMethodScreen from '~/screens/PaymentMethodScreen'
import DetailScreen from '~/screens/DetailScreen'
import SearchScreen from '~/screens/SearchScreen'
import { ReviewProps } from '~/types/reviews.type'
import { OrderProps } from '~/types/order.type'
import { ProvinceProps } from '~/types/province.type'
import { AddressProps } from '~/types/address.type'
import SettingScreen from '../screens/SettingScreen'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import SettingScreenSuperUser from '../screens/SettingScreenSuperUser'
import ManageUserScreen from '../screens/ManageUserScreen'
import UserDetailScreen from '../screens/UserDetail'
import { GeneralUserProps } from '~/types/user.type'

export type UserNavParamList = {
  UserScreen: undefined
  Address: undefined
  AddAddress: {
    isEdit?: boolean
    address?: AddressProps
  }
  ChooseAddress:
    | {
        type?: string
        address?: ProvinceProps
        setAddress?: (address: ProvinceProps) => void
        data?: ProvinceProps[]
      }
    | undefined
  Setting: undefined
  PaymentMethod: undefined
  MyDetails: undefined
  MyOrders: undefined
  OrderScreen: {
    order: OrderProps
  }
  Search: undefined
  Product: {
    id: number
  }
  Reviews: {
    id: number
  }
  NewReview: {
    productId: number
    isEdit?: boolean
    oldReview?: ReviewProps
  }
  ChangeRole: {
    data: GeneralUserProps
  }
  ManageUser: undefined
}

export type UserNavigationProp = StackNavigationProp<UserNavParamList>
export type UserScreenProps = StackScreenProps<UserNavParamList>
export type OrderProp = StackScreenProps<UserNavParamList, 'OrderScreen'>
export type AddAddressProp = StackScreenProps<UserNavParamList, 'AddAddress'>

const Stack = createStackNavigator<UserNavParamList>()

const UserNav = () => {
  const [user] = useUserStore((state) => [state.user], shallow)

  return (
    <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
      <Stack.Screen name='UserScreen' component={user?.is_superuser ? SettingScreenSuperUser : SettingScreen} />
      <Stack.Screen name='Address' component={AddressBookScreen} />
      <Stack.Screen name='AddAddress' component={AddAddressScreen} />
      <Stack.Screen name='ChooseAddress' component={ChooseAddressScreen} />
      <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
      <Stack.Screen name='MyDetails' component={DetailScreen} />
      <Stack.Screen name='MyOrders' component={MyOrdersScreen} />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
      <Stack.Screen name='ManageUser' component={ManageUserScreen} />
      <Stack.Screen name='ChangeRole' component={UserDetailScreen} />
    </Stack.Navigator>
  )
}

export default UserNav
