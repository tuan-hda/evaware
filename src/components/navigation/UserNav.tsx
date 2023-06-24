import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { MyOrdersScreen, NewReviewScreen, OrderScreen, ProductScreen, ReviewScreen, UserScreen } from '~/screens'
import AddressBookScreen from '~/screens/AddressBookScreen'
import AddAddressScreen from '~/screens/AddAddressScreen'
import ChooseAddressScreen from '~/screens/ChooseAddresScreen'
import SettingScreen from '~/screens/SettingScreen'
import PaymentMethodScreen from '~/screens/PaymentMethodScreen'
import DetailScreen from '~/screens/DetailScreen'
import Filter from '../filter/Filter'
import FilterOption from '../filter/FilterOption'
import SearchScreen from '~/screens/SearchScreen'
import { ReviewProps } from '~/types/reviews.type'
import { OrderProps } from '~/types/order.type'
import { ProvinceProps } from '~/types/province.type'
import { AddressProps } from '~/types/address.type'

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
  Filter: undefined
  FilterOption: {
    name: string
    selected: {
      name: string
      selected: boolean
    }[]
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
}

export type UserNavigationProp = StackNavigationProp<UserNavParamList>
export type UserScreenProps = StackScreenProps<UserNavParamList>
export type UserFilterOptionProp = StackScreenProps<UserNavParamList, 'FilterOption'>
export type OrderProp = StackScreenProps<UserNavParamList, 'OrderScreen'>
export type AddAddressProp = StackScreenProps<UserNavParamList, 'AddAddress'>

const Stack = createStackNavigator<UserNavParamList>()

const UserNav = () => (
  <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
    <Stack.Screen name='UserScreen' component={UserScreen} />
    <Stack.Screen name='Address' component={AddressBookScreen} />
    <Stack.Screen name='AddAddress' component={AddAddressScreen} />
    <Stack.Screen name='ChooseAddress' component={ChooseAddressScreen} />
    <Stack.Screen name='Setting' component={SettingScreen} />
    <Stack.Screen name='PaymentMethod' component={PaymentMethodScreen} />
    <Stack.Screen name='MyDetails' component={DetailScreen} />
    <Stack.Screen name='MyOrders' component={MyOrdersScreen} />
    <Stack.Screen name='OrderScreen' component={OrderScreen} />
    <Stack.Screen name='Product' component={ProductScreen} />
    <Stack.Screen name='Filter' component={Filter} />
    <Stack.Screen name='FilterOption' component={FilterOption} />
    <Stack.Screen name='Search' component={SearchScreen} />
    <Stack.Screen name='Reviews' component={ReviewScreen} />
    <Stack.Screen name='NewReview' component={NewReviewScreen} />
  </Stack.Navigator>
)

export default UserNav
