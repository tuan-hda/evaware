import { useCallback, useEffect, useState } from 'react'
import { getProductDetailService } from '~/services/product'
import { ConvertedProductDetailProps } from '~/types/product.type'
import { isError } from '~/utils/callAxios'

const useProductDetailData = (id: number) => {
  const [response, setResponse] = useState<ConvertedProductDetailProps>()

  const fetch = useCallback(async () => {
    const res = await getProductDetailService(id)
    if (!isError(res)) {
      setResponse(res)
    }
  }, [id])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { response, fetch }
}

export default useProductDetailData
