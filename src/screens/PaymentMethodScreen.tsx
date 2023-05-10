import { View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { FlatList } from 'react-native'
import { AddPayment, PaymentItem } from '~/components/payment'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import useShowNav from '~/hooks/useShowNav'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
    provider: 'Mastercard',
    number: '9833',
    exp: '12/29'
  },
  {
    img: 'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/f1658151314b57fa13811406a2318199.png',
    provider: 'Visa',
    number: '7239',
    exp: '12/29'
  },
  {
    img: 'https://cdn0.iconfinder.com/data/icons/50-payment-system-icons-2/480/JCB.png',
    provider: 'JCB',
    number: '1283',
    exp: '12/29'
  }
]

const Header = () => <View className='h-2' />

const PaymentMethodScreen = () => {
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const ref = useRef<BottomSheetModal>(null)

  const present = () => {
    ref.current?.present()
    setShow(true)
  }

  const close = () => {
    ref.current?.close()
    setShow(false)
  }

  useShowNav(navigation, !show)

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => (
    <View className='mt-6 px-4'>
      <Button onPress={present} label='Add new payment method' type='secondary' />
    </View>
  )

  return (
    <BottomSheetModalProvider>
      <CustomSafeAreaView>
        <AppBar title='Payment methods' />
        <AddPayment close={close} ref={ref} />
        <FlatList
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          renderItem={({ item, index }) => <PaymentItem isPlain {...item} index={index} />}
          data={data}
        />
      </CustomSafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default PaymentMethodScreen
