import { StackNavigationProp, createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { CatalogScreen, HomeScreen, NewReviewScreen, ProductScreen, ReviewScreen } from '~/screens'
import CategoriesScreen from '~/screens/CategoriesScreen'
import SearchScreen from '~/screens/SearchScreen'
import Filter from '../filter/Filter'
import FilterOption from '../filter/FilterOption'
import { Slider } from '../slider'
import { ConvertedProductDetailProps } from '~/types/product.type'
import { ReviewProps } from '~/types/reviews.type'

export type HomeNavParamList = {
  HomeScreen: undefined
  Category: undefined
  Search: undefined
  Catalog: { catalog: string; id: number; action?: string }
  Filter: undefined
  FilterOption: {
    name: string
    selected: {
      name: string
      selected: boolean
    }[]
  }
  Slider: undefined
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

export type HomeNavigationProp = StackNavigationProp<HomeNavParamList>
export type HomeFilterOptionProp = StackScreenProps<HomeNavParamList, 'FilterOption'>
export type CatalogProp = StackScreenProps<HomeNavParamList, 'Catalog'>
export type ProductProp = StackScreenProps<HomeNavParamList, 'Product'>
export type ReviewProp = StackScreenProps<HomeNavParamList, 'Reviews'>
export type NewReviewProp = StackScreenProps<HomeNavParamList, 'NewReview'>

const Stack = createStackNavigator<HomeNavParamList>()

export default function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
      <Stack.Screen component={HomeScreen} name='HomeScreen' />
      <Stack.Screen component={CategoriesScreen} name='Category' />
      <Stack.Screen component={SearchScreen} name='Search' />
      <Stack.Screen component={CatalogScreen} name='Catalog' />
      <Stack.Screen component={ProductScreen} name='Product' />
      <Stack.Screen component={Filter} name='Filter' />
      <Stack.Screen component={FilterOption} name='FilterOption' />
      <Stack.Screen component={Slider} name='Slider' />
      <Stack.Screen component={ReviewScreen} name='Reviews' />
      <Stack.Screen component={NewReviewScreen} name='NewReview' />
    </Stack.Navigator>
  )
}
