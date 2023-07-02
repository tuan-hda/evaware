import { ListProps } from '~/types/service.type'
import { callAxios, isError } from '~/utils/callAxios'
import { appService } from './base'
import {
  ConvertedProductDetailProps,
  ConvertedProductProps,
  CreateProductProps,
  RecommendProps,
  StatisticProductProps
} from '~/types/product.type'
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
          price__lte: max_price,
          count: 100
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
          ordering,
          price__gte: min_price,
          price__lte: max_price,
          count: 100
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

export const getProductDetailService = async (id: number, include_delete?: boolean, recomm_id?: string) => {
  return appService.get<ConvertedProductDetailProps>('/product/' + id, {
    params: {
      include_delete,
      recomm_id
    }
  })
}

export const createProductService = async (data: CreateProductProps) => {
  return callAxios(appService.post('/product/create', data))
}

export const updateProductService = async (id: number, data: Partial<CreateProductProps>) => {
  return callAxios(appService.patch('/product/' + id, data))
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

export const getTopProductService = async (range_type: 'yearly' | 'monthly' | 'quarterly' | 'weekly' | string) => {
  return appService.get<StatisticProductProps[]>('/statistics/top-product?range_type=' + range_type)
}

export const getRecommendProductsService = async (count: number) => {
  return appService.get<RecommendProps>('/product/recommend', {
    params: {
      count
    }
  })
}

export const searchPersonalizedProductsService = async (query: string) => {
  return callAxios<RecommendProps>(
    appService.get<RecommendProps>('/product/recommend/search', {
      params: {
        query
      }
    })
  )
}
