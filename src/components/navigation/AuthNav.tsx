import { StackNavigationProp, createStackNavigator, StackScreenProps, TransitionPresets } from '@react-navigation/stack'
import { OpeningScreen } from '~/screens'
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
  Opening: undefined
}

export type AuthNavigationProp = StackNavigationProp<AuthNavParamsList>
export type PhoneVerificationProp = StackScreenProps<AuthNavParamsList, 'PhoneVerification'>

const Stack = createStackNavigator<AuthNavParamsList>()

function AuthNav() {
  return (
    <Stack.Navigator screenOptions={{ ...TransitionPresets.SlideFromRightIOS, headerShown: false }}>
      <Stack.Screen name='Opening' component={OpeningScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='PhoneLogin' component={PhoneLoginScreen} />
      <Stack.Screen name='PhoneVerification' component={PhoneVerificationScreen} />
    </Stack.Navigator>
  )
}

export default AuthNav
