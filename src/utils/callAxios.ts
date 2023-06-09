import { AxiosResponse, isAxiosError } from 'axios'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { ServiceError } from '~/types/service.type'

export const callAxios = async <T extends {}>(request: Promise<AxiosResponse<T, any>>, name?: string) => {
  try {
    return (await request).data
  } catch (error) {
    console.log('\n' + name?.toUpperCase() + '\n')
    if (isAxiosError(error) && error.response) {
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      return {
        error: error.response
      }
    } else {
      console.log(JSON.stringify(error))
      Toast.show({ type: 'error', text1: 'Service failed', text2: 'Some errors have occurred!' })
    }
  }
}

export function isError(data: any | ServiceError): data is ServiceError {
  return data && 'error' in data
}

export const toastLoginError = (data: ServiceError) => {
  const error = data.error
  if (error.status === 401) {
    Toast.show({
      type: 'error',
      text1: 'Invalid credentials',
      text2: 'Wrong email or password'
    })
  }
}

export const toastSignUpError = (data: ServiceError) => {
  const error = data.error
  if (
    error.status === 400 &&
    'email' in error.data &&
    error.data.email[0] === 'A user with that email already exists.'
  ) {
    Toast.show({
      type: 'error',
      text1: 'Email existed',
      text2: 'Please use another email'
    })
  }
}
