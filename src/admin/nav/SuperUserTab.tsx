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
import SuperUserNav from './SuperUserNav'

const Tab = createBottomTabNavigator()

const SuperUserTab = () => {
  const insets = useSafeAreaInsets()

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
        name='Setting'
        component={SuperUserNav}
        options={{
          tabBarIcon: ({ focused }) => <Ionicons size={28} name='settings' color={focused ? '#000000' : '#9e9e9e'} />
        }}
      />
    </Tab.Navigator>
  )
}

export default SuperUserTab
