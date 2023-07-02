import { useEffect, useState } from 'react'
import { getAllCategoriesService, getCategoryService } from '~/services/category'
import { CategoryProps } from '~/types/category.type'
import { isError } from '~/utils/callAxios'

const useCategoryDetailData = (id: number) => {
  const [response, setResponse] = useState<CategoryProps>()

  const fetch = async () => {
    const res = await getCategoryService(id)
    if (!isError(res)) {
      setResponse(res)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return { response, fetch }
}

export default useCategoryDetailData
