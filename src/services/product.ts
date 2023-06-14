import { ListProps } from '~/types/service.type'
import { callAxios, isError } from '~/utils/callAxios'
import { appService } from './base'
import { ConvertedProductDetailProps, ConvertedProductProps, StatisticProductProps } from '~/types/product.type'
import { AxiosResponse } from 'axios'
import { CreateReviewProps, ReviewProps } from '~/types/reviews.type'

export const getAllProductsService = async (
  search?: string,
  ordering?: string,
  min_price?: number,
  max_price?: number,
  filterQuery?: string
) => {
  return convert(
    await callAxios<ListProps<ConvertedProductProps>>(
      appService.get('/product?' + filterQuery, {
        params: {
          search,
          ordering,
          price__gte: min_price,
          price__lte: max_price
        }
      })
    )
  )
}

export const getProductsByCategoryService = async (
  id: number,
  search?: string,
  ordering?: string,
  min_price?: number,
  max_price?: number,
  filterQuery?: string
) => {
  return convert(
    await callAxios<ListProps<ConvertedProductProps>>(
      appService.get('/product?' + filterQuery, {
        params: {
          category__id: id,
          search,
          ordering
        }
      })
    )
  )
}

export const getProductsByCategoryServiceV2 = async (id: number) => {
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

export const convertProduct = <T extends ConvertedProductProps>(product: T): T => {
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

export const getProductDetailService = async (id: number) => {
  return appService.get<ConvertedProductDetailProps>('/product/' + id)
}

export const addFavoriteService = async (id: number) => {
  return await callAxios(
    appService.post('/favorite/add-to-favorite', {
      product: id
    })
  )
}

export const deleteFavoriteService = async (id: number) => {
  return await callAxios(appService.delete('/favorite/' + id))
}

export const addReviewService = async (data: CreateReviewProps) => {
  return await callAxios<ReviewProps>(appService.post('/review/create', data))
}

export const updateReviewService = async (data: Partial<ReviewProps>) => {
  return await callAxios(appService.patch('/review/' + data.id, data))
}

export const deleteReviewService = async (id: number) => {
  return await callAxios(appService.delete('/review/' + id))
}

export const getTopProductService = async (range_type: 'yearly' | 'monthly' | 'quarterly' | 'weekly') => {
  return appService.get<StatisticProductProps[]>('/statistics/top-product?range_type=' + range_type)
}
