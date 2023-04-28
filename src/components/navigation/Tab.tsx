import { View, Text, Image } from 'react-native'
import React from 'react'
import HomeScreen from '~/screens/HomeScreen'
import CartScreen from '~/screens/CartScreen'
import WishlistScreen from '~/screens/WishlistScreen'
import UserScreen from '~/screens/UserScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bag, Heart, User, Evaware, ArrowLeft } from 'assets/icon'
import Bars from './Bars'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { green300, transparent } from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors'
import { CatalogScreen } from '~/screens'

const mTab = createBottomTabNavigator()

export default function Tab() {
  return (
    <mTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        // headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 64
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      <mTab.Screen
        name='Home'
        component={CatalogScreen}
        options={{
          tabBarIcon: ({ focused }) => <Evaware fill={focused ? '#000000' : '#9e9e9e'} />,
          header: () => <Bars headerLeft='return' title='Furniture' />
        }}
      />
      <mTab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => <Bag fill={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
      <mTab.Screen
        name='Wishlist'
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused }) => <Heart fill={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
      <mTab.Screen
        name='User'
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => <User fill={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
    </mTab.Navigator>
  )
}
