import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Button, CustomSafeAreaView, NavBar, TextField } from '~/components/common'
import { BagItemProps } from '~/types/bagItem.type'
import { BagItem } from '~/components/bag'
import { AddressItem } from '~/components/address'
import { PaymentItem } from '~/components/payment'
import { useNavigation } from '@react-navigation/native'
import { BagNavigationProp } from '~/components/navigation/BagNav'
import useCartStore from '~/store/cart'
import { shallow } from 'zustand/shallow'
import { translateCartItem, translatePaymentMethod } from '~/utils/translateAxiosObj'
import { useRefetchOnFocus } from '~/hooks/useRefetchOnFocus'
import { getCartItemsService } from '~/services/cart'
import { useQuery } from '@tanstack/react-query'
import { isError } from '~/utils/callAxios'
import { getVoucherFromCodeService } from '~/services/voucher'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { VoucherProps } from '~/types/voucher.type'
import { createOrderFromCartService } from '~/services/order'
import { CreateOrderProps } from '~/types/order.type'

const Header = () => (
  <View className='h-16 justify-center px-4'>
    <Text className='font-app-semibold text-heading1 text-black'>confirm order</Text>
  </View>
)

const ConfirmOrder = () => {
  const [currentAddress, currentPaymentMethod] = useCartStore(
    (state) => [state.currentAddress, state.currentPaymentMethod],
    shallow
  )
  const [voucher, setVoucher] = useState('')
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherProps>()
  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })
  useRefetchOnFocus(refetch)
  const bags = data?.data

  const navigation = useNavigation<BagNavigationProp>()

  let subtotal =
    data?.data.results.reduce((prev, curr) => {
      return prev + curr.product.price * (1 - curr.product.discount / 100) * curr.qty
    }, 0) || 0

  const discountAmount = ((appliedVoucher?.discount || 0) / 100) * subtotal

  const total = subtotal + 10 - discountAmount

  const applyVoucher = async () => {
    if (!appliedVoucher && voucher) {
      const res = await getVoucherFromCodeService(voucher)
      if (!res || isError(res)) {
        setAppliedVoucher(undefined)
        Toast.show({
          type: 'error',
          text1: 'Invalid voucher code'
        })
        return
      }
      setAppliedVoucher(res)
      setVoucher('')
    } else {
      setAppliedVoucher(undefined)
      setVoucher('')
    }
  }

  const createOrder = async () => {
    if (!currentAddress || !currentPaymentMethod) return
    const { id, created_at, updated_at, ...address } = currentAddress
    const createData: CreateOrderProps = {
      ...address,
      payment: currentPaymentMethod.provider.name + ' ' + currentPaymentMethod.name,
      total
    }

    if (appliedVoucher) {
      createData.voucher = appliedVoucher.id
      createData.voucher_code = appliedVoucher.code
    }

    const res = await createOrderFromCartService(createData)

    if (isError(res)) {
      let text2 = 'Some error happened'

      if (res.error.data[0].toLowerCase().includes('insufficient inventory')) {
        text2 = 'Insufficient inventory'
      }

      Toast.show({
        type: 'error',
        text1: 'Made order failed',
        text2
      })
    } else {
      navigation.navigate('Success')
    }
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <NavBar step={3} total={3} />
      <ScrollView>
        <Header />
        <View className='justify-center p-4'>
          <Text className='font-app-semibold text-heading2 text-black'>bag</Text>
        </View>
        <View className='px-4'>
          {bags?.results.map((item, index) => (
            <BagItem
              {...translateCartItem(item)}
              key={index}
              disableButton
              paddingBottom={index < bags.results.length - 1 ? 24 : 16}
            />
          ))}
        </View>

        <View className='justify-center px-4 pt-4'>
          <Text className='font-app-semibold text-heading2 text-black'>delivery address</Text>
        </View>
        {currentAddress && <AddressItem isPlain {...currentAddress} />}

        <View className='justify-center px-4 pt-4'>
          <Text className='font-app-semibold text-heading2 text-black'>payment method</Text>
        </View>
        {currentPaymentMethod && <PaymentItem isPlain {...translatePaymentMethod(currentPaymentMethod)} />}

        <View className='justify-center px-4 pt-4'>
          <Text className='mb-4 font-app-semibold text-heading2 text-black'>promocode</Text>
          <View className='flex-row'>
            {!appliedVoucher && (
              <TextField
                maxLength={8}
                placeholder='EVAW2020'
                value={voucher}
                onChangeText={(text) => setVoucher(text)}
                wrapperClassName='flex-1 mr-4 min-w-0 flex-shrink'
              />
            )}
            <View className='flex-1 flex-shrink-0'>
              <Button label={appliedVoucher ? 'Cancel' : 'Apply'} onPress={applyVoucher} type='secondary' />
            </View>
          </View>
        </View>

        <View className='px-4 pb-4 pt-6'>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-app text-body1 text-giratina-500'>Subtotal</Text>
            <Text className='font-app text-body1 text-giratina-500'>${subtotal}</Text>
          </View>
          <View className='mt-1 flex-row justify-between'>
            <Text className='font-app text-body1 text-giratina-500'>Delivery fee</Text>
            <Text className='font-app text-body1 text-giratina-500'>$10</Text>
          </View>
          {discountAmount !== 0 && (
            <View className='mt-1 flex-row justify-between'>
              <Text className='font-app text-body1 text-giratina-500'>Promocode</Text>
              <Text className='font-app text-body1 text-giratina-500'>-${discountAmount}</Text>
            </View>
          )}
          <View className='flex-row justify-between'>
            <Text className='font-app-semibold text-heading2'>total</Text>
            <Text className='font-app-semibold text-heading2'>${total}</Text>
          </View>
        </View>

        <View className='px-4 pb-4 pt-6'>
          <Button label={`Pay $${total}`} onPress={createOrder} />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  )
}

export default ConfirmOrder
