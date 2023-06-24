import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import OrderScreen from '../screens/OrderScreen'
import OrderDetail from '../screens/OrderDetail'
import { OrderProps } from '~/types/order.type'

export type OrderNavParamsList = {
  OrderList: undefined
  OrderDetail: {
    order: OrderProps
  }
}

export type OrderNavigationProp = StackNavigationProp<OrderNavParamsList>
export type OrderDetailProp = StackScreenProps<OrderNavParamsList, 'OrderDetail'>

const Stack = createStackNavigator<OrderNavParamsList>()

function OrderNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='OrderList' component={OrderScreen} />
      <Stack.Screen name='OrderDetail' component={OrderDetail} />
    </Stack.Navigator>
  )
}

export default OrderNav
