import { createStackNavigator, StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { ProductScreen } from '~/screens'
import SavedScreen from '~/screens/SavedScreen'
import savedItem from '~/store/saved'
import Filter from '../filter/Filter'
import FilterOption from '../filter/FilterOption'

export type SavedNavParamList = {
  SavedScreen: undefined
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

export type SavedNavigationProp = StackNavigationProp<SavedNavParamList>
export type SavedFilterOptionProp = StackScreenProps<SavedNavParamList, 'FilterOption'>

const Stack = createStackNavigator<SavedNavParamList>()

export default function SavedNav() {
  return (
    <Provider store={savedItem}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={SavedScreen} name='SavedScreen' />
        <Stack.Screen component={ProductScreen} name='Product' />
        <Stack.Screen component={Filter} name='Filter' />
        <Stack.Screen component={FilterOption} name='FilterOption' />
      </Stack.Navigator>
    </Provider>
  )
}
