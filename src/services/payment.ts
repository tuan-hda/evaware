import { GenericData, ListProps } from '~/types/service.type'
import { appService } from './base'
import { CreatePaymentMethod, PaymentMethodProps } from '~/types/payment.type'
import { callAxios } from '~/utils/callAxios'
import { encode } from 'base-64'
import axios from 'axios'
import { PAYPAL_USERNAME, PAYPAL_PASSWORD } from '@env'
import { CreateOrderProps } from '~/types/order.type'
import { CartItemProps } from '~/types/bagItem.type'

const path = '/payment'

export const getPaymentMethods = async () => {
  return appService.get<ListProps<PaymentMethodProps>>(path)
}

export const createPaymentMethodService = async (data: CreatePaymentMethod) => {
  return callAxios(appService.post(path + '/create', data))
}

export const updatePaymentMethodService = async (id: number, data: Partial<CreatePaymentMethod>) => {
  return callAxios(appService.patch(`${path}/${id}`, data))
}

// export const deleteSavedItemsService = async (id: number) => {
//   return callAxios(appService.delete(`${path}/${id}`))
// }

const getAccessToken = async () => {
  const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token'

  //   const data = {
  //     grant_type: 'client_credentials'
  //   }
  // const username = PAYPAL_USERNAME
  // const password = PAYPAL_PASSWORD
  // const base64 = require('base-64');
  // const auth = base64.encode(`${username}:${password}`)

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Authorization': `Basic ${auth}`,
  //     'Access-Control-Allow-Credentials': true
  //     },
  //     data: JSON.stringify(data),
  //     url,
  //   }
  const ACESS_TOKEN =
    'A21AAKHnv0srOq7xuUOlM2rS4dNh7Aog5QoZ-NdhM1ny9BuiK97zcQ2THtJcMgiwikRu_ojHpKdKIa-MjfSNBVscwG6RGQicw'
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${ACESS_TOKEN}`
    },
    body: 'grant_type=client_credentials'
  })
    .then((res) => res.json())
    .then((res) => {})

  // try {
  //   const response = await axios(options)
  //   return response.data.access_token
  // } catch (error) {
  //   console.error(error)
  //   throw error
  // }
}
const ACCESS_TOKEN = 'A21AAKHnv0srOq7xuUOlM2rS4dNh7Aog5QoZ-NdhM1ny9BuiK97zcQ2THtJcMgiwikRu_ojHpKdKIa-MjfSNBVscwG6RGQicw'

export const createPayPalPayment = async (data:CreateOrderProps) => {
  const dataDetail = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    transactions: [
      {
        amount: {
          total: data.total,
          currency: 'USD',
        },
        description: 'This is the payment transaction description'
      }
    ],
    redirect_urls: {
      return_url: 'https://example.com/0',
      cancel_url: 'https://example.com/1'
    }
  }
  try {
    const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', dataDetail, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    })

    const paymentId = response.data.id
    const approvalUrl = response.data.links.find((link: any) => link.rel === 'approval_url').href

    console.log('Payment ID:', paymentId)
    console.log('Approval URL:', approvalUrl)
    return {
      paymentId,
      approvalUrl
    }
  } catch (error) {
    console.error('Error creating payment:', error)
  }
}

export const executePayPalPayment = async (paymentId: string, payerId: string) => {
  try {
    const response = await appService.post(
      `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
      {
        payer_id: payerId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error executing payment:', error)
  }
}
