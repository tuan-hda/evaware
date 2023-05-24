import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail'
import ProductDrawer from './ProductDrawer'

export type ProductNavParamsList = {
  ProductDrawer: undefined
  ProductDetail: undefined
}

export type ProductNavigationProp = StackNavigationProp<ProductNavParamsList>

const Stack = createStackNavigator<ProductNavParamsList>()

function ProductNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductDrawer' component={ProductDrawer} />
      <Stack.Screen name='ProductDetail' component={ProductDetail} />
    </Stack.Navigator>
  )
}

export default ProductNav
