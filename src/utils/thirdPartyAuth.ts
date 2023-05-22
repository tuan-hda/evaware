import { Auth, FacebookAuthProvider, User, signInWithCredential } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { initializeAsync, logInWithReadPermissionsAsync } from 'expo-facebook'

export const signInFb = async (auth: Auth, setUser: (user: User) => void) => {
  try {
    console.log(initializeAsync)
    await initializeAsync('760772782212581', 'evaware')
    // const { type, token } = await logInWithReadPermissionsAsync({
    //   permissions: ['public_profile', 'email']
    // })
    // console.log(type, token)
    // if (type === 'success') {
    //   const credential = FacebookAuthProvider.credential(token)

    //   signInWithCredential(auth, credential)
    //     .then((user) => {
    //       setUser(user.user)
    //     })
    //     .catch((error) => {
    //       Toast.show({ type: 'error', text1: 'Login failed', text2: error?.message })
    //     })
    // }
  } catch (error) {
    console.log(error)
  }
}
