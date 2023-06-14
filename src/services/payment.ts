import { GenericData, ListProps } from '~/types/service.type'
import { appService } from './base'
import { CreatePaymentMethod, PaymentMethodProps } from '~/types/payment.type'
import { callAxios } from '~/utils/callAxios'

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
