import { useCallback, useEffect, useState } from 'react'
import { getAllVouchersService } from '~/services/voucher'
import { ListProps } from '~/types/service.type'
import { VoucherProps } from '~/types/voucher.type'
import { isError } from '~/utils/callAxios'

const useVoucherData = (checkModal: boolean) => {
  const [response, setResponse] = useState<ListProps<VoucherProps>>()

  const fetch = useCallback(async () => {
    const res = await getAllVouchersService()
    if (!isError(res)) {
      setResponse(res)
    }
  }, [checkModal]) 

  useEffect(() => {
    fetch()
  }, [fetch])

  return { response, fetch }
}

export default useVoucherData
