import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { VoucherProps } from '~/types/voucher.type'
import { ListProps } from '~/types/service.type'

const path = '/voucher'

export const getVoucherFromCodeService = async (code: string) => {
  return callAxios<VoucherProps>(appService.get(path + '/get-from-code?code=' + code))
}
export const getAllVouchersService = async () => {
  return await callAxios<ListProps<VoucherProps>>(appService.get('/voucher'))
}
export const getVoucherService = async (id:number) => {
  return await callAxios<VoucherProps>(appService.get('/voucher' + '/' + id))
}
export const addVoucherService = async (data:VoucherProps) => {
  return await callAxios<VoucherProps>(appService.post('/voucher/create',data))
}
export const updateVoucherService = async (data:VoucherProps) => {
  return await callAxios<VoucherProps>(appService.patch('/voucher/' + data.id,data))
}
export const deleteVoucherService = async (id:number) => {
  return await callAxios<VoucherProps>(appService.delete('/voucher'+ '/' + id))
}