import { Alert } from 'react-native'

const useAlertExit = (onOk?: () => void, onCancelled?: () => void) => {
  const createAlert = () =>
    Alert.alert('Do you want to leave?', "Your changes won't be saved", [
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
