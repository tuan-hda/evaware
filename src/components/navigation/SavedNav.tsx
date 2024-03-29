import { createStackNavigator, StackNavigationProp, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { NewReviewScreen, ProductScreen, ReviewScreen } from '~/screens'
import SavedScreen from '~/screens/SavedScreen'
import SearchScreen from '~/screens/SearchScreen'
import Filter from '../filter/Filter'
import FilterOption from '../filter/FilterOption'
import { ReviewProps } from '~/types/reviews.type'

export type SavedNavParamList = {
  SavedScreen: undefined
  Filter: undefined
  FilterOption: {
    name: string
    selected: {
      name: string
      selected: boolean
    }[]
  }
  Search: undefined
  Product: {
    id: number
  }
  Reviews: {
    id: number
  }
  NewReview: {
    productId: number
    isEdit?: boolean
    oldReview?: ReviewProps
  }
}

export type SavedNavigationProp = StackNavigationProp<SavedNavParamList>
export type SavedFilterOptionProp = StackScreenProps<SavedNavParamList, 'FilterOption'>

const Stack = createStackNavigator<SavedNavParamList>()

export default function SavedNav() {
  return (
    <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
      <Stack.Screen component={SavedScreen} name='SavedScreen' />
      <Stack.Screen component={ProductScreen} name='Product' />
      <Stack.Screen component={Filter} name='Filter' />
      <Stack.Screen component={FilterOption} name='FilterOption' />
      <Stack.Screen component={SearchScreen} name='Search' />
      <Stack.Screen component={ReviewScreen} name='Reviews' />
      <Stack.Screen component={NewReviewScreen} name='NewReview' />
    </Stack.Navigator>
  )
}
