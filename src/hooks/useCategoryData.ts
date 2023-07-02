import { useCallback, useEffect, useState } from 'react'
import { getAllCategoriesService } from '~/services/category'
import { CategoryProps } from '~/types/category.type'
import { ListProps } from '~/types/service.type'
import { isError } from '~/utils/callAxios'

const useCategoryData = (checkModal:boolean) => {
  const [response, setResponse] = useState<ListProps<CategoryProps>>()

  const fetch = useCallback(async () => {
    const res = await getAllCategoriesService()
    if (!isError(res)) {
      setResponse(res)
    }
  },[checkModal]) 

  useEffect(() => {
    fetch()
  }, [fetch])

  return { response, fetch }
}

export default useCategoryData
