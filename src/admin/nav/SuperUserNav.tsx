import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { MyOrdersScreen, NewReviewScreen, OrderScreen, ProductScreen, ReviewScreen, UserScreen } from '~/screens'
import AddressBookScreen from '~/screens/AddressBookScreen'
import AddAddressScreen from '~/screens/AddAddressScreen'
import ChooseAddressScreen from '~/screens/ChooseAddresScreen'
import PaymentMethodScreen from '~/screens/PaymentMethodScreen'
import DetailScreen from '~/screens/DetailScreen'
import SearchScreen from '~/screens/SearchScreen'
import { ReviewProps } from '~/types/reviews.type'
import { OrderProps } from '~/types/order.type'
import { ProvinceProps } from '~/types/province.type'
import { AddressProps } from '~/types/address.type'
import SettingScreen from '../screens/SettingScreen'
import ManageUserScreen from '../screens/ManageUserScreen'
import SettingScreenSuperUser from '../screens/SettingScreenSuperUser'
import UserDetailScreen from '../screens/UserDetail'
import { GeneralUserProps } from '~/types/user.type'

export type SuperUserNav = {
  UserScreen: undefined
  Setting: undefined
  ChangeRole: {
    data: GeneralUserProps
  }
  ManageUser: undefined
  MyDetails: undefined
}

export type SuperUserNavProp = StackNavigationProp<SuperUserNav>
export type UserScreenProps = StackScreenProps<SuperUserNav>
export type UserChangeRoleProps = StackScreenProps<SuperUserNav, 'ChangeRole'>

const Stack = createStackNavigator<SuperUserNav>()

const SuperUserNav = () => (
  <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
    <Stack.Screen name='UserScreen' component={SettingScreenSuperUser} />
    <Stack.Screen name='ManageUser' component={ManageUserScreen} />
    <Stack.Screen name='MyDetails' component={DetailScreen} />
    <Stack.Screen name='ChangeRole' component={UserDetailScreen} />
  </Stack.Navigator>
)

export default SuperUserNav
