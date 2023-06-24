import { useEffect, useState } from 'react'
import { getAllCategoriesService } from '~/services/category'
import { CategoryProps } from '~/types/category.type'
import { ListProps } from '~/types/service.type'
import { isError } from '~/utils/callAxios'

const useCategoryData = () => {
  const [response, setResponse] = useState<ListProps<CategoryProps>>()

  const fetch = async () => {
    const res = await getAllCategoriesService()
    if (!isError(res)) {
      setResponse(res)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return { response, fetch }
}

export default useCategoryData
