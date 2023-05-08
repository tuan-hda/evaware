import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const useShowNav = (navigation: any, show: boolean) => {
  const insets = useSafeAreaInsets()

  useEffect(() => {
    if (!show) {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'none'
        }
      })
    } else {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 64 + insets.bottom
        }
      })
    }
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 64 + insets.bottom
        }
      })
    }
  }, [insets.bottom, navigation, show])
}

export default useShowNav
