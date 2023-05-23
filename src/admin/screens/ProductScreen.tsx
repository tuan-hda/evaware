import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { CustomSafeAreaView } from '~/components/common'
import { SearchBar } from '~/components/common'
import classNames from 'classnames'

const ProductScreen = () => {
  const [focus, setFocus] = useState(false)
  const toggle = () => setFocus((prev) => !prev)
  return (
    <CustomSafeAreaView>
      <ScrollView
        className='flex-1 bg-white px-4'
        contentContainerStyle={{
          alignItems: 'center'
        }}
      >
        {!focus && <Text className='mt-14 h-[58] w-full text-left font-app-semibold text-heading1'>products</Text>}
        <View className={classNames(focus && 'mt-14')}>
          <SearchBar onBack={toggle} onPress={!focus ? toggle : undefined} isSearching={focus} className='w-full' />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ProductScreen
