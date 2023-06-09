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
