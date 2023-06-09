import { ListProps } from '~/types/service.type'
import { callAxios, isError } from '~/utils/callAxios'
import { appService } from './base'
import { ConvertedProductProps } from '~/types/product.type'
import { AxiosResponse } from 'axios'

export const getAllProductsService = async () => {
  return convert(await callAxios<ListProps<ConvertedProductProps>>(appService.get('/product')))
}

export const getProductsByCategoryService = async (id: number) => {
  return convert(
    await callAxios<ListProps<ConvertedProductProps>>(
      appService.get('/product', {
        params: {
          category__id: id
        }
      })
    )
  )
}

export const convert = (
  data:
    | ListProps<ConvertedProductProps>
    | {
        error: AxiosResponse<any, any>
      }
    | undefined
) => {
  if (data && !isError(data)) {
    data.results = data.results.map((item) => convertProduct(item))
  }
  return data
}

export const convertProduct = (product: ConvertedProductProps): ConvertedProductProps => {
  return {
    ...product,
    imageURL: product.thumbnail,
    createdAt: product.created_at,
    updatedAt: product.updated_at,
    isDeleted: product.is_deleted,
    reviewsCount: product.reviews_count,
    avgRating: product.avg_rating,
    variationsCount: product.variations_count,
    isFavorited: product.is_favorited
  }
}
