import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useCallback } from 'react'

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  )
}
