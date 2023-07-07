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
let ACCESS_TOKEN

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
  try {
    const response = await fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + encode(`${PAYPAL_USERNAME}:${PAYPAL_PASSWORD}`)
      },
      body: 'grant_type=client_credentials'
    })
    const data = await response.json()
    ACCESS_TOKEN = data.access_token
    return ACCESS_TOKEN
  } catch (error) {
    console.log('Error:', error.message)
    throw error
  }
}

export const createPayPalPayment = async (data: CreateOrderProps) => {
  if (!ACCESS_TOKEN) {
    ACCESS_TOKEN = await getAccessToken()
  }

  const dataDetail = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    transactions: [
      {
        amount: {
          total: data.total,
          currency: 'USD'
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

    return {
      paymentId,
      approvalUrl
    }
  } catch (error) {
    console.error('Error creating payment:', error)
  }
}

export const executePayPalPayment = async (paymentId: string, payerId: string) => {
  if (!ACCESS_TOKEN) {
    ACCESS_TOKEN = await getAccessToken()
  }
  try {
    const response = await axios.post(
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

export const refundPayPalPayment = async (paymentId: string) => {
  if (!ACCESS_TOKEN) {
    ACCESS_TOKEN = await getAccessToken();
  }

  try {
    const response = await axios.post(
      `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/refund`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error refunding payment:', error);
  }
};
