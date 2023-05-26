import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { CatalogScreen, HomeScreen, ProductScreen } from '~/screens'
import CategoriesScreen from '~/screens/CategoriesScreen'
import SearchScreen from '~/screens/SearchScreen'
import Filter from '../filter/Filter'
import FilterOption from '../filter/FilterOption'
import { Provider } from 'react-redux'
import filter from '~/store/filter'

export type HomeNavParamList = {
  HomeScreen: undefined
  Category: undefined
  Search: undefined
  Catalog: undefined
  Product: undefined
  Filter: undefined
  FilterOption: {
    name: string
    selected: {
      name: string
      selected: boolean
    }[]
  }
}

export type HomeNavigationProp = StackNavigationProp<HomeNavParamList>
export type FilterOptionProp = StackScreenProps<HomeNavParamList, 'FilterOption'>

const Stack = createStackNavigator<HomeNavParamList>()

export default function HomeNav() {
  return (
    <Provider store={filter}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={HomeScreen} name='HomeScreen' />
        <Stack.Screen component={CategoriesScreen} name='Category' />
        <Stack.Screen component={SearchScreen} name='Search' />
        <Stack.Screen component={CatalogScreen} name='Catalog' />
        <Stack.Screen component={ProductScreen} name='Product' />
        <Stack.Screen component={Filter} name='Filter' />
        <Stack.Screen component={FilterOption} name='FilterOption' />
      </Stack.Navigator>
    </Provider>
  )
}
