import { StackNavigationProp, createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import ForgotPasswordScreen from '~/screens/ForgotPasswordScreen'
import LoginScreen from '~/screens/LoginScreen'
import PhoneLoginScreen from '~/screens/PhoneLoginScreen'
import PhoneVerificationScreen from '~/screens/PhoneVerificationScreen'
import SignupScreen from '~/screens/SignupScreen'

export type AuthNavParamsList = {
  Login: undefined
  Signup: undefined
  ForgotPassword: undefined
  PhoneLogin: undefined
  PhoneVerification: {
    veriId: string
  }
}

export type AuthNavigationProp = StackNavigationProp<AuthNavParamsList>
export type PhoneVerificationProp = StackScreenProps<AuthNavParamsList, 'PhoneVerification'>

const Stack = createStackNavigator<AuthNavParamsList>()

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='PhoneLogin' component={PhoneLoginScreen} />
      <Stack.Screen name='PhoneVerification' component={PhoneVerificationScreen} />
    </Stack.Navigator>
  )
}

export default AuthNav
