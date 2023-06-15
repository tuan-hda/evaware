import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail'
import ProductDrawer from './ProductDrawer'

export type ProductNavParamsList = {
  ProductDrawer: undefined
  ProductDetail:
    | {
        isEdit?: boolean
        id?: number
      }
    | undefined
}

export type ProductNavigationProp = StackNavigationProp<ProductNavParamsList>
export type DetailProp = StackScreenProps<ProductNavParamsList, 'ProductDetail'>

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
