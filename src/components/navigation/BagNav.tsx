import React from 'react'
import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import CartScreen from '~/screens/CartScreen'
import DeliveryDetail from '~/screens/DeliveryDetail'
import PaymentMethod from '~/screens/PaymentMethod'
import ConfirmOrder from '~/screens/ConfirmOrder'
import SuccessScreen from '~/screens/SuccessScreen'
import {
  AddAddressScreen,
  AddressBookScreen,
  HomeScreen,
  MyOrdersScreen,
  NewReviewScreen,
  ProductScreen,
  ReviewScreen
} from '~/screens'
import ChooseAddressScreen from '~/screens/ChooseAddresScreen'

export type BagNavParamsList = {
  Bag: undefined
  DeliveryDetail: undefined
  Address: undefined
  AddAddress: undefined
  ChooseAddress:
    | {
        type?: string
        setAddress?: (address: string) => void
      }
    | undefined
  PaymentMethod: undefined
  ConfirmOrder: undefined
  Success: undefined
  MyOrders: undefined
  Product: undefined
  Reviews: undefined
  NewReview: undefined
}

export type BagScreenProps = StackScreenProps<BagNavParamsList, 'Bag'>

export type BagNavigationProp = StackNavigationProp<BagNavParamsList>

const Stack = createStackNavigator<BagNavParamsList>()

const BagNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={CartScreen} name='Bag' />
      <Stack.Screen component={DeliveryDetail} name='DeliveryDetail' />
      <Stack.Screen component={AddressBookScreen} name='Address' />
      <Stack.Screen component={AddAddressScreen} name='AddAddress' />
      <Stack.Screen component={ChooseAddressScreen} name='ChooseAddress' />
      <Stack.Screen component={PaymentMethod} name='PaymentMethod' />
      <Stack.Screen component={ConfirmOrder} name='ConfirmOrder' />
      <Stack.Screen component={SuccessScreen} name='Success' />
      <Stack.Screen component={MyOrdersScreen} name='MyOrders' />
      <Stack.Screen component={ProductScreen} name='Product' />
      <Stack.Screen component={ReviewScreen} name='Reviews' />
      <Stack.Screen component={NewReviewScreen} name='NewReview' />
    </Stack.Navigator>
  )
}

export default BagNav
