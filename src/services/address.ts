import { ListProps } from '~/types/service.type'
import { appService } from './base'
import { AddressProps } from '~/types/address.type'
import { callAxios } from '~/utils/callAxios'

const path = '/address'

export const getAddressesService = async () => {
  return await appService.get<ListProps<AddressProps>>(path)
}

export const addAddressService = async (data: Omit<AddressProps, 'id' | 'created_at' | 'updated_at'>) => {
  return await appService.post(path + '/create', data)
}

export const updateAddressService = async (data: Partial<AddressProps>) => {
  return await callAxios(appService.patch(path + '/' + data.id, data))
}

export const deleteAddressService = async (id: number) => {
  return await callAxios(appService.delete(path + '/' + id))
}
