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
import { convertMoney } from '~/utils/money'
import { createPayPalPayment, executePayPalPayment } from '~/services/payment'
import WebView from 'react-native-webview'
import queryString from 'query-string'
import LoadingScreen from '~/components/common/LoadingScreen'

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
  const [approvalUrl, setApprovalUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const [appliedVoucher, setAppliedVoucher] = useState<VoucherProps>()
  const { data, refetch } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => getCartItemsService()
  })
  useRefetchOnFocus(refetch)
  const bags = data?.data

  const navigation = useNavigation<BagNavigationProp>()

  let subtotal = convertMoney(
    data?.data.results.reduce((prev, curr) => {
      return prev + curr.product.price * (1 - curr.product.discount / 100) * curr.qty
    }, 0) || 0
  )

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

  const createPaymentData = (paymentInfo?: string) => {
    const { id, created_at, updated_at, ...address } = currentAddress
    const createData: CreateOrderProps = {
      ...address,
      payment: paymentInfo ? paymentInfo : currentPaymentMethod.provider.name + ' ' + currentPaymentMethod.name,
      total
    }

    if (appliedVoucher) {
      createData.voucher = appliedVoucher.id
      createData.voucher_code = appliedVoucher.code
    }
    return createData
  }

  const createOrderFromCart = async (data: CreateOrderProps) => {
    const res = await createOrderFromCartService(data)

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

  const onNavigationStateChange = async (webviewState) => {
    if (webviewState.url.includes('https://example.com/0')) {
      setLoading(true)

      setApprovalUrl('')
      const url = webviewState.url
      const parsedUrl = queryString.parseUrl(url)
      const { PayerID, paymentId } = parsedUrl.query
      const executeRes = await executePayPalPayment(paymentId, PayerID)

      if (!isError(executeRes)) {
        const paymentInfo = {
          paymentId,
          captureId: executeRes?.captureId
        }
        const paymentData = createPaymentData(JSON.stringify(paymentInfo))

        await createOrderFromCart(paymentData)
        setLoading(false)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Execute PayPal payment failed!'
        })
      }
    }
    if (webviewState.url.includes('https://example.com/1')) {
      setApprovalUrl('')
      Toast.show({
        type: 'error',
        text1: 'Payment failed!'
      })
    }
  }

  const createOrder = async () => {
    if (!currentAddress || !currentPaymentMethod) return
    const createData = createPaymentData()

    if (currentPaymentMethod.provider.name === 'PayPal') {
      const paypayRes = await createPayPalPayment(createData)
      if (!isError(paypayRes)) {
        setApprovalUrl(paypayRes?.approvalUrl)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Create PayPal payment failed!'
        })
      }
    } else {
      createOrderFromCart(createData)
    }
  }

  return (
    <CustomSafeAreaView className='bg-white'>
      <LoadingScreen show={loading} />

      <NavBar step={3} total={3} />
      <View className='h-full w-full flex-1'>
        {approvalUrl !== '' && (
          <WebView
            className='w-full flex-1'
            source={{ uri: approvalUrl }}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
          />
        )}
      </View>

      {approvalUrl === '' && (
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
      )}
    </CustomSafeAreaView>
  )
}

export default ConfirmOrder
