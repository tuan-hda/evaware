import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

type SafeAreaViewProps = SafeAreaView['props']

const CustomSafeAreaView = (props: SafeAreaViewProps) => {
  return <SafeAreaView {...props} className='flex-1' style={[styles.container, props.style]} />
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  }
})

export default CustomSafeAreaView
