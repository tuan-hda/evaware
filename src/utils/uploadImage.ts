import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import { uploadFileService } from '~/services/other'
import { isError } from './callAxios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export const uploadImage = async (asset: ImagePicker.ImagePickerAsset, setLoading: (value: boolean) => void) => {
  const formData = new FormData()
  const newImageUri = 'file:///' + asset.uri.split('file:/').join('')

  formData.append('file', {
    uri: newImageUri,
    type: mime.getType(newImageUri),
    name: newImageUri.split('/').pop()
  } as any)

  setLoading(true)
  const res = await uploadFileService(formData)
  setLoading(false)
  if (isError(res)) {
    Toast.show({
      type: 'error',
      text1: 'Uploaded image failed'
    })
    return {
      url: ''
    }
  } else {
    return res
  }
}
