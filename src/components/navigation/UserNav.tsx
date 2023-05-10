import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import { UserScreen } from '~/screens'
import AddressBookScreen from '~/screens/AddressBookScreen'
import AddAddressScreen from '~/screens/AddAddressScreen'
import ChooseAddressScreen from '~/screens/ChooseAddresScreen'

export type UserNavParamList = {
  UserScreen: undefined
  Address: undefined
  AddAddress: undefined
  ChooseAddress:
    | {
        type?: string
        setAddress?: (address: string) => void
      }
    | undefined
}

export type UserNavigationProp = StackNavigationProp<UserNavParamList>

export type UserScreenProps = StackScreenProps<UserNavParamList>

const Stack = createStackNavigator<UserNavParamList>()

const UserNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='UserScreen' component={UserScreen} />
    <Stack.Screen name='Address' component={AddressBookScreen} />
    <Stack.Screen name='AddAddress' component={AddAddressScreen} />
    <Stack.Screen name='ChooseAddress' component={ChooseAddressScreen} />
  </Stack.Navigator>
)

export default UserNav
