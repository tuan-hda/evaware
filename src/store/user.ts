import { User } from 'firebase/auth'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface State {
  user?: User
}

interface Action {
  setUser: (user: User) => void
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
