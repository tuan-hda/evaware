import { View } from 'react-native'
import React, { useRef, useState } from 'react'
import { AppBar, Button, CustomSafeAreaView } from '~/components/common'
import { FlatList } from 'react-native'
import { AddPayment, PaymentItem } from '~/components/payment'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import useShowNav from '~/hooks/useShowNav'
import { useNavigation } from '@react-navigation/native'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { getPaymentMethods } from '~/services/payment'
import { useQuery } from '@tanstack/react-query'
import { translatePaymentMethod } from '~/utils/translateAxiosObj'
import { PaymentMethodProps } from '~/types/payment.type'

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
  const { data: temp, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: getPaymentMethods
  })
  const data = temp?.data
  const [oldData, setOldData] = useState<PaymentMethodProps>()
  useRefetchOnFocus(refetch)

  const present = (editData?: PaymentMethodProps) => {
    setOldData(editData)
    ref.current?.present()
    setShow(true)
  }

  const close = () => {
    ref.current?.close()
    setShow(false)
  }

  useShowNav(navigation, false)

  // eslint-disable-next-line react/no-unstable-nested-components
  const Footer = () => (
    <View className='mt-6 px-4'>
      <Button onPress={() => present()} label='Add new payment method' type='secondary' />
    </View>
  )

  return (
    <BottomSheetModalProvider>
      <CustomSafeAreaView>
        <AppBar title='Payment methods' />
        <AddPayment data={oldData} isEdit={!!oldData} close={close} ref={ref} />
        <FlatList
          ListHeaderComponent={Header}
          ListFooterComponent={Footer}
          renderItem={({ item, index }) => (
            <PaymentItem onPress={() => present(item)} isPlain {...translatePaymentMethod(item)} index={index} />
          )}
          data={data?.results}
        />
      </CustomSafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default PaymentMethodScreen
