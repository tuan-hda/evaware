import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import ProductScreen from '../screens/ProductScreen'
import ProductDetail from '../screens/ProductDetail'

export type ProductNavParamsList = {
  ProductList: undefined
  ProductDetail: undefined
}

export type ProductNavigationProp = StackNavigationProp<ProductNavParamsList>

const Stack = createStackNavigator<ProductNavParamsList>()

function ProductNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductList' component={ProductScreen} />
      <Stack.Screen name='ProductDetail' component={ProductDetail} />
    </Stack.Navigator>
  )
}

export default ProductNav
