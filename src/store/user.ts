import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserProps } from '~/types/user.type'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface State {
  user?: UserProps
}

interface Action {
  setUser: (user: UserProps) => void
  logOut: () => void
}

const useUserStore = create(
  persist(
    immer<State & Action>((set) => ({
      setUser: (user) =>
        set((state) => {
          state.user = user
        }),
      logOut: () => {
        set((state) => {
          state.user = undefined
        })
      }
    })),
    {
      name: 'evaware-user',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default useUserStore
