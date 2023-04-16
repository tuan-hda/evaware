import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import Tab from '~/components/navigation/Tab'

export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend: require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Light': require('./assets/fonts/Lexend-Light.ttf'),
    'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Semibold': require('./assets/fonts/Lexend-Semibold.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <Tab />
    </NavigationContainer>
  )
}
