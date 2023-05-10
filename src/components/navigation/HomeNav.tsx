import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '~/screens'
import CategoriesScreen from '~/screens/CategoriesScreen'
import SearchScreen from '~/screens/SearchScreen'

export type HomeNavParamList = {
  HomeScreen: undefined
  Category: undefined
  Search: undefined
}

export type HomeNavigationProp = StackNavigationProp<HomeNavParamList>

const Stack = createStackNavigator()

export default function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={HomeScreen} name='HomeScreen' />
      <Stack.Screen component={CategoriesScreen} name='Category' />
      <Stack.Screen component={SearchScreen} name='Search' />
    </Stack.Navigator>
  )
}
