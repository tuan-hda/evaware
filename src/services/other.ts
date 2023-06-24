import { callAxios } from '~/utils/callAxios'
import { appService } from './base'

export const uploadFileService = async (formData: FormData) => {
  return await callAxios<{ url: string }>(
    appService.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  )
}
