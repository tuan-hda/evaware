import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import OrderScreen from '../screens/OrderScreen'
import OrderDetail from '../screens/OrderDetail'

export type OrderNavParamsList = {
  OrderList: undefined
  OrderDetail: undefined
}

export type OrderNavigationProp = StackNavigationProp<OrderNavParamsList>

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
