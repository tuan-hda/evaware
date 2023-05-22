import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { User } from 'firebase/auth'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  user?: FirebaseAuthTypes.User
}

interface Action {
  setUser: (user: FirebaseAuthTypes.User) => void
  logOut: () => void
}

const useUserStore = create(
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
  }))
)

export default useUserStore
