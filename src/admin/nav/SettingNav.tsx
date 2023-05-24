import React from 'react'
import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'

import { default as ConfigureScreen } from '~/screens/SettingScreen'
import SettingScreen from '../screens/SettingScreen'
import ManageUserScreen from '../screens/ManageUserScreen'
import UserDetail from '../screens/UserDetail'

export type SettingNavParamList = {
  SettingScreen: undefined
  Configure: undefined
  ManageUsers: undefined
  UserDetail: undefined
}

export type SettingNavigationProp = StackNavigationProp<SettingNavParamList>

export type SettingScreenProps = StackScreenProps<SettingNavParamList>

const Stack = createStackNavigator<SettingNavParamList>()

const SettingNav = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='SettingScreen' component={SettingScreen} />
    <Stack.Screen name='ManageUsers' component={ManageUserScreen} />
    <Stack.Screen name='Configure' component={ConfigureScreen} />
    <Stack.Screen name='UserDetail' component={UserDetail} />
  </Stack.Navigator>
)

export default SettingNav
