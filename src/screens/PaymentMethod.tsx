import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, CustomSafeAreaView, NavBar } from '~/components/common'
import { FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BagNavigationProp } from '~/components/navigation/BagNav'
import { PaymentItem } from '~/components/payment'
import { useQuery } from '@tanstack/react-query'
import { getPaymentMethods } from '~/services/payment'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { PaymentItemProps, PaymentMethodProps } from '~/types/payment.type'
import { translatePaymentMethod } from '~/utils/translateAxiosObj'
import useCartStore from '~/store/cart'
import { shallow } from 'zustand/shallow'

// const data = [
//   {
//     img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png',
//     provider: 'Mastercard',
//     number: '9833',
//     exp: '12/29'
//   },
//   {
//     img: 'https://images.glints.com/unsafe/glints-dashboard.s3.amazonaws.com/company-logo/f1658151314b57fa13811406a2318199.png',
//     provider: 'Visa',
//     number: '7239',
//     exp: '12/29'
//   },
//   {
//     img: 'https://cdn0.iconfinder.com/data/icons/50-payment-system-icons-2/480/JCB.png',
//     provider: 'JCB',
//     number: '1283',
//     exp: '12/29'
//   }
// ]

const Header = () => (
  <View className='h-16 justify-center px-4'>
    <Text className='font-app-semibold text-heading2 text-black'>payment method</Text>
  </View>
)

const Footer = () => {
  const navigation = useNavigation<BagNavigationProp>()

  return (
    <View>
      <View className='mt-10 px-4'>
        <Button label='Add new card' onPress={() => navigation.navigate('PaymentMethodBook')} type='secondary' />
      </View>
      <View className='mt-4 px-4 pb-4'>
        <Button label='Continue' onPress={() => navigation.navigate('ConfirmOrder')} />
      </View>
    </View>
  )
}

const PaymentMethod = () => {
  const [selected, setSelected] = useState(0)
  const [currentPaymentMethod, setPaymentMethod] = useCartStore(
    (state) => [state.currentPaymentMethod, state.setPaymentMethod],
    shallow
  )
  const { data: temp, refetch } = useQuery({
    queryKey: ['payments'],
    queryFn: getPaymentMethods
  })
  const data = temp?.data
  useRefetchOnFocus(refetch)

  useEffect(() => {
    if (data) {
      setPaymentMethod(data.results[0])
    }
  }, [data, setPaymentMethod])

  const changePayment = (index: number) => {
    setSelected(index)
    setPaymentMethod(data?.results[index])
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <NavBar step={2} total={3} />
      <FlatList
        data={data?.results}
        ListHeaderComponent={Header}
        ListFooterComponent={Footer}
        renderItem={({ item, index }) => (
          <PaymentItem
            selected={selected}
            setSelected={changePayment}
            {...translatePaymentMethod(item)}
            index={index}
          />
        )}
      />
    </CustomSafeAreaView>
  )
}

export default PaymentMethod
