import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import ProductDetail from '../screens/ProductDetail'
import ProductDrawer from './ProductDrawer'
import CategoryProductScreen from '../screens/CategoryProductScreen'

export type ProductNavParamsList = {
  ProductDrawer: undefined
  ProductDetail:
    | {
        isEdit?: boolean
        id?: number
      }
    | undefined
  CategoryProduct:
    | {
        id?: number
      }
    | undefined
}

export type ProductNavigationProp = StackNavigationProp<ProductNavParamsList>
export type DetailProp = StackScreenProps<ProductNavParamsList, 'ProductDetail'>
export type CategoryProp = StackScreenProps<ProductNavParamsList, 'CategoryProduct'>

const Stack = createStackNavigator<ProductNavParamsList>()

function ProductNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ProductDrawer' component={ProductDrawer} />
      <Stack.Screen name='ProductDetail' component={ProductDetail} />
      <Stack.Screen name='CategoryProduct' component={CategoryProductScreen} />
    </Stack.Navigator>
  )
}

export default ProductNav
