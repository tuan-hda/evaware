import { loadAsync } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import Tab from '~/components/navigation/Tab'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { LogBox, View } from 'react-native'
import AuthNav from '~/components/navigation/AuthNav'
import useUserStore from '~/store/user'
import { shallow } from 'zustand/shallow'
import Toast from 'react-native-toast-message'
import toastConfig from 'config/toast'
import { AdminTab } from '~/admin/nav'
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query'
import LoadingScreen from '~/components/common/LoadingScreen'
import ViewWrapper from '~/layouts/ViewWrapper'
import SuperUserTab from '~/admin/nav/SuperUserTab'

const queryClient = new QueryClient()
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [user] = useUserStore((state) => [state.user], shallow)

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

  const getNav = () => {
    if (!user) return <AuthNav />
    if (user.is_superuser || user.is_superuser) return <AdminTab />
    return <Tab />
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ViewWrapper>
          <NavigationContainer onReady={onLayoutRootView}>
            {getNav()}
            <Toast config={toastConfig} position='top' />
          </NavigationContainer>
        </ViewWrapper>
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
