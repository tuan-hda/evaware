import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer'
import ProductScreen from '../screens/ProductScreen'
import CategoriesScreen from '../screens/CategoriesScreen'
import PromotionScreen from '../screens/PromotionScreen'
import Advertisement from '../screens/Advertisement'

export type ProductDrawerParamsList = {
  Product: undefined
  Categories: undefined
  Promotion: undefined
  Advertisement: undefined
}

export type ProductDrawerNavigationProp = DrawerNavigationProp<ProductDrawerParamsList>
const Drawer = createDrawerNavigator<ProductDrawerParamsList>()

export default function ProductDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName='Product'
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerLabelStyle: {
          fontFamily: 'Lexend',
          fontSize: 16
        },
        drawerActiveTintColor: '#FFD60A',
        drawerItemStyle: {
          backgroundColor: 'transparent'
        }
      }}
    >
      <Drawer.Screen name='Product' component={ProductScreen} />
      <Drawer.Screen name='Categories' component={CategoriesScreen} />
      <Drawer.Screen name='Promotion' component={PromotionScreen} />
      <Drawer.Screen name='Advertisement' component={Advertisement} />
    </Drawer.Navigator>
  )
}
