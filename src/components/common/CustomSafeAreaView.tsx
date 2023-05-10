import { SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import classNames from 'classnames'

type SafeAreaViewProps = SafeAreaView['props']

const CustomSafeAreaView = (props: SafeAreaViewProps) => {
  return (
    <SafeAreaView
      {...props}
      className={classNames('flex-1 bg-white', props.className)}
      style={[styles.container, props.style]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight
  }
})

export default CustomSafeAreaView
