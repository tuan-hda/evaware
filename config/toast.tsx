import { ErrorToast, ToastConfig } from 'react-native-toast-message'

const toastConfig: ToastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 15
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  )
}

export default toastConfig
