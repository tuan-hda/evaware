import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { CatalogScreen, HomeScreen, ProductScreen } from '~/screens'
import CategoriesScreen from '~/screens/CategoriesScreen'
import SearchScreen from '~/screens/SearchScreen'
import Bars from './Bars'

export type HomeNavParamList = {
  HomeScreen: undefined
  Category: undefined
  Search: undefined
  Catalog: undefined
  Product: undefined
}

export type HomeNavigationProp = StackNavigationProp<HomeNavParamList>

const Stack = createStackNavigator<HomeNavParamList>()

export default function HomeNav() {
  const navigation = useNavigation<HomeNavigationProp>()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name='HomeScreen' />
      <Stack.Screen component={CategoriesScreen} name='Category' />
      <Stack.Screen component={SearchScreen} name='Search' />
      <Stack.Screen
        component={CatalogScreen}
        name='Catalog'
        options={{
          headerShown: true,
          header: () => <Bars headerLeft='return' title='Furniture' onLeftButtonPress={() => navigation.goBack()} />
        }}
      />
      <Stack.Screen
        component={ProductScreen}
        name='Product'
        options={{
          headerShown: true,
          header: () => (
            <Bars
              headerLeft='return'
              headerRight='heart'
              backgroundColor='transparent'
              style={{ position: 'absolute'}}
              onLeftButtonPress={() => navigation.goBack()}
            />
          )
        }}
      />
    </Stack.Navigator>
  )
}
