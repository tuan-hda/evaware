import { useCallback, useEffect, useState } from 'react'
import { getAllProductsService, getProductsByCategoryService } from '~/services/product'
import { ConvertedProductProps } from '~/types/product.type'
import { ListProps } from '~/types/service.type'
import { isError } from '~/utils/callAxios'

const useProductData = (id: number) => {
  const [response, setResponse] = useState<ListProps<ConvertedProductProps>>()

  const fetch = useCallback(async () => {
    let res
    if (id === -1) {
      res = await getAllProductsService()
    } else {
      res = await getProductsByCategoryService(id)
    }
    if (!isError(res)) {
      setResponse(res)
    }
  }, [id])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { response, fetch }
}

export default useProductData
