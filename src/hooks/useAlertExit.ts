import { Alert } from 'react-native'

const useAlertExit = (onOk?: () => void, onCancelled?: () => void, title?: string, text?: string) => {
  const createAlert = () =>
    Alert.alert(title ?? 'Do you want to leave?', text ?? "Your changes won't be saved", [
      {
        text: 'Cancel',
        onPress: onCancelled,
        style: 'cancel'
      },
      { text: 'OK', onPress: onOk }
    ])

  return { createAlert }
}

export default useAlertExit
