// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth } from 'firebase/auth'
import { getReactNativePersistence } from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAw6W2MRd8nrRa4VaLOLbdcrQO8O0qK1ac',
  authDomain: 'evaware-893a5.firebaseapp.com',
  projectId: 'evaware-893a5',
  storageBucket: 'evaware-893a5.appspot.com',
  messagingSenderId: '253008480260',
  appId: '1:253008480260:web:caa845188b08cc2947cd51',
  measurementId: 'G-VW0PZ3DE3B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export const auth = getAuth(app)
export default app
