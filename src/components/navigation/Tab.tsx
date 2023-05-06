import React from 'react'
import WishlistScreen from '~/screens/WishlistScreen'
import UserScreen from '~/screens/UserScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bag, Heart, User, Evaware } from 'assets/icon'
import BagNav from './BagNav'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Bars from './Bars'
import { HomeScreen } from '~/screens'


const mTab = createBottomTabNavigator()

export default function Tab() {
  const insets = useSafeAreaInsets()

  return (
    <mTab.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 64 + insets.bottom
        },
        tabBarItemStyle: {
          alignItems: 'center',
          justifyContent: 'center'
        }
      }}
    >
      <mTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <Evaware fill={focused ? '#000000' : '#9e9e9e'} />,
          header: () => <Bars headerLeft='return' title='Filter' headerRight='action' label='Clear' />,
        }}
      />
      <mTab.Screen
        name='Cart'
        component={BagNav}
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
