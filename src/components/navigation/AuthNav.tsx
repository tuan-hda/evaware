import { StackNavigationProp, StackScreenProps, createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '~/screens/LoginScreen'
import SignupScreen from '~/screens/SignupScreen'

export type AuthNavParamsList = {
  Login: undefined
  Signup: undefined
}

export type AuthNavigationProp = StackNavigationProp<AuthNavParamsList>

const Stack = createStackNavigator<AuthNavParamsList>()

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default AuthNav
