import { useFonts } from 'expo-font'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextField } from '~/components/common'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function App() {
  const [fontsLoaded] = useFonts({
    Lexend: require('./assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Light': require('./assets/fonts/Lexend-Light.ttf'),
    'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
    'Lexend-Semibold': require('./assets/fonts/Lexend-Semibold.ttf')
  })
  const [value, setValue] = useState('')

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <TextField
        icon={<AntDesign size={20} name='pluscircleo' />}
        value={value}
        error='Error message'
        onChangeText={(text: string) => setValue(text)}
        hasClearBtn
        placeholder='Focused'
      />
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
