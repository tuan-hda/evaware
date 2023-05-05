import React from 'react'
import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import CartScreen from '~/screens/CartScreen'
import DeliveryDetail from '~/screens/DeliveryDetail'
import PaymentMethod from '~/screens/PaymentMethod'
import ConfirmOrder from '~/screens/ConfirmOrder'

export type BagNavParamsList = {
  Bag: undefined
  DeliveryDetail: undefined
  PaymentMethod: undefined
  ConfirmOrder: undefined
}

export type BagScreenProps = StackScreenProps<BagNavParamsList, 'Bag'>

export type BagNavigationProp = StackNavigationProp<BagNavParamsList>

const Stack = createStackNavigator<BagNavParamsList>()

const BagNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={CartScreen} name='Bag' />
      <Stack.Screen component={DeliveryDetail} name='DeliveryDetail' />
      <Stack.Screen component={PaymentMethod} name='PaymentMethod' />
      <Stack.Screen component={ConfirmOrder} name='ConfirmOrder' />
    </Stack.Navigator>
  )
}

export default BagNav
