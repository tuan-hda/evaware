import React from 'react'
import { AppBar, Cell, CustomSafeAreaView } from '~/components/common'

const SettingScreen = () => {
  return (
    <CustomSafeAreaView>
      <AppBar title='Settings' />
      <Cell text='Terms and Conditions' />
      <Cell text='About' />
    </CustomSafeAreaView>
  )
}

export default SettingScreen
