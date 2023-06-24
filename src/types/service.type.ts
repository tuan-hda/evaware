import { AxiosResponse } from 'axios'

export interface ServiceError {
  error: AxiosResponse<any, any>
}

export interface ListProps<T extends {}> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface GenericData {
  id: number
  created_at: string
  updated_at: string
}

export interface SoftGenericData extends GenericData {
  is_deleted: boolean
}
