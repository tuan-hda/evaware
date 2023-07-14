import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ProductScreen from '../screens/ProductScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import OrderScreen from '../screens/OrderScreen'
import SettingScreen from '../screens/SettingScreen'
import AnalyticsScreen from '../screens/AnalyticsScreen'
import OrderNav from './OrderNav'
import ProductNav from './ProductNav'
import SettingNav from './SettingNav'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'

const Tab = createBottomTabNavigator()

const AdminTab = () => {
  const insets = useSafeAreaInsets()
  const [user] = useUserStore((state) => [state.user], shallow)

  return (
    <Tab.Navigator
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
      <Tab.Screen
        name='Home'
        component={ProductNav}
        options={{
          tabBarIcon: ({ focused }) => <Entypo size={28} name='box' color={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
      <Tab.Screen
        name='Order'
        component={OrderNav}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons size={28} name='card' color={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
      {user?.is_superuser && (
        <Tab.Screen
          name='Analytics'
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons size={28} name='google-analytics' color={focused ? '#000000' : '#9e9e9e'} />
            )
          }}
        />
      )}
      <Tab.Screen
        name='Setting'
        component={SettingNav}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons size={28} name='settings' color={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
    </Tab.Navigator>
  )
}

export default AdminTab
