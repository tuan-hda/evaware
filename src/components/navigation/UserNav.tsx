import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
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

export type UserNavParamList = {
  UserScreen: undefined
  Address: undefined
  AddAddress: undefined
  ChooseAddress:
    | {
        type?: string
        setAddress?: (address: string) => void
      }
    | undefined
  Setting: undefined
  PaymentMethod: undefined
  MyDetails: undefined
  MyOrders: undefined
  OrderScreen: undefined
  Product: undefined
  Filter: undefined
  FilterOption: {
    name: string
    selected: {
      name: string
      selected: boolean
    }[]
  }
  Search: undefined
  Reviews: undefined
  NewReview: undefined
}

export type UserNavigationProp = StackNavigationProp<UserNavParamList>
export type UserScreenProps = StackScreenProps<UserNavParamList>
export type UserFilterOptionProp = StackScreenProps<UserNavParamList, 'FilterOption'>

const Stack = createStackNavigator<UserNavParamList>()

const UserNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
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
