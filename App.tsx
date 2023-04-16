import { loadAsync } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import Tab from '~/components/navigation/Tab'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await loadAsync({
          Lexend: require('./assets/fonts/Lexend-Regular.ttf'),
          'Lexend-Light': require('./assets/fonts/Lexend-Light.ttf'),
          'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
          'Lexend-Semibold': require('./assets/fonts/Lexend-Semibold.ttf')
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Tab />
    </NavigationContainer>
  )
}
