import React from 'react'
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Bag, Heart, User, Evaware } from 'assets/icon'
import BagNav from './BagNav'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Bars from './Bars'
import HomeNav from './HomeNav'
import UserNav, { UserNavigationProp } from './UserNav'
import SavedNav from './SavedNav'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

type Props = {
  Home: undefined
  Cart: undefined
  Wishlist: undefined
  User: undefined
}

const mTab = createBottomTabNavigator<Props>()

export type TabNavigationProps = BottomTabNavigationProp<Props>

export default function Tab() {
  const insets = useSafeAreaInsets()

  return (
    <mTab.Navigator
      initialRouteName='Home'
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? ''
        const hideTabbar = ['Product', 'Reviews', 'NewReview', 'Filter', 'FilterOption', 'Search'].includes(routeName)
        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 64 + insets.bottom,
            display: hideTabbar ? 'none' : 'flex'
          },
          tabBarItemStyle: {
            alignItems: 'center',
            justifyContent: 'center'
          }
        }
      }}
    >
      <mTab.Screen
        name='Home'
        component={HomeNav}
        options={{
          tabBarIcon: ({ focused }) => <Evaware fill={focused ? '#000000' : '#9e9e9e'} />,
          header: () => <Bars headerLeft='return' title='Filter' headerRight='action' label='Clear' />
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
        component={SavedNav}
        options={{
          tabBarIcon: ({ focused }) => <Heart fill={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
      <mTab.Screen
        name='User'
        component={UserNav}
        options={{
          tabBarIcon: ({ focused }) => <User fill={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
    </mTab.Navigator>
  )
}
