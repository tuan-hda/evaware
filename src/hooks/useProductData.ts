import { useCallback, useEffect, useState } from 'react'
import { getAllProductsService, getProductsByCategoryService } from '~/services/product'
import { ConvertedProductProps } from '~/types/product.type'
import { ListProps } from '~/types/service.type'
import { isError } from '~/utils/callAxios'

const useProductData = (
  id: number,
  search?: string,
  sort?: string,
  minPrice?: number,
  maxPrice?: number,
  filterQuery?: string
) => {
  const [response, setResponse] = useState<ListProps<ConvertedProductProps>>()

  const fetch = useCallback(async () => {
    let res
    if (id === -1) {
      res = await getAllProductsService(search, sort, minPrice, maxPrice, filterQuery)
    } else {
      res = await getProductsByCategoryService(id, search, sort, minPrice, maxPrice, filterQuery)
    }
    if (!isError(res)) {
      setResponse(res)
    }
  }, [filterQuery, id, maxPrice, minPrice, search, sort])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { response, fetch }
}

export default useProductData
