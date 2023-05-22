import { Auth, FacebookAuthProvider, User, signInWithPopup } from 'firebase/auth'
import Toast from 'react-native-toast-message'

export const signInFb = (auth: Auth, setUser: (user: User) => void) => {
  const provider = new FacebookAuthProvider()
  console.log(signInWithPopup)
  if (signInWithPopup === undefined) return null
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      setUser(user)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorCode, errorMessage)
      Toast.show({
        type: 'error',
        text1: 'Login failed',
        text2: errorMessage
      })
    })
}
