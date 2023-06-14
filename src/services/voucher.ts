import { callAxios } from '~/utils/callAxios'
import { appService } from './base'
import { VoucherProps } from '~/types/voucher.type'

const path = '/voucher'

export const getVoucherFromCodeService = async (code: string) => {
  return callAxios<VoucherProps>(appService.get(path + '/get-from-code?code=' + code))
}
